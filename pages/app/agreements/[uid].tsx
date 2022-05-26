import { useRouter } from "next/router";
import { Table } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useCallback, useEffect, useState } from "react";
import { useTokenValue } from "../../../hooks";

import AddCollateralButton from "../../../components/Contract/AddCollateralButton";
import WithdrawCollateralButton from "../../../components/Contract/WithdrawCollateralButton";
import RepayLoanButton from "../../../components/Contract/RepayLoanButton";
import { CloseButton } from "../../../components/Contract/CloseButton";
import ActivateButton from "../../../components/Contract/ActivateButton";

import style from "../../../styles/components/agreement.module.scss";

import { FaFileContract } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import {
  BsBarChartFill,
  BsFillClockFill,
  BsFillCalendarCheckFill,
} from "react-icons/bs";
import { IoIosPaper, IoLogoUsd } from "react-icons/io";
import { SiEthereum } from "react-icons/si";
import { STATUS } from "../../../constants";

const Details = () => {
  const router = useRouter();
  const { uid } = router.query as any;
  const id = uid as string;
  const {
    agreement,
    borrower,
    lender,
    collateral,
    deposit,
    repaidAmt,
    futureValue,
    start,
    duration,
    rate,
    status,
    minReqCollateral,
    isLiquidationRequired,
    error,
    isLoading,
  } = useFetchSpecificAgreements(uid);
  const proposed = status == "0";
  const cancelled = status == "3" && start == "0";
  const repaid = status == "2";

  //   const { inUsd: collateralInUsd } = useTokenValue({
  //     amount: collateral,
  //     inputType: "wei",
  //   });

  //   const { inUsd: minReqCollInUsd } = useTokenValue({
  //     amount: minReqCollateral,
  //     inputType: "wei",
  //   });

  //   const { inUsd: depositInUsd } = useTokenValue({
  //     amount: deposit,
  //     inputType: "usdc",
  //   });

  //   const { inUsd: futureValueInUsd } = useTokenValue({
  //     amount: futureValue,
  //     inputType: "usdc",
  //   });

  return (
    <div className={style.container}>
      <div className={style.info}>
        <h2>Info</h2>
        <div className={style.infoCard}>
          <div className={style.icon}>
            <FaFileContract />
          </div>
          <div className={style.infoText}>
            <h2>Agreement ID</h2>
            <p>{id}</p>
          </div>
        </div>
        <div className={style.infoCard}>
          <div className={style.icon}>
            <AiOutlineUser />
          </div>
          <div className={style.infoText}>
            <h2>Borrower</h2>
            <p>
              {borrower && borrower.substring(0, 5)}...
              {borrower && borrower.substring(borrower.length - 5)}
            </p>
          </div>
        </div>
        <div className={style.infoCard}>
          <div className={style.icon}>
            <AiOutlineUser />
          </div>
          <div className={style.infoText}>
            <h2>Lender</h2>
            <p>
              {lender && lender.substring(0, 5)}...
              {lender && lender.substring(lender.length - 5)}
            </p>
          </div>
        </div>
      </div>

      <div className={style.annuitant}>
        <h2>Annuitant</h2>
        <div>
          <div className={style.annuitantCard}>
            <div className={style.annuitantIcon}>
              <IoIosPaper />
            </div>
            <div className={style.annuitantInfo}>
              <p>Status</p>
              <h2>{cancelled ? "Cancelled" : STATUS[Number(status)]}</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.duration}`}>
              <BsFillClockFill />
            </div>
            <div className={style.annuitantInfo}>
              <p>Duration</p>
              <h2>{duration} Years</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.rate}`}>
              <BsBarChartFill />
            </div>
            <div className={style.annuitantInfo}>
              <p>Rate</p>
              <h2>{rate}%</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.date}`}>
              <BsFillCalendarCheckFill />
            </div>
            <div className={style.annuitantInfo}>
              <p>Start Date</p>
              <h2>
                {!proposed
                  ? new Date(parseInt(start) * 1000).toLocaleDateString(
                      "en-us",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "Not activated"}
              </h2>
            </div>
          </div>
        </div>

        <div className={style.annuitantMoney}>
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div>
              <p>USDC Deposited:</p>
              <span>${cancelled ? "---" : deposit}</span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div>
              <p>USDC Future Value:</p>
              <span>${cancelled ? "---" : futureValue}</span>
            </div>
          </div>
          <hr />
          <CloseButton id={id} />
        </div>
      </div>

      <div className={style.provider}>
        <h2>Provider</h2>
        <div className={style.annuitantMoney}>
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <SiEthereum />
            </div>
            <div>
              <p>ETH Collateral:</p>
              <span>{proposed || cancelled ? "---" : collateral} ETH</span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div>
              <p>ETH Value:</p>
              <span>${proposed || cancelled ? "---" : collateral} </span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div>
              <p>Liquidation minimum:</p>
              <span>${cancelled || repaid ? "---" : minReqCollateral}</span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div>
              <p>USDC Repaid:</p>
              <span>${proposed || cancelled ? "---" : repaidAmt}</span>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className={style.forms}>
        <AddCollateralButton id={id} />
        <WithdrawCollateralButton id={id} />
        <RepayLoanButton id={id} />
        <ActivateButton id={id} />
      </div>
    </div>
  );
};

export default Details;
