import { Form } from "web3uikit";
import { MintForm } from "..";
import { useContract } from "../../hooks";
export const ProposeForm = () => {
  const { handlePropose } = useContract();
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
        onSubmit={handlePropose}
        title="Propose Agreement"
        id="propose-form"
      />
    </div>
  );
};
