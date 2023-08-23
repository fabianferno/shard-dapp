import erc20ABI from "../contract/ERC20Sender.json";
import erc20 from "../contract/ERC20.json";

type Address = `0x${string}`;

interface Contract {
  address: Address;
  abi: any;
}

export const ERC20 = {
  abi: erc20,
};
export const ERC20Sender: Contract = {
  address: "0x3ABa8E9351B394DE8649aE6D8A8caA85A53950B2",
  abi: erc20ABI,
};
