import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";

interface Props {}

export const ProposeForm = () => {
  const [key, setKey] = useState("propose");
  const { propose, isApproving, isProposing } = useContract();
  const { account, isAuthenticated, isInitialized } = useMoralis();
  const { newAlert } = useAlert();

  const handleProposeSubmit = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await propose({
          amount: data.data.find(({ key }: { key: string }) => key === "AMOUNT")
            ?.inputResult,
          duration: data.data.find(
            ({ key }: { key: string }) => key === "DURATION"
          )?.inputResult,
          rate: data.data.find(({ key }: { key: string }) => key === "RATE")
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
              (isApproving || isProposing) && "loading"
            }`}
            id="form-submit"
          >
            Submit
          </button>
        }
        data={[
          {
            inputWidth: "100%",
            name: "USDC amount",
            type: "text",
            value: "",
            key: "AMOUNT",
          },
          {
            inputWidth: "100%",
            name: "Duration (years)",
            type: "text",
            value: "",
            key: "DURATION",
          },
          {
            inputWidth: "100%",
            name: "Rate (%)",
            type: "text",
            value: "",
            key: "RATE",
          },
        ]}
        key={key}
        onSubmit={handleProposeSubmit}
        title="Propose Annuity Agreement"
        id="propose-form"
      />
    </div>
  );
};
