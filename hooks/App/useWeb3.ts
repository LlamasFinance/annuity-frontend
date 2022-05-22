import { BigNumber } from "ethers";
import Moralis from "moralis";
import { useState } from "react";
import { useTokenPrice } from "react-moralis";
import { useAlert } from "./useAlert";

export const useWeb3 = () => {
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
  const [usdValue, setUsdValue] = useState("");

  /**
   * get usd value from eth amount
   */
  const getUsdFromETH = async ({ amount }: Web3.GetUsdEthProps) => {
    await fetchUsdEth({
      onSuccess: (results) => {
        let nativePrice = results?.nativePrice?.value || ""; // wei per 1$
        nativePrice = Moralis.Units.FromWei(nativePrice); // eth per 1$
        const convertedValue = (
          Number(amount) / Number(nativePrice)
        ).toString();
        setUsdValue(convertedValue);
        console.log(`eth value $${convertedValue}`);
      },
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    return usdValue;
  };

  return {
    getUsdFromETH,
    usdEthError,
    isUsdEthFetching,
    isUsdEthLoading,
    usdValue,
  };
};

namespace Web3 {
  /**
   * @props amount Amount of ETH
   */
  export type GetUsdEthProps = {
    amount: string;
  };
}
