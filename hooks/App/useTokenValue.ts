import { BigNumber } from "ethers";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useTokenPrice } from "react-moralis";
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
export const useTokenValue = ({ amount, inputType }: Props) => {
  const [inUsdc, setUsdc] = useState("");
  const [inUsd, setUsd] = useState("");
  const [inWei, setWei] = useState("");
  const [inEth, setEth] = useState("");
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

  useEffect(() => {
    updateNativePrice();
  }, []);
  useEffect(() => {
    updateValue({ amount: amount, inputType: inputType });
  }, [amount, inputType]);

  /**
   * Updates native price
   */
  const updateNativePrice = async () => {
    const results = await fetchUsdEth({
      onSuccess: (results) => {},
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    let nativePrice = results?.nativePrice?.value || "0"; // wei per 1$
    nativePrice = Moralis.Units.FromWei(nativePrice); // eth per 1$
    setNativePrice(nativePrice);
  };

  const updateValue = async (props: Props) => {
    await updateNativePrice();
    const { inUsd, inUsdc, inEth, inWei } = getValue(props);
    setUsd(inUsd);
    setUsdc(inUsdc);
    setEth(inEth);
    setWei(inWei);
  };

  const getValue = ({ amount, inputType }: Props) => {
    let inUsd = "",
      inUsdc = "",
      inEth = "",
      inWei = "";
    if (amount && inputType && nativePrice) {
      if (inputType == "eth") {
        inEth = amount;
        inWei = Moralis.Units.Token(amount, 18);
        inUsd = (Number(inEth) / Number(nativePrice)).toFixed(4).toString();
      } else if (inputType == "wei") {
        inWei = amount;
        inEth = Number(Moralis.Units.FromWei(amount)).toFixed(4).toString();
        inUsd = (Number(inEth) / Number(nativePrice)).toFixed(4).toString();
      } else if (inputType == "usd") {
        inUsd = amount;
        inEth = (Number(nativePrice) * Number(inUsd)).toFixed(4).toString();
        inWei = Moralis.Units.Token(inEth, 18);
      } else {
        inUsd = Moralis.Units.FromWei(amount, 6);
        inEth = (Number(nativePrice) * Number(inUsd)).toFixed(8).toString();
        inWei = Moralis.Units.Token(inEth, 18);
      }
      inUsdc = Moralis.Units.Token(inUsd, 6);
    }
    return {
      inUsdc: inUsdc,
      inUsd: inUsd,
      inWei: inWei,
      inEth: inEth,
    };
  };

  return {
    inUsd,
    inEth,
    inWei,
    inUsdc,
    updateValue,
    getValue,
    updateNativePrice,
  };
};
