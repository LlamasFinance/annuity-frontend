import React, { useState } from "react";
import { AddCollateralModal } from "./AddCollateralModal";
import { useContract } from "../../hooks";

interface Props {
  id: string;
}

const AddCollateralButton = ({ id }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setModalVisibility(true)}
      >
        Add Collateral
      </button>
      <AddCollateralModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        id={id}
      />
    </>
  );
};

export default AddCollateralButton;
