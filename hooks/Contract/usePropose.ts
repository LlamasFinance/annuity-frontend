import { useMoralis } from "react-moralis";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { Moralis } from "moralis";
import { EXCHANGE_ADDRESS, USDC_DECIMALS } from "../../constants";
import { useApp } from "../";
import { useContractFunction } from "./useContractFunction";

export type ProposeProps = {
  amount: string;
  duration: string;
  rate: string;
};

export const usePropose = () => {
  const { account } = useMoralis();
  const { newAlert } = useApp();
  const { runFunction: runExchangeFunction } = useContractFunction("exchange");
  const { runFunction: runUsdcFunction } = useContractFunction("usdc");

  const propose = async ({ amount, duration, rate }: ProposeProps) => {
    const spender = EXCHANGE_ADDRESS;
    const successMessage = `Proposed (${amount},${duration},${rate})`;

    amount = Moralis.Units.Token(amount, USDC_DECIMALS);
    rate = ((10 * Number(rate)) % 100).toString();

    const tx = await runUsdcFunction({
      functionName: "approve",
      params: { amount: amount, spender: spender },
    });

    const receipt = await tx.wait(1);

    receipt &&
      (await runExchangeFunction({
        successMessage: successMessage,
        functionName: "propose",
        params: { amount, duration, rate },
      }));
  };

  const handlePropose = async ({ data }: FormDataReturned) => {
    let amount =
      data?.find((input) => input.key == "AMOUNT")?.inputResult.toString() ||
      "0";
    let duration =
      data?.find((input) => input.key == "DURATION")?.inputResult.toString() ||
      "0";
    let rate =
      data?.find((input) => input.key == "RATE")?.inputResult.toString() || "0";

    if (account) {
      return propose({ amount, duration, rate });
    } else {
      newAlert({ type: "error", message: "Wallet not connected!" });
    }
  };

  return { propose, handlePropose };
};
