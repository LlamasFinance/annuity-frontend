import React from "react";
import { Modal } from "web3uikit";
import { SetUserInfoForm } from './SetUserInfoForm';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const SetUserInfoModal = ({ isVisible, onClose }: Props) => {
  return (
    <Modal
      title="Edit Profile"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <SetUserInfoForm />
    </Modal>
  );
};

export default SetUserInfoModal;