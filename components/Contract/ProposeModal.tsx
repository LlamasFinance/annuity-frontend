import React from "react";
import { Modal } from "web3uikit";
import { ProposeForm } from "./ProposeForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { MintForm } from "./MintForm";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataReturned) => void;
}

export const ProposeModal = ({ isVisible, onSubmit, onClose }: Props) => {
  return (
    <Modal
      title="Propose Agreement"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <MintForm />
      <ProposeForm onSubmit={onSubmit} />
    </Modal>
  );
};

export default ProposeModal;
