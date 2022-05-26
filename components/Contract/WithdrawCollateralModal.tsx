import React from "react";
import { Modal } from "web3uikit";
import { Form } from "web3uikit";
import { WithdrawCollateralForm } from "./WithdrawCollateralForm";
import { WithdrawForm } from "./WithdrawForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  id: string;
}

export const WithdrawCollateralModal = ({ isVisible, onClose, id }: Props) => {
  return (
    <Modal
      id={"withdraw-modal-id"}
      key={"withdraw-modal-key"}
      title="Withdraw Collateral"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <WithdrawCollateralForm id={id} />
    </Modal>
  );
};

export default WithdrawCollateralModal;
