import { formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useMoralis, useTokenPrice } from "react-moralis";
import { useAlert } from "./useAlert";

enum inputType {
  wei,
  eth,
  usd,
  usdc,
}
/**
 * @param amount token amount
 * @param inputType wei, eth, usd,usdc
 */
interface Props {
  amount?: string;
  inputType?: "wei" | "eth" | "usd" | "usdc";
}
export const useTokenValue = () => {
  const [nativePrice, setNativePrice] = useState(""); // eth per 1$
  const { newAlert } = useAlert();
  const {
    fetchTokenPrice: fetchUsdEth,
    data: formattedEthUsdData,
    error: usdEthError,
    isLoading: isUsdEthLoading,
    isFetching: isUsdEthFetching,
  } = useTokenPrice({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", //usdc
    chain: "eth",
  });
  const { isInitialized } = useMoralis();

  useEffect(() => {
    if (isInitialized) {
      updateNativePrice();
    }
  }, [isInitialized]);

  /**
   * Updates native price
   */
  const updateNativePrice = async () => {
    // const results = await fetchUsdEth({
    //   onSuccess: (results) => {},
    //   onError: (e) => newAlert({ type: "error", message: e.message }),
    // });
    // let nativePrice = results?.nativePrice?.value || "0"; // wei per 1$
    // nativePrice = Moralis.Units.FromWei(nativePrice); // eth per 1$
    setNativePrice("333333333333333");
  };

  const getValue = ({ amount: amountString, inputType }: Props) => {
    let { inUsd, inUsdc, inEth, inWei } = {
      inUsd: amountString || "",
      inUsdc: amountString || "",
      inEth: amountString || "",
      inWei: amountString || "",
    };

    if (inputType == "usd") {
      try {
        // clear floats, convert to usdc
        amountString = ((Number(amountString) * 10) ^ 6).toString();
        inputType = "usdc";
      } catch {
        console.log("error converting usd to usdc");
      }
    }

    if (!nativePrice) {
      // native price must be set first
      return { inUsd, inUsdc, inEth, inWei };
    }

    if (!amountString || !inputType) {
      throw "amount and input must have values";
    }

    if (amountString.indexOf(".") != -1) {
      throw "amount cannot be a float";
    }

    let amount = BigNumber.from("0");
    try {
      amount = BigNumber.from(amountString);
    } catch {
      console.log("error converting amount to big number");
      return { inUsd, inUsdc, inEth, inWei };
    }

    try {
      if (inputType == "eth") {
        inEth = amount.toString();
        inWei = Moralis.Units.Token(amount.toString(), 18);
        inUsd = parseUnits(amount.toString(), 18).div(nativePrice).toString();
        inUsdc = Moralis.Units.Token(inUsd, 6);
      } else if (inputType == "wei") {
        inWei = amount.toString();
        inEth = formatUnits(amount, 18);
        inUsd = amount.div(nativePrice).toString();
        inUsdc = Moralis.Units.Token(inUsd, 6);
      } else {
        // inputType == usdc
        console.log(inputType, amount);
        inUsdc = amount.toString();
        inUsd = Moralis.Units.FromWei(inUsdc, 6);
        inWei = amount.mul(nativePrice).div("10").toString();
        inEth = formatUnits(inWei, 18);
      }
    } catch {
      console.log("something went wrong converting token values");
    }
    return {
      inUsdc: inUsdc,
      inUsd: Number(inUsd).toLocaleString("en-US"),
      inWei: inWei,
      inEth: Number(inEth).toLocaleString(),
    };
  };

  return {
    getValue,
    updateNativePrice,
  };
};
