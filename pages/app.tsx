import React from "react";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import ProposeButton from "../components/Contract/ProposeButton";
import { useContract, useTokenValue } from "../hooks";
// import { useDexEthPrice } from "eth-hooks/hooks/dapps";

const App: NextPage = () => {
  const { isInitialized } = useMoralis();
  const { testContract } = useContract();
  //   const price = useDexEthPrice(undefined);
  //   console.log("price", price);
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
