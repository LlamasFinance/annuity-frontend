import React, { useState } from "react";
import { ActivateModal } from "./ActivateModal";
import { useContract } from "../../hooks";

interface Props {
  id: string;
}

const ActivateButton = ({ id }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  console.log(`ismodalvisible ${isModalVisible}`);
  return (
    <>
      <button
        className="btn-dark btn ml-8"
        onClick={() => setModalVisibility(true)}
      >
        Activate Agreement
      </button>
      <ActivateModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
        id={id}
      />
    </>
  );
};

export default ActivateButton;
