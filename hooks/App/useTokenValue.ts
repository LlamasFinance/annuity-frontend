import { BigNumber } from "ethers";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useTokenPrice } from "react-moralis";
import { useAlert } from "./useAlert";

/**
 * @param weiAmount Eth with 18 decimals
 * @param ethAmount Eth
 * @param usdcAmount Usdc with 6 decimals
 */
interface Props {
  weiAmount?: string;
  ethAmount?: string;
  usdcAmount?: string;
}
export const useTokenValue = ({ weiAmount, ethAmount, usdcAmount }: Props) => {
  const [usdcValue, setUsdcValue] = useState("");
  const [weiValue, setWeiValue] = useState("");
  const [ethValue, setEthValue] = useState("");
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
    if (weiAmount) {
      getWeiValue(weiAmount);
    }
    if (ethAmount) {
      getEthValue(ethAmount);
    }
    if (usdcAmount) {
      getUsdcValue(usdcAmount);
    }
  }, [weiAmount, ethAmount, usdcAmount]);

  /**
   *
   * @param amount WEI with 18 decimals
   */
  const getWeiValue = async (amount: string) => {
    amount = Moralis.Units.FromWei(amount, 18);
    const results = await fetchUsdEth({
      onSuccess: (results) => {},
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    let nativePrice = results?.nativePrice?.value || ""; // wei per 1$
    nativePrice = Moralis.Units.FromWei(nativePrice); // eth per 1$
    const convertedValue = (Number(amount) / Number(nativePrice)).toString();
    setWeiValue(convertedValue);
    console.log(`wei value $${convertedValue}`);
    return convertedValue;
  };

  /**
   *
   * @param amount Eth
   */
  const getEthValue = async (amount: string) => {
    const results = await fetchUsdEth({
      onSuccess: (results) => {},
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    let nativePrice = results?.nativePrice?.value || ""; // wei per 1$
    nativePrice = Moralis.Units.FromWei(nativePrice); // eth per 1$
    const convertedValue = (Number(amount) / Number(nativePrice)).toString();
    setEthValue(convertedValue);
    console.log(`eth value $${convertedValue}`);
    return convertedValue;
  };

  /**
   *
   * @param amount Usdc with 6 decimals
   */
  const getUsdcValue = async (amount: string) => {
    const convertedValue = Moralis.Units.FromWei(amount, 6);
    setUsdcValue(convertedValue);
    console.log(`usdc value $${convertedValue}`);
    return amount;
  };

  return {
    usdcValue,
    weiValue,
    ethValue,
    getUsdcValue,
    getWeiValue,
    getEthValue,
  };
};
