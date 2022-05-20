import { useMoralis } from "react-moralis";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { Moralis } from "moralis";
import { USDC_DECIMALS } from "../../constants";
import { useApp } from "../";
import { useContractFunction } from "./useContractFunction";

export const useMint = () => {
  const { account } = useMoralis();
  const { newAlert } = useApp();
  const { runFunction } = useContractFunction("usdc");

  type MintProps = {
    receiver: string;
    amount: string;
  };

  const mint = async ({ receiver, amount }: MintProps) => {
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    const successMessage = `Minted ${amount} to ${receiver}`;
    await runFunction({
      successMessage: successMessage,
      functionName: "mint",
      params: { account: receiver, amount: usdcAmount },
    });
  };

  const handleMint = async ({ data }: FormDataReturned) => {
    let amount = data
      ?.find((input) => input.key == "AMOUNT")
      ?.inputResult.toString();
    console.log(amount, data);
    amount = amount || "0";
    amount = ((10 * Number(amount)) % 100).toString();

    if (account) {
      return mint({ receiver: account, amount: amount });
    } else {
      newAlert({ type: "error", message: "Wallet not connected!" });
    }
  };

  return { mint, handleMint };
};
