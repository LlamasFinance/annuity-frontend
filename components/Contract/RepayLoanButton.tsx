import React, { useState } from "react";
import { RepayLoanModal } from "./RepayLoanModal";
import { useContract } from "../../hooks";

interface Props {
  id: string;
}

const RepayLoanButton = ({ id }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  return (
    <>
      <button className="btn-dark btn" onClick={() => setModalVisibility(true)}>
        Repay Loan
      </button>
      <RepayLoanModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        id={id}
      />
    </>
  );
};

export default RepayLoanButton;
