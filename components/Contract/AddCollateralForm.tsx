import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";
import { BsFillExclamationCircleFill } from "react-icons/bs";

interface Props {
  id: string;
}

export const AddCollateralForm = ({ id }: Props) => {
  const [key, setKey] = useState("addCollateral");
  const { addCollateral, isAddingCollateral } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();

  const handleAddCollateral = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await addCollateral({
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

  const message =
    "Providers! Add extra ETH collateral to make liquidations less likely!";

  return (
    <div>
      <div className="m-4 mt-8 flex items-center">
        <BsFillExclamationCircleFill />
        <p className="ml-2">{message}</p>
      </div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn-dark btn ${isAddingCollateral && "loading"}`}
            id="form-submit"
          >
            Add
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
        onSubmit={handleAddCollateral}
        title=""
        id="colateral-form"
      />
    </div>
  );
};
