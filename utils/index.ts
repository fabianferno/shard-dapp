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
  address: "0xaD7243c1a5d8F32F843B2d75075E6466d1d23d93",
  abi: erc20ABI,
};
