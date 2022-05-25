import React, { useState } from "react";
import { RepayLoanModal } from "./RepayLoanModal";
import { useContract } from "../../hooks";

const RepayLoanButton = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  // const { propose } = useContract();

  // const handleColateralSubmit = React.useCallback(async (data) => {
  //   
  //   setModalVisibility(false);
  // }, []);

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
        onSubmit={() => console.log()}
      />
    </>
  );
};

export default RepayLoanButton;