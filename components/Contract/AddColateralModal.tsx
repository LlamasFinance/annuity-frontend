import React from "react";
import { Modal } from "web3uikit";
import { AddColateralForm } from "./AddColateralForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataReturned) => void;
}

export const AddColateralModal = ({ isVisible, onSubmit, onClose }: Props) => {
  return (
    <Modal
      title="Add Colateral"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <AddColateralForm onSubmit={onSubmit} />
    </Modal>
  );
};

export default AddColateralModal;