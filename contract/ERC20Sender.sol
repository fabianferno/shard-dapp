//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract ERC20SenderEscrow {
    IAxelarGasService immutable gasService;
    IAxelarGateway immutable gateway;

    constructor(address _gateway, address _gasReceiver) {
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasReceiver);
    }

    struct Payment {
        address sender;
        address receiver;
        string destinationChain;
        uint256 amount;
        uint256 paymentId;
    }

    mapping(address => mapping(uint256 => Payment)) public sentPayments;
    mapping(address => mapping(uint256 => Payment)) public receivedPayments;
    
    Payment[] public payments;
    uint256 public currPaymentId = 0;
    event PaymentInitiated(uint256 payId, address sender, address receiver, address erc20Token, uint256 amount, uint256 deadline);

    //call from frontend for each network separately

    //_destChain - name of Chain like Polygon 
    //_destContract - address of receiving contract deployed on Polygon
    function sendPayment(address[] memory  _receivers,uint256[] memory _amounts,string memory _destChain,string memory  _destContract, string calldata symbol) external payable {
            uint256 totalAmount = 0;
            uint256 n = _amounts.length;
            for(uint256 i=0;i<n;i++){
                currPaymentId++;
                totalAmount+=_amounts[i];
                Payment memory payment = Payment(msg.sender, _receivers[i], _destChain,_amounts[i], currPaymentId);
                sentPayments[msg.sender][currPaymentId] = payment;
                receivedPayments[_receivers[i]][currPaymentId] = payment;
                payments.push(payment);
            }

            address tokenAddress = gateway.tokenAddresses(symbol);
            IERC20(tokenAddress).transferFrom(msg.sender, address(this), totalAmount);
            IERC20(tokenAddress).approve(address(gateway), totalAmount);
            bytes memory payload = abi.encode(_receivers,_amounts);
            if (msg.value> 0) {
                gasService.payNativeGasForContractCallWithToken{value:msg.value}(
                    address(this),
                    _destChain,//destinationChain
                    _destContract,//destination Contract Address
                    payload,
                    symbol,//symbol
                    totalAmount,
                    msg.sender
                );
            }
            gateway.callContractWithToken(
                _destChain,//destinationChain
                _destContract,//destinationAddress
                payload,
                symbol,//symbol
                totalAmount
            );        
        // emit PaymentInitiated(currPaymentId, msg.sender, _receiver, _erc20Token, _amount, deadline);
    }

    function getSentPayments(address _sender) external view returns (Payment[] memory) {
        Payment[] memory result = new Payment[](currPaymentId);
        uint256 count = 0;
        for (uint256 i = 1; i <= currPaymentId; i++) {
            if (sentPayments[_sender][i].sender == _sender) {
                result[count] = sentPayments[_sender][i];
                count++;
            }
        }
        return result;
    }

       function getReceivedPayments(address _receiver) external view returns (Payment[] memory) {
        Payment[] memory result = new Payment[](currPaymentId);
        uint256 count = 0;
        for (uint256 i = 1; i <= currPaymentId; i++) {
            if (receivedPayments[_receiver][i].receiver == _receiver) {
                result[count] = receivedPayments[_receiver][i];
                count++;
            }
        }
        return result;
    }
}
