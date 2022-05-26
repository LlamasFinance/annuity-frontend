import React from "react";
import { Modal } from "web3uikit";
import { Form } from "web3uikit";
import { WithdrawCollateralForm } from "./WithdrawCollateralForm";
import { RepayLoanForm } from "./RepayLoanForm";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import useFetchSpecificAgreements from "../../hooks/App/db/useFetchSpecificAgreement";
import { SECONDS_IN_YEAR } from "../../constants";
import Moralis from "moralis";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  id: string;
}

export const RepayLoanModal = ({ isVisible, onClose, id }: Props) => {
  return (
    <Modal
      id={"repay-modal-id"}
      key={"repay-modal-key"}
      title="Repay Loan"
      isVisible={isVisible}
      hasFooter={false}
      headerHasBottomBorder
      onCloseButtonPressed={onClose}
    >
      <RepayLoanForm id={id} />
    </Modal>
  );
};

export default RepayLoanModal;
