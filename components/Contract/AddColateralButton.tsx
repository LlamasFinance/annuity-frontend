import React, { useState } from "react";
import { AddColateralModal } from "./AddColateralModal";
import { useContract } from "../../hooks";

const AddCollateralButton = () => {
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
        Add Colateral
      </button>
      <AddColateralModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        onSubmit={() => console.log()}
      />
    </>
  );
};

export default AddCollateralButton;