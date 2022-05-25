import React, { useState } from "react";
import { RepayLoanModal } from "./RepayLoanModal";
import { useContract } from "../../hooks";

const RepayLoanButton = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  // const { propose } = useContract();

  const handleRepayLoan = React.useCallback(async (data) => {
    alert('repay loan')
    setModalVisibility(false);
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setModalVisibility(true)}
      >
        Repay Loan
      </button>
      <RepayLoanModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        onSubmit={handleRepayLoan}
      />
    </>
  );
};

export default RepayLoanButton;