//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";

contract ERC20ReceiverEscrow is AxelarExecutable {
    IAxelarGasService immutable gasService;

    constructor(address _gateway, address _gasReceiver)
        AxelarExecutable(_gateway)
    {
        gasService = IAxelarGasService(_gasReceiver);
    }

    event Executed();

    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata tokenSymbol,
        uint256 amount
    ) internal override {
        (address[] memory receivingAddresses,uint256[] memory amounts) = abi.decode(payload, (address[], uint256[]));
        uint256 n = amounts.length;
        address tokenAddress = gateway.tokenAddresses(tokenSymbol);
        for(uint256 i =0;i<n;i++){
            IERC20(tokenAddress).transfer(receivingAddresses[i], amounts[i]);
        }
        
        emit Executed();
        }        
    }
