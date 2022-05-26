import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";

interface Props {
  id: string;
}

export const WithdrawCollateralForm = ({ id }: Props) => {
  const [key, setKey] = useState("wDrawCollateral");
  const { withdrawCollateral, isWithdrawingCollateral } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();

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
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${
              isWithdrawingCollateral && "loading"
            }`}
            id="form-submit"
          >
            Add
          </button>
        }
        data={[
          {
            inputWidth: "100%",
            name: "eth amount",
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
