import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { useAlert } from "../../hooks";
import { useContract } from "../../hooks/Contract/useContract";

export const MintForm = () => {
  const [key, setKey] = useState("mint");
  const { mint, isMinting } = useContract();
  const { account, isInitialized, authenticate } = useMoralis();
  const { newAlert } = useAlert();

  const handleMintSubmit = React.useCallback(
    (data) => {
      if (isInitialized) {
        if (!account) authenticate();
        mint({
          receiver: account || "",
          amount: data.data.find(({ key }: { key: string }) => key === "AMOUNT")
            ?.inputResult,
        });
      }
    },
    [account]
  );

  return (
    <div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${isMinting && "loading"}`}
            id="form-submit"
          >
            Mint
          </button>
        }
        data={[
          {
            inputWidth: "50%",
            name: "USDC amount",
            type: "text",
            value: "",
            key: "AMOUNT",
          },
        ]}
        key={key}
        onSubmit={(data) => {
          handleMintSubmit(data);
          setKey(key + new Date().toString());
        }}
        title="Mint USDC tokens"
        id="mint-form"
      />
    </div>
  );
};
