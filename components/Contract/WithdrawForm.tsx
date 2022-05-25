import { useState } from "react";
import { Form } from "web3uikit";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useContract } from "../../hooks";

interface Props {
  onSubmit: (data: FormDataReturned) => void;
}

export const WithdrawForm = ({ onSubmit }: Props) => {
  const [key, setKey] = useState("withdraw");
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
            Withdraw
          </button>
        }
        data={[
          {
            inputWidth: "100%",
            name: "ETH Amount",
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
        title="Withdraw Collateral"
        id="withdraw-form"
      />
    </div>
  );
};