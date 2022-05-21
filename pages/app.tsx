import React from "react";
import { ethers } from "ethers";
import { Moralis } from "moralis";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMoralis, useTokenPrice } from "react-moralis";
import { useContract } from "../hooks/NewHooks/useContract";
import { useWeb3 } from "../hooks/NewHooks/useWeb3";

const App: NextPage = () => {
  const { isInitialized, account } = useMoralis();
  const { getUsdFromETH, usdValue } = useWeb3();
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
    mintTx,
    mintingError,
    isApproving,
    approveTx,
    approveError,
    isProposing,
    agreementID,
    proposeError,
    isActivating,
    activateTx,
    activateError,
    isAddingCollateral,
    addCollateralTx,
    addingCollateralError,
    isWithdrawingCollateral,
    withdrawCollateralTx,
    withdrawingCollateralError,
    isRepaying,
    repayTx,
    repayError,
    isClosing,
    closeTx,
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

  const handleActivate = async () => {
    let minReqCollateral = agreementData?.minReqCollateral;
    if (minReqCollateral) {
      minReqCollateral = Moralis.Units.FromWei(minReqCollateral);
      const amount = (Number(minReqCollateral) + 0.001).toString();
      await activate({ id: "1", amount: amount });
    }
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
        <button
          className="btn btn-primary"
          onClick={() =>
            getUsdFromETH({
              amount: Moralis.Units.FromWei(
                agreementData?.minReqCollateral || "0"
              ),
            })
          }
        >
          Convert min req collateral to usd
        </button>
        <button className="btn btn-primary" onClick={handleActivate}>
          Activate Agreement
        </button>
        <div>
          Agreement Data:
          {JSON.stringify(agreementData)}
          {usdValue}
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
