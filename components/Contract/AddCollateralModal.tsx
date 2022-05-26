import React from "react";
import { Modal } from "web3uikit";
import { Form } from "web3uikit";
import { AddCollateralForm } from "./AddCollateralForm";
import { WithdrawForm } from "./WithdrawForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  id: string;
}

export const AddCollateralModal = ({ isVisible, onClose, id }: Props) => {
  return (
    <Modal
      title="Add Collateral"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <AddCollateralForm id={id} />
    </Modal>
  );
};

export default AddCollateralModal;
