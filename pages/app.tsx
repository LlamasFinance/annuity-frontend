import React from "react";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import ProposeButton from "../components/Contract/ProposeButton";
import { useContract } from "../hooks";

const App: NextPage = () => {
  const { isInitialized } = useMoralis();
  const { testContract } = useContract();

  if (isInitialized) {
    return (
      <div>
        <h1>App</h1>
        <button className="btn btn-primary" onClick={testContract}>
          Test contract
        </button>{" "}
        <ProposeButton />
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
