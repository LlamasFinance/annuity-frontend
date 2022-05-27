import React, { useState } from "react";
import SetUserInfoModal from "./SetUserInfoModal";

const SetUserInfoButton = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  // const { propose } = useContract();

  return (
    <>
      <button className="btn-dark btn" onClick={() => setModalVisibility(true)}>
        Edit Username
      </button>
      <SetUserInfoModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  );
};

export default SetUserInfoButton;
