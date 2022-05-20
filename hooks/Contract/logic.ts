import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Contract } from "ethers";
import { Moralis } from "moralis";
import { useEffect, useState } from "react";
import {
  useMoralis,
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";
import {
  EXCHANGE_ADDRESS,
  EXCHANGE_CONFIG,
  USDC_ADDRESS,
  USDC_CONFIG,
  USDC_DECIMALS,
} from "../../constants";
import { useAlert } from "../App/useAlert";

export const useContract = () => {
  const { newAlert } = useAlert();
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const { fetch: fetchMint } = useWeb3ExecuteFunction();
  const { fetch: fetchApprove } = useWeb3ExecuteFunction();
  const { data: agreementID, fetch: fetchPropose } = useWeb3ExecuteFunction();
  const { fetch: fetchActivate } = useWeb3ExecuteFunction();
  const { fetch: fetchAddCollateral } = useWeb3ExecuteFunction();
  const { fetch: fetchWithdrawCollateral } = useWeb3ExecuteFunction();
  const { fetch: fetchRepay } = useWeb3ExecuteFunction();
  const { fetch: fetchClose } = useWeb3ExecuteFunction();
  const { data: minReqCollateral, fetch: fetchMinReqCollateral } =
    useWeb3ExecuteFunction();
  const { data: isLiquidationRequired, fetch: fetchIsLiquidationRequired } =
    useWeb3ExecuteFunction();
  const { data: agreementStruct, fetch: fetchAgreementStruct } =
    useWeb3ExecuteFunction();
  const [isMinting, setMinting] = useState(false);
  const [mintingSuccess, setMintingSuccess] = useState(false);
  const [mintingError, setMintingError] = useState(false);
  const [isProposing, setProposing] = useState(false);
  const [proposeSuccess, setProposeSuccess] = useState(false);
  const [proposeError, setProposeError] = useState(false);
  const [isActivating, setActivating] = useState(false);
  const [activateSuccess, setActivateSuccess] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [isAddingCollateral, setAddingCollateral] = useState(false);
  const [addingCollateralSuccess, setAddingCollateralSuccess] = useState(false);
  const [addingCollateralError, setAddingCollateralError] = useState(false);
  const [isWithdrawingCollateral, setWithdrawingCollateral] = useState(false);
  const [withdrawingCollateralSuccess, setWithdrawingCollateralSuccess] =
    useState(false);
  const [withdrawingCollateralError, setWithdrawingCollateralError] =
    useState(false);
  const [isRepaying, setRepaying] = useState(false);
  const [repaySuccess, setRepaySuccess] = useState(false);
  const [repayError, setRepayError] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [closeSuccess, setCloseSuccess] = useState(false);
  const [closeError, setCloseError] = useState(false);
  const [agreementData, setAgreementData] = useState();

  /**
   * mint Tokens
   */
  const mint = async ({ receiver, amount }: Contract.MintProps) => {
    setMinting(true);
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    await fetchMint({
      params: {
        ...USDC_CONFIG,
        functionName: "mint",
        params: { account: receiver, amount: usdcAmount },
      },
      onSuccess: () => {
        setMintingSuccess(true), setMinting(false);
        newAlert({ type: "success", message: `Successfully minted tokens!` });
      },
      onError: (e) => {
        setMintingError(true);
        setMinting(false);
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
      onSuccess: () =>
        newAlert({ type: "success", message: "Approved token transfer" }),
      onError: (e) => newAlert({ type: "error", message: e.message }),
    });
    return tx as TransactionResponse;
  };

  /**
   * propose Agreememt
   */
  const propose = async ({ amount, duration, rate }: Contract.ProposeProps) => {
    setProposing(true);
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    rate = ((10 * Number(rate)) % 100).toFixed(0);
    await approve({ spender: EXCHANGE_ADDRESS, amount: usdcAmount });
    console.log(rate, rate, EXCHANGE_CONFIG);
    await fetchPropose({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "propose",
        params: { amount: usdcAmount, duration: duration, rate: rate },
      },
      onSuccess: () => {
        setProposeSuccess(true), setProposing(false);
        newAlert({
          type: "success",
          message: `Successfully proposed agreement. ID ${agreementID}`,
        });
      },
      onError: (e) => {
        setProposeError(true);
        setProposing(false);
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * activate Agreement
   */
  const activate = async ({ id, amount }: Contract.ActivateProps) => {
    setActivating(true);
    await fetchActivate({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "activate",
        params: { id: id, amount: amount },
        msgValue: amount,
      },
      onSuccess: () => {
        setActivateSuccess(true), setActivating(false);
        newAlert({
          type: "success",
          message: `Successfully activated Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        setActivateError(true);
        setActivating(false);
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * add collateral to Agreement
   */
  const addCollateral = async ({ id, amount }: Contract.AddCollateralProps) => {
    setAddingCollateral(true);
    await fetchAddCollateral({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "addCollateral",
        params: { id: id, amount: amount },
        msgValue: amount,
      },
      onSuccess: () => {
        setAddingCollateralSuccess(true), setAddingCollateral(false);
        newAlert({
          type: "success",
          message: `Successfully added collateral to Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        setAddingCollateralError(true);
        setAddingCollateral(false);
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
    setWithdrawingCollateral(true);
    await fetchWithdrawCollateral({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "withdrawCollateral",
        params: { id: id, amount: amount },
      },
      onSuccess: () => {
        setWithdrawingCollateralSuccess(true), setWithdrawingCollateral(false);
        newAlert({
          type: "success",
          message: `Successfully withdrawed collateral from Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        setWithdrawingCollateralError(true);
        setWithdrawingCollateral(false);
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * repay Agreement
   */
  const repay = async ({ id, amount }: Contract.RepayProps) => {
    setRepaying(true);
    const usdcAmount = Moralis.Units.Token(amount, USDC_DECIMALS);
    await approve({ spender: EXCHANGE_ADDRESS, amount: usdcAmount });
    await fetchRepay({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "repay",
        params: { id: id, amount: amount },
      },
      onSuccess: () => {
        setRepaySuccess(true), setRepaying(false);
        newAlert({
          type: "success",
          message: `Successfully repaid Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        setRepayError(true);
        setRepaying(false);
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * close Agreement
   */
  const close = async ({ id }: Contract.CloseProps) => {
    setClosing(true);
    await fetchClose({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "close",
        params: { id: id },
      },
      onSuccess: () => {
        setCloseSuccess(true), setClosing(false);
        newAlert({
          type: "success",
          message: `Successfully closed Agreement ID ${id}`,
        });
      },
      onError: (e) => {
        setCloseError(true);
        setClosing(false);
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * get Agreement Data
   */
  const fetchAgrementData = async ({ id }: Contract.GetAgreementDataProps) => {
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
  };
  useEffect(() => {
    const data = [minReqCollateral, isLiquidationRequired, agreementStruct];
    setAgreementData(data as unknown as undefined);
  }, [minReqCollateral, isLiquidationRequired, agreementStruct]);

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
  };
};

namespace Contract {
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
   * @amount WEI amount.
   */
  export type ActivateProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   * @param amount WEI amount.
   */
  export type AddCollateralProps = {
    id: string;
    amount: string;
  };

  /**
   * @param id Agreement ID
   * @param amount WEI amount
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
}
