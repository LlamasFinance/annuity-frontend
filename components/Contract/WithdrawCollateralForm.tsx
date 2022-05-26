import { BigNumber } from "ethers";
import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";
import useFetchSpecificAgreements from "../../hooks/App/db/useFetchSpecificAgreement";

interface Props {
  id: string;
}

export const WithdrawCollateralForm = ({ id }: Props) => {
  const [key, setKey] = useState("wDrawCollateral");
  const { withdrawCollateral, isWithdrawingCollateral } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();
  const { collateral, minReqCollateral, status } =
    useFetchSpecificAgreements(id);
  const repaid = status == "2";
  const maxWithdrawAmt = repaid
    ? collateral
    : BigNumber.from(collateral || "0")
        .sub(minReqCollateral || "0")
        .toString();
  const maxEthWithdrawAmt = Moralis.Units.FromWei(maxWithdrawAmt);
  const message = repaid
    ? `Since the agreement has been repaid, you can withdraw all of your collateral ${maxEthWithdrawAmt} ETH`
    : `You cannot withdraw more than ${maxEthWithdrawAmt} ETH or else you will be liquidated.`;

  const handleWithdrawCollateral = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await withdrawCollateral({
          id: id,
          amount: data.data.find(({ key }: { key: string }) => key === "AMOUNT")
            ?.inputResult,
        });
      }
      // clear form entry
      setKey(key.substring(0, 3) + new Date().toString());
    },
    [account, isAuthenticated, isInitialized]
  );

  return (
    <div>
      <p>{message}</p>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${
              isWithdrawingCollateral && "loading"
            }`}
            id="form-submit"
          >
            Withdraw
          </button>
        }
        data={[
          {
            inputWidth: "100%",
            name: "Eth amount",
            type: "text",
            value: "",
            key: "AMOUNT",
          },
        ]}
        key={key}
        onSubmit={handleWithdrawCollateral}
        title=""
        id="withdraw-colateral-form"
      />
    </div>
  );
};
