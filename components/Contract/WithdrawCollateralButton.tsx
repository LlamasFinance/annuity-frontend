import React, { useState } from "react";
import { WithdrawCollateralModal } from "./WithdrawCollateralModal";
import { useContract } from "../../hooks";

interface Props {
  id: string;
}

const WithdrawCollateralButton = ({ id }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  return (
    <>
      <button className="btn-dark btn" onClick={() => setModalVisibility(true)}>
        Withdraw Collateral
      </button>
      <WithdrawCollateralModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        id={id}
      />
    </>
  );
};

export default WithdrawCollateralButton;
