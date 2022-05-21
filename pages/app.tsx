import React from "react";
import { NextPage } from "next";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ProposeModal } from "../components";

const App: NextPage = () => {
  const { isInitialized } = useMoralis();

  const [isProposeModalVisible, setProposeModalVisibility] = useState(false);

  if (isInitialized) {
    return (
      <div>
        <h1>App</h1>
        <button
          className="btn btn-primary"
          onClick={() => setProposeModalVisibility(true)}
        >
          Propose Agreement
        </button>
        <ProposeModal
          isVisible={isProposeModalVisible}
          onClose={() => setProposeModalVisibility(false)}
          onSubmit={() => {}}
        />
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
