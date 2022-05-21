import React from "react";
import { ethers } from "ethers";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useContract } from "../hooks/Contract/logic";
import { usePropose } from "../hooks/Contract/usePropose";
import ProposeModal from "../components/Contract/ProposeModal";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useApp } from "../hooks/App/index";

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
  const { handlePropose } = usePropose();
  const { newAlert } = useApp();

  const [isProposeModalVisible, setProposeModalVisibility] =
    React.useState(false);

  const usdcAmount = "100";
  const handleMint = async () => {
    await mint({ receiver: account!, amount: usdcAmount });
  };
  const handleProposeSubmit = async (data: FormDataReturned) => {
    try {
      await handlePropose(data);
      setProposeModalVisibility(false);
    } catch (error) {
      newAlert({ type: "error", message: "Something went wrong" });
    }
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
        <button
          className="btn btn-primary"
          onClick={() => setProposeModalVisibility(true)}
        >
          Propose Agreement
        </button>
        <button className="btn btn-primary" onClick={handleFetchAgreementData}>
          Fetch agreement data
        </button>
        <div>
          Agreement Data:
          {JSON.stringify(agreementData)}
        </div>
        <ProposeModal
          isVisible={isProposeModalVisible}
          onClose={() => setProposeModalVisibility(false)}
          onSubmit={handleProposeSubmit}
        />
      </div>
    );
  }

  return <h1>Error</h1>;
};

export default App;
