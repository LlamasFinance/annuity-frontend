import React, { useState } from 'react'
import SetUserInfoModal from './SetUserInfoModal';

const SetUserInfoButton = () => {
    const [isModalVisible, setModalVisibility] = useState(false);
  // const { propose } = useContract();

  return (
    <>
      <button
        className="btn btn-primary absolute right-4 top-4"
        onClick={() => setModalVisibility(true)}
      >
        Edit Profile
      </button>
      <SetUserInfoModal
        isVisible={isModalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  );
}

export default SetUserInfoButton