import React, { useState } from "react";
import { MintModal } from "./MintModal";
import { useContract } from "../../hooks";

const MintButton = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  // const { propose } = useContract();

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setModalVisibility(true)}
      >
        Mint USDC
      </button>
      <MintModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  );
};

export default MintButton;