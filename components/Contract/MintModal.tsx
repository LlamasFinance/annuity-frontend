import React from "react";
import { Modal } from "web3uikit";
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