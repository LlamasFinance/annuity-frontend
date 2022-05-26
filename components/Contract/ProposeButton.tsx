import React from "react";
import { ProposeModal } from "./ProposeModal";
import { useContract } from "../../hooks";

const ProposeButton = () => {
  const [isModalVisible, setModalVisibility] = React.useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setModalVisibility(true)}
      >
        New Proposal
      </button>
      <ProposeModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  );
};

export default ProposeButton;
