import { ethers } from "ethers";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useContract } from "../hooks";

const App: NextPage = () => {
  const { isInitialized } = useMoralis();
  const { events } = useContract();
  console.log(events);

  if (isInitialized) {
    return (
      <div>
        <h1>App</h1>
        <Link href="/propose">
          <a className="btn btn-secondary">New Proposal</a>
        </Link>
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
