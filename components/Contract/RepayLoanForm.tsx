import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { SECONDS_IN_YEAR } from "../../constants";
import { useAlert, useContract } from "../../hooks";
import useFetchSpecificAgreements from "../../hooks/App/db/useFetchSpecificAgreement";

interface Props {
  id: string;
}

export const RepayLoanForm = ({ id }: Props) => {
  const [key, setKey] = useState("repay");
  const { repay, isRepaying } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();
  const { start, duration, futureValue } = useFetchSpecificAgreements(id);
  const end = new Date(
    (parseInt(start) + parseInt(duration) * SECONDS_IN_YEAR) * 1000
  ).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRepay = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await repay({
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
      <p>
        You must repay ${Moralis.Units.FromWei(futureValue || "0", 6)} USDC by
        end.{" "}
      </p>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${isRepaying && "loading"}`}
            id="form-submit"
          >
            Repay
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
        ]}
        key={key}
        onSubmit={handleRepay}
        title=""
        id="repay-form"
      />
    </div>
  );
};
