import { id } from "@ethersproject/hash";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { BigNumber, Contract, ContractReceipt, ethers } from "ethers";
import { Moralis } from "moralis";
import { string } from "prop-types";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  EXCHANGE_ABI,
  EXCHANGE_ADDRESS,
  EXCHANGE_CONFIG,
  USDC_CONFIG,
  USDC_DECIMALS,
} from "../../constants";
import { useAlert } from "../App/useAlert";
import { useDatabase } from "../../hooks/App/useDatabase";

export const useContract = () => {
  const { newAlert } = useAlert();
  const { enableWeb3, isWeb3Enabled, account, web3 } = useMoralis();
  const { updateAgreement } = useDatabase();

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
    data: proposeTx,
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
  const [updatedAgreement, setUpdatedAgreement] =
    useState<Contract.AgreementDetails>();

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
        throw e;
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
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
        throw e;
      },
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

    let id = "";
    const transaction = (await fetchPropose({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "propose",
        params: { amount: usdcAmount, duration: duration, rate: rate },
      },
      onSuccess: async (content) => {},
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
        throw e;
      },
    })) as TransactionResponse;
    // Add info to db if successful and get agreement id
    const receipt = await transaction.wait(1);
    if (receipt) {
      /* @ts-ignore */
      id = receipt.events[2].args.id.toString();
      newAlert({
        type: "success",
        message: `Successfully proposed agreement (ID ${id})  `,
      });
      console.log(`Proposed new agreement with id - ${id}`);
      const agreement = await updateAgreementData({ id: id });
      await updateAgreement(agreement);
      return id;
    }
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
      onSuccess: async (tx) => {
        newAlert({
          type: "success",
          message: `Successfully activated Agreement (ID ${id})`,
        });
        const transaction = tx as TransactionResponse;
        const receipt = await transaction.wait(1);
        if (receipt) {
          const agreement = await updateAgreementData({ id: id });
          await updateAgreement(agreement);
        }
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
      onSuccess: async (tx) => {
        newAlert({
          type: "success",
          message: `Successfully added collateral to Agreement (ID ${id})`,
        });
        const transaction = tx as TransactionResponse;
        const receipt = await transaction.wait(1);
        if (receipt) {
          const agreement = await updateAgreementData({ id: id });
          await updateAgreement(agreement);
        }
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
      onSuccess: async (tx) => {
        newAlert({
          type: "success",
          message: `Successfully withdrawed collateral from Agreement (ID ${id})`,
        });
        const transaction = tx as TransactionResponse;
        const receipt = await transaction.wait(1);
        if (receipt) {
          const agreement = await updateAgreementData({ id: id });
          await updateAgreement(agreement);
        }
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
        params: { id: id, amount: usdcAmount },
      },
      onSuccess: async (tx) => {
        newAlert({
          type: "success",
          message: `Successfully repaid Agreement (ID ${id})`,
        });
        const transaction = tx as TransactionResponse;
        const receipt = await transaction.wait(1);
        if (receipt) {
          const agreement = await updateAgreementData({ id: id });
          await updateAgreement(agreement);
        }
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
      onSuccess: async (tx) => {
        newAlert({
          type: "success",
          message: `Successfully closed Agreement (ID ${id})`,
        });
        const transaction = tx as TransactionResponse;
        const receipt = await transaction.wait(1);
        if (receipt) {
          const agreement = await updateAgreementData({ id: id });
          await updateAgreement(agreement);
        }
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    });
  };

  /**
   * gets Agreement Data and updates database
   */
  const updateAgreementData = async ({
    id,
  }: Contract.GetAgreementDataProps) => {
    //   Initialize a new object to save  to our database
    let agreementObj = new Object() as Contract.AgreementDetails;
    agreementObj.uid = id; // moralis won't save new object in db if it has an id property

    setFetchingAgreement(true);

    if (!isWeb3Enabled) {
      await enableWeb3();
    }

    agreementObj.minReqCollateral = (
      (await fetchMinReqCollateral({
        params: {
          ...EXCHANGE_CONFIG,
          functionName: "getMinReqCollateral",
          params: { id: id },
        },
        onSuccess: async (content) => {
          console.log(`Min req collateral ${await content}`);
        },
        onError: (e) => {
          newAlert({ type: "error", message: e.message });
        },
      })) as BigNumber
    ).toString();

    agreementObj.isLiquidationRequired = (
      (await fetchIsLiquidationRequired({
        params: {
          ...EXCHANGE_CONFIG,
          functionName: "isLiquidationRequired",
          params: { id: id },
        },
        onSuccess: async (content) => {
          console.log(`Is Liquidation required ${content}`);
        },
        onError: (e) => {
          newAlert({ type: "error", message: e.message });
        },
      })) as Boolean
    ).toString();

    const [
      deposit,
      collateral,
      repaidAmt,
      futureValue,
      start,
      duration,
      rate,
      status,
      lender,
      borrower,
    ] = (await fetchAgreementStruct({
      params: {
        ...EXCHANGE_CONFIG,
        functionName: "s_idToAgreement",
        params: { "": id },
      },
      onSuccess: async (content) => {
        console.log(`Agreement struct ${await content}`);
      },
      onError: (e) => {
        newAlert({ type: "error", message: e.message });
      },
    })) as Contract.AgreementStruct;
    agreementObj.deposit = deposit.toString();
    agreementObj.collateral = collateral.toString();
    agreementObj.repaidAmt = repaidAmt.toString();
    agreementObj.futureValue = futureValue.toString();
    agreementObj.start = start.toString();
    agreementObj.duration = duration.toString();
    agreementObj.rate = rate.toString();
    agreementObj.status = status.toString();
    agreementObj.lender = lender.toString().toLowerCase();
    agreementObj.borrower = borrower.toString().toLowerCase();
    // wait until obj has been set before returning
    setFetchingAgreement(false);
    console.log(agreementObj);
    setUpdatedAgreement(agreementObj);
    return agreementObj;
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

  /**
   * tests
   */
  const testContract = async () => {
    const usdcAmount = "100";
    const duration = "1";
    const rate = "5.5";
    if (account) {
      await mint({ receiver: account, amount: usdcAmount });
      const id = await propose({
        amount: usdcAmount,
        duration: duration,
        rate: rate,
      });
      if (id) {
        let { minReqCollateral, futureValue } = await updateAgreementData({
          id: id,
        });
        const collateral = Moralis.Units.FromWei(
          BigNumber.from(minReqCollateral).add("100").toString()
        );
        futureValue = Moralis.Units.FromWei(futureValue, 6);
        const withdrawAmt = Moralis.Units.FromWei("99");
        await activate({ id: id, amount: collateral });
        await withdrawCollateral({ id: id, amount: withdrawAmt });
        await mint({ receiver: account, amount: futureValue });
        await repay({ id: id, amount: futureValue });

        await close({ id: id });
      }
    }
  };

  return {
    mint,
    propose,
    activate,
    addCollateral,
    withdrawCollateral,
    repay,
    close,
    updateAgreementData,
    testContract,
    isMinting,
    mintTx,
    mintingError,
    isApproving,
    approveTx,
    approveError,
    isProposing,
    proposeTx,
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
    createdAt?: Date;
    uid: string;
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
