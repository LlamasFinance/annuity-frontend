import React from "react";
import { Modal } from "web3uikit";
import { RepayLoanForm } from "./RepayLoanForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { MintForm } from "./MintForm";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataReturned) => void;
}

export const RepayLoanModal = ({ isVisible, onSubmit, onClose }: Props) => {
  return (
    <Modal
      title="Add Colateral"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <MintForm />
      <RepayLoanForm onSubmit={onSubmit} />
    </Modal>
  );
};

export default RepayLoanModal;