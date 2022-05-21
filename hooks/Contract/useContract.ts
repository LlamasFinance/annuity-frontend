import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, Contract } from "ethers";
import { Moralis } from "moralis";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  EXCHANGE_ADDRESS,
  EXCHANGE_CONFIG,
  USDC_CONFIG,
  USDC_DECIMALS,
} from "../../constants";
import { useAlert } from "../App/useAlert";
import { useDatabase } from "../";

export const useContract = () => {
  const { newAlert } = useAlert();
  const { saveAgreement } = useDatabase();
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const {
    data: mintTx,
    fetch: fetchMint,
    isFetching: isMinting,
    error: mintingError,
  } = useWeb3ExecuteFunction();
  const {
    data: approveTx,
    fetch: fetchApprove,
    isFetching: isApproving,
    error: approveError,
  } = useWeb3ExecuteFunction();
  const {
    data: agreementID,
    fetch: fetchPropose,
    isFetching: isProposing,
    error: proposeError,
  } = useWeb3ExecuteFunction();
  const {
    data: activateTx,
    fetch: fetchActivate,
    isFetching: isActivating,
    error: activateError,
  } = useWeb3ExecuteFunction();
  const {
    data: addCollateralTx,
    fetch: fetchAddCollateral,
    isFetching: isAddingCollateral,
    error: addingCollateralError,
  } = useWeb3ExecuteFunction();
  const {
    data: withdrawCollateralTx,
    fetch: fetchWithdrawCollateral,
    isFetching: isWithdrawingCollateral,
    error: withdrawingCollateralError,
  } = useWeb3ExecuteFunction();
  const {
    data: repayTx,
    fetch: fetchRepay,
    isFetching: isRepaying,
    error: repayError,
  } = useWeb3ExecuteFunction();
  const {
    data: closeTx,
    fetch: fetchClose,
    isFetching: isClosing,
    error: closeError,
  } = useWeb3ExecuteFunction();
  const {
    data: minReqCollateral,
    fetch: fetchMinReqCollateral,
    isFetching: isFetchingMinReqCollateral,
    error: minReqCollateralFetchError,
  } = useWeb3ExecuteFunction();
  const {
    data: isLiquidationRequired,
    fetch: fetchIsLiquidationRequired,
    isFetching: isFetchingIfLiquidationRequired,
    error: fetchingIfLiquidationRequiredError,
  } = useWeb3ExecuteFunction();
  const {
    data: agreementStruct,
    fetch: fetchAgreementStruct,
    isFetching: isFetchingAgreementStruct,
    error: fetchingAgreementStructError,
  } = useWeb3ExecuteFunction();
  const {
    data: numAgreements,
    fetch: fetchNumAgreements,
    isFetching: isFetchingNumAgreements,
    error: fetchingNumAgreementsError,
  } = useWeb3ExecuteFunction();
  const [fetchingAgreementData, setFetchingAgreement] = useState(false);
  const [updatedAgreement, setUpdatedAgreement] = useState(false);
  const [agreementData, setAgreementData] =
    useState<Contract.AgreementDetails>();

  useEffect(() => {
    if (agreementID) {
      const tx = agreementID as TransactionResponse;
      const receipt = tx.wait(1).then((receipt) => {
        console.log(`receipt ${JSON.stringify(receipt)}`);
      });

      // console.log(JSON.stringify(agreementID));
      //   const id = (agreementID as BigNumber).toString();
      //   fetchAgrementData({ id: id });
    }
  }, [agreementID]);

  /**
   * mint Tokens
   */
  const mint = async ({ receiver, amount }: Contract.MintProps) => {
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    await fetchMint({
      params: {
        ...USDC_CONFIG,
        functionName: "mint",
        params: { account: receiver, amount: usdcAmount },
      },
      onSuccess: () => {
        newAlert({ type: "success", message: `Successfully minted tokens!` });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * approve Token transfer
   */
  const approve = async ({ spender, amount }: Contract.ApproveProps) => {
    const tx = await fetchApprove({
      params: {
        ...USDC_CONFIG,
        functionName: "approve",
        params: {
          spender: spender,
          amount: amount,
        },
      },
      onSuccess: () => {
        newAlert({ type: "success", message: "Approved token transfer" });
      },
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    return tx as TransactionResponse;
  };

  /**
   * propose Agreememt
   */
  const propose = async ({ amount, duration, rate }: Contract.ProposeProps) => {
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    rate = ((10 * Number(rate)) % 100).toFixed(0);
    await approve({ spender: EXCHANGE_ADDRESS, amount: usdcAmount });
    await fetchPropose({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "propose",
        params: { amount: usdcAmount, duration: duration, rate: rate },
      },
      onSuccess: async () => {
        newAlert({
          type: "success",
          message: `Successfully proposed agreement. `,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * activate Agreement
   */
  const activate = async ({ id, amount }: Contract.ActivateProps) => {
    amount = Moralis.Units.ETH(amount);
    await fetchActivate({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "activate",
        params: { id: id, amount: amount },
        msgValue: amount,
      },
      onSuccess: () => {
        newAlert({
          type: "success",
          message: `Successfully activated Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * add collateral to Agreement
   */
  const addCollateral = async ({ id, amount }: Contract.AddCollateralProps) => {
    amount = Moralis.Units.ETH(amount);
    await fetchAddCollateral({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "addCollateral",
        params: { id: id, amount: amount },
        msgValue: amount,
      },
      onSuccess: () => {
        newAlert({
          type: "success",
          message: `Successfully added collateral to Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * withdraw collateral from Agreement
   */
  const withdrawCollateral = async ({
    id,
    amount,
  }: Contract.WithdrawCollateralProps) => {
    amount = Moralis.Units.ETH(amount);
    await fetchWithdrawCollateral({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "withdrawCollateral",
        params: { id: id, amount: amount },
      },
      onSuccess: () => {
        newAlert({
          type: "success",
          message: `Successfully withdrawed collateral from Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * repay Agreement
   */
  const repay = async ({ id, amount }: Contract.RepayProps) => {
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    await approve({ spender: EXCHANGE_ADDRESS, amount: usdcAmount });
    await fetchRepay({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "repay",
        params: { id: id, amount: amount },
      },
      onSuccess: () => {
        newAlert({
          type: "success",
          message: `Successfully repaid Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * close Agreement
   */
  const close = async ({ id }: Contract.CloseProps) => {
    await fetchClose({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "close",
        params: { id: id },
      },
      onSuccess: () => {
        newAlert({
          type: "success",
          message: `Successfully closed Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * get Agreement Data
   */
  const fetchAgrementData = async ({ id }: Contract.GetAgreementDataProps) => {
    setFetchingAgreement(true);
    setUpdatedAgreement(false);
    if (!isWeb3Enabled) {
      await enableWeb3();
    }
    await fetchMinReqCollateral({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "getMinReqCollateral",
        params: { id: id },
      },
      onSuccess: () => {
        console.log(`Min req collateral ${minReqCollateral}`);
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
    await fetchIsLiquidationRequired({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "isLiquidationRequired",
        params: { id: id },
      },
      onSuccess: () => {
        console.log(`Is Liquidation required ${isLiquidationRequired}`);
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
    await fetchAgreementStruct({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "s_idToAgreement",
        params: { "": id },
      },
      onSuccess: () => {
        console.log(`Agreement struct ${agreementStruct}`);
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
    setFetchingAgreement(false);
    updateAgreementAfterFetch({ id: id });
    saveAgreement({ id: id });
  };

  /**
   * update Agreement Details after a fetch
   */
  const updateAgreementAfterFetch = ({ id }: { id: string }) => {
    if (agreementStruct) {
      const agreement = agreementStruct as Contract.AgreementStruct;
      const details: Contract.AgreementDetails = {
        id: id,
        deposit: agreement[0].toString(),
        collateral: agreement[1].toString(),
        repaidAmt: agreement[2].toString(),
        futureValue: agreement[3].toString(),
        start: agreement[4].toString(),
        duration: agreement[5].toString(),
        rate: agreement[6].toString(),
        status: agreement[7].toString(),
        lender: agreement[8],
        borrower: agreement[9],
        minReqCollateral: (minReqCollateral as BigNumber).toString(),
        isLiquidationRequired: (isLiquidationRequired as BigNumber).toString(),
      };
      setAgreementData(details);
      setUpdatedAgreement(true);
    }
  };

  /**
   * gets number of agreements
   */

  const getNumAgreements = async () => {
    await fetchNumAgreements({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "s_numIDs",
      },
      onSuccess: () => {},
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  return {
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
    updatedAgreement,
    fetchingAgreementData,
    numAgreements,
    isFetchingNumAgreements,
    fetchingNumAgreementsError,
  };
};

export namespace Contract {
  /**
   * @param receiver Wallet address
   * @param amount Token amount. Eg. 2 for two tokens
   */
  export type MintProps = {
    receiver: string;
    amount: string;
  };

  /**
   * @params spender Wallet address
   * @params amount Token bits
   */
  export type ApproveProps = {
    spender: string;
    amount: string;
  };

  /**
   * @params amount Token amount
   * @params duration Number in years
   * @params rate Number with 1 decimal place allowed. Eg. 5.5
   */
  export type ProposeProps = {
    amount: string;
    duration: string;
    rate: string;
  };

  /**
   * @id Agreement ID
   * @amount ETH amount.
   */
  export type ActivateProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   * @param amount ETH amount.
   */
  export type AddCollateralProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   * @param amount ETH amount
   */
  export type WithdrawCollateralProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   * @param amount USDC amount
   */
  export type RepayProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   */
  export type CloseProps = {
    id: string;
  };

  /**
   * @param id Agreement ID
   */
  export type GetAgreementDataProps = {
    id: string;
  };

  /**
   *
   */
  export type AgreementStruct = [
    deposit: BigNumber,
    collateral: BigNumber,
    repaidAmt: BigNumber,
    futureValue: BigNumber,
    start: BigNumber,
    duration: BigNumber,
    rate: BigNumber,
    status: BigNumber,
    lender: string,
    borrower: string
  ];

  export type AgreementDetails = {
    id?: string;
    deposit: string;
    collateral: string;
    repaidAmt: string;
    futureValue: string;
    start: string;
    duration: string;
    rate: string;
    status: string;
    lender: string;
    borrower: string;
    minReqCollateral: string;
    isLiquidationRequired: String;
  };
}
