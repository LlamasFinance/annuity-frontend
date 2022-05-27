import React from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useAlert, useContract } from "../../hooks";
import { BsFillExclamationCircleFill } from 'react-icons/bs';

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

  return (
    <div>
      <div className="m-4 mt-8 flex items-center">
       <BsFillExclamationCircleFill />
        <p className="ml-2">
        {`It's always good to add extra ETH collateral to derisk your chances of getting liquidated`}
        </p>
      </div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${isAddingCollateral && "loading"}`}
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
        onSubmit={handleAddCollateral}
        title=""
        id="colateral-form"
      />
    </div>
  );
};
