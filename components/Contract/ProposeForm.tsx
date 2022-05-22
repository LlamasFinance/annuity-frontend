import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  onSubmit: (data: FormDataReturned) => void;
}

export const ProposeForm = ({ onSubmit }: Props) => {
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
        onSubmit={onSubmit}
        title=""
        id="propose-form"
      />
    </div>
  );
};
