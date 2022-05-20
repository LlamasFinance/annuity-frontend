import { ethers } from "ethers";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useContract } from "../hooks/Contract/logic";

const App: NextPage = () => {
  const { isInitialized, account } = useMoralis();

  const {
    mint,
    propose,
    activate,
    addCollateral,
    withdrawCollateral,
    repay,
    close,
    fetchAgrementData,
    isMinting,
    mintingSuccess,
    mintingError,
    isProposing,
    proposeSuccess,
    proposeError,
    isActivating,
    activateSuccess,
    activateError,
    isAddingCollateral,
    addingCollateralSuccess,
    addingCollateralError,
    isWithdrawingCollateral,
    withdrawingCollateralSuccess,
    withdrawingCollateralError,
    isRepaying,
    repaySuccess,
    repayError,
    isClosing,
    closeSuccess,
    closeError,
    agreementData,
  } = useContract();

  const usdcAmount = "100";
  const handleMint = async () => {
    await mint({ receiver: account!, amount: usdcAmount });
  };
  const handlePropose = async () => {
    await propose({ amount: usdcAmount, duration: "1", rate: "5.55" });
  };
  const handleFetchAgreementData = async () => {
    await fetchAgrementData({ id: "1" });
  };

  if (isInitialized) {
    return (
      <div>
        <h1>App</h1>
        <button className="btn btn-primary" onClick={handleMint}>
          Mint 100 USDC
        </button>
        <button className="btn btn-primary" onClick={handlePropose}>
          Propose Agreement
        </button>
        <button className="btn btn-primary" onClick={handleFetchAgreementData}>
          Fetch agreement data
        </button>
        <div>
          Agreement Data:
          {JSON.stringify(agreementData)}
        </div>
        {/* <Link href="/propose">
          <a className="btn btn-secondary">New Proposal</a>
        </Link> */}
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
