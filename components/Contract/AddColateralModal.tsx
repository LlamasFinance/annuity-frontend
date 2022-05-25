import React from "react";
import { Modal } from "web3uikit";
import { Form } from "web3uikit";
import { AddColateralForm } from "./AddColateralForm";
import { WithdrawForm } from "./WithdrawForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataReturned) => void;
}

export const AddColateralModal = ({ isVisible, onSubmit, onClose }: Props) => {

  const withdraw = React.useCallback(async (data) => {
    alert('withdraw');
  }, []);

  return (
    <Modal
      title="Add Collateral"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <AddColateralForm onSubmit={onSubmit} />

      <WithdrawForm onSubmit={onSubmit} />
    </Modal>
  );
};

export default AddColateralModal;