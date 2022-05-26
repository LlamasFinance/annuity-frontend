import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { useAlert } from "../../hooks";
import { useContract } from "../../hooks/Contract/useContract";

export const MintForm = () => {
  const [key, setKey] = useState("mint");
  const { mint, isMinting } = useContract();
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const { newAlert } = useAlert();

  const handleMintSubmit = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        await mint({
          receiver: account || "",
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
        onSubmit={handleMintSubmit}
        title="Mint USDC tokens"
        id="mint-form"
      />
    </div>
  );
};
