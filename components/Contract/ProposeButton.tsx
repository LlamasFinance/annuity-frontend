import React from "react";
import { ProposeModal } from "./ProposeModal";
import { useContract } from "../../hooks";

const ProposeButton = () => {
  const [isModalVisible, setModalVisibility] = React.useState(false);
  const { propose } = useContract();

  const handleAgreementSubmit = React.useCallback((data) => {
    setModalVisibility(false);
    propose({
      amount: data.data.find(({ key }: { key: string }) => key === "AMOUNT")
        ?.inputResult,
      duration: data.data.find(({ key }: { key: string }) => key === "DURATION")
        ?.inputResult,
      rate: data.data.find(({ key }: { key: string }) => key === "RATE")
        ?.inputResult,
    });
  }, []);

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
        onSubmit={handleAgreementSubmit}
      />
    </>
  );
};

export default ProposeButton;
