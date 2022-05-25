import { useState } from "react";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useContract } from "../../hooks";

interface Props {
  onSubmit: (data: FormDataReturned) => void;
}

export const ProposeForm = ({ onSubmit }: Props) => {
  const [key, setKey] = useState("propose");
  const { isApproving, isProposing } = useContract();

  return (
    <div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${
              isApproving ? "loading" : isProposing ? "loading" : ""
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
        onSubmit={(data) => {
          onSubmit(data);
          setKey(key + new Date().toString());
        }}
        title="Propose Annuity Agreement"
        id="propose-form"
      />
    </div>
  );
};
