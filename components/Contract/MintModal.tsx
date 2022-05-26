import React from "react";
import { Modal } from "web3uikit";
import { RepayLoanForm } from "./RepayLoanForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { MintForm } from "./MintForm";
import  AddUsdcToken from "./AddUsdcToken";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const MintModal = ({ isVisible, onClose }: Props) => {
  return (
    <Modal
      title="Mint USDC"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <AddUsdcToken />
      <MintForm />
    </Modal>
  );
};

export default MintModal;