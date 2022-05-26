import React from "react";
import { Modal } from "web3uikit";
import { Form } from "web3uikit";
import { ActivateForm } from "./ActivateForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  id: string;
}

export const ActivateModal = ({ isVisible, onClose, id }: Props) => {
  console.log(`modalisvisible ${isVisible}`);
  return (
    <Modal
      id={"activate-modal-id"}
      key={"activate-modal-key"}
      title="Activate Agreement"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <ActivateForm id={id} />
    </Modal>
  );
};

export default ActivateModal;
