import { DSC_CONTRACT_ADDRESS, web3 } from "./constants";
import { abi } from "./dc.json";

let contract = new web3.eth.Contract(abi, DSC_CONTRACT_ADDRESS);

export const getDSCBalance = async (account) => {
  try {
    if (account) {
      let amount = await contract.methods.balanceOf(account).call();
      console.log("amount", amount);
      return amount;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getName = async () => {
  try {
    let name = await contract.methods.name().call();
    return name;
  } catch (err) {
    console.log(err);
  }
};

export const transferToken = async (addressFrom, addressTo, amount) => {
  try {
    let transferSuccess = await contract.methods
      .transfer(addressFrom, addressTo, amount)
      .call();

    return transferSuccess;
  } catch (e) {
    console.log(e);
  }
};
