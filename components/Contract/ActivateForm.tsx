import React from "react";
import { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";
import useFetchSpecificAgreements from "../../hooks/App/db/useFetchSpecificAgreement";
import { BigNumber } from "ethers";

interface Props {
  id: string;
}

export const ActivateForm = ({ id }: Props) => {
  const [key, setKey] = useState("activate");
  const { activate, isActivating } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();
  const { minReqCollateral } = useFetchSpecificAgreements(id);

  const handleActivate = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await activate({
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

  const minReqCollateralEth = Moralis.Units.FromWei(
    BigNumber.from(minReqCollateral || "0")
      .mul("101")
      .div("1000")
      .toString()
  );
  const message = `The minimum required ETH to activate this agreement is
        ${minReqCollateralEth} ETH
        but it's recommended to deposit more so that you won't get liquidated
        immediately.`;
  return (
    <div>
      <p className="m-4 mt-8">{message}</p>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn-dark btn ${isActivating && "loading"}`}
            id="form-submit"
          >
            Activate
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
        id={"activate-form-id"}
        key={key}
        onSubmit={handleActivate}
        title=""
      />
    </div>
  );
};
