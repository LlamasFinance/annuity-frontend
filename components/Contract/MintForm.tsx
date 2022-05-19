import { Form } from "web3uikit";
import { useContract } from "../../hooks";

export const MintForm = () => {
  const { handleMint } = useContract();
  return (
    <div>
      <Form
        customFooter={
          <button type="submit" className="btn btn-primary" id="form-submit">
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
        ]}
        onSubmit={handleMint}
        title="Mint Free USDC"
        id="mint-form"
      />
    </div>
  );
};
