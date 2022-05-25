import { useState } from "react";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useContract } from "../../hooks";

interface Props {
  onSubmit: (data: FormDataReturned) => void;
}

export const RepayLoanForm = ({ onSubmit }: Props) => {
  const [key, setKey] = useState("propose");
//   const { isApproving, isProposing } = useContract();

  return (
    <div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${""}`}
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
        ]}
        key={key}
        onSubmit={(data) => {
          onSubmit(data);
          setKey(key + new Date().toString());
        }}
        title="USDC Amount"
        id="repayLoan-form"
      />
    </div>
  );
};