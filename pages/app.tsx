import React from "react";
import { NextPage } from "next";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ProposeModal } from "../components";
import { useContract } from "../hooks";

const App: NextPage = () => {
  const { isInitialized } = useMoralis();
  const { testContract, propose } = useContract();
  const [isProposeModalVisible, setProposeModalVisibility] = useState(false);

  const handleAgreementSubmit = React.useCallback((data) => {
    setProposeModalVisibility(false);
    propose({
      amount: data.data.find(({ key }: { key: string }) => key === "AMOUNT")
        ?.inputResult,
      duration: data.data.find(({ key }: { key: string }) => key === "DURATION")
        ?.inputResult,
      rate: data.data.find(({ key }: { key: string }) => key === "RATE")
        ?.inputResult,
    });
  }, []);

  if (isInitialized) {
    return (
      <div>
        <h1>App</h1>
        <button className="btn btn-primary" onClick={testContract}>
          Test contract
        </button>{" "}
        <button
          className="btn btn-primary"
          onClick={() => setProposeModalVisibility(true)}
        >
          Propose Agreement
        </button>
        <ProposeModal
          isVisible={isProposeModalVisible}
          onClose={() => setProposeModalVisibility(false)}
          onSubmit={handleAgreementSubmit}
        />
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
