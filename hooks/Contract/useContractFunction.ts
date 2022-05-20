import { useWeb3Contract } from "react-moralis";
import { Moralis } from "moralis";
import { USDC_CONFIG, EXCHANGE_CONFIG } from "../../constants";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { useApp } from "..";

/**
 * General function that wraps Moralis
 * @param contract
 * @returns A function to run contract methods that will send notifications upon success or error
 */

export const useContractFunction = (contract: "exchange" | "usdc") => {
  const { runContractFunction } = useWeb3Contract({});
  const { newAlert } = useApp();

  const CONFIG = contract == "exchange" ? EXCHANGE_CONFIG : USDC_CONFIG;

  type MethodProps = {
    successMessage?: string;
    functionName: string;
    msgValue?: string;
    params?: Moralis.ExecuteFunctionParams;
  };

  const runFunction = async ({
    successMessage,
    functionName,
    msgValue,
    params,
  }: MethodProps) => {
    const options: Moralis.ExecuteFunctionOptions = {
      ...CONFIG,
      functionName, // "mint"
      msgValue, // "0"
      params, //"{account: "0xkjnsj, amount: "10000"}
    };

    console.log(`Options - `, options);

    const tx = (await runContractFunction({
      params: options,
      onError: (e) => newAlert({ type: "error", message: e.message }),
      onSuccess: (tx) =>
        newAlert({
          type: "success",
          message: successMessage
            ? successMessage + ` (${(tx as TransactionResponse).hash})`
            : `(${(tx as TransactionResponse).hash})`,
        }),
    })) as TransactionResponse;

    return tx;
  };

  return { runFunction };
};
