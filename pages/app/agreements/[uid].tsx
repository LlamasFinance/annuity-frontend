import { useRouter } from "next/router";
import { Table } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useEffect, useState } from "react";
import { useTokenValue } from "../../../hooks";

import style from '../../../styles/components/agreement.module.scss';

import { FaFileContract } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBarChartFill, BsFillClockFill } from 'react-icons/bs';
import { IoIosPaper } from 'react-icons/io';

const Details = () => {
  const router = useRouter();
  const { uid } = router.query as any;
  const { agreement, borrower, lender, collateral, deposit, repaidAmt, futureValue, start, duration, rate, status, minReqCollateral, isLiquidationRequired, error, isLoading } =
    useFetchSpecificAgreements(uid);

  const { inUsd: collateralInUsd } = useTokenValue({
    amount: collateral,
    inputType: "wei",
  });

  const { inUsd: depositInUsd } = useTokenValue({
    amount: deposit,
    inputType: "usdc",
  });

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
            <p>{uid}</p>
          </div>
        </div>
        <div className={style.infoCard}>
          <div className={style.icon}>
            <AiOutlineUser />
          </div>
          <div className={style.infoText}>
            <h2>Borrower</h2>
            <p>{borrower && borrower.substring(0,5)}...{borrower && borrower.substring(borrower.length - 5)}</p>
          </div>
        </div>
        <div className={style.infoCard}>
          <div className={style.icon}>
            <AiOutlineUser />
          </div>
          <div className={style.infoText}>
            <h2>Lender</h2>
            <p>{lender && lender.substring(0,5)}...{lender && lender.substring(lender.length - 5)}</p>
          </div>
        </div>
      </div>

      <div className={style.annuitant}>
        <h2>Annuitant</h2>
        <div>
          <div className={style.annuitantCard}>
            <div className={style.annuitantIcon}><IoIosPaper /></div>
            <div className={style.annuitantInfo}>
              <p>Status</p>
              <h2>{status}</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.duration}`}><BsFillClockFill /></div>
            <div className={style.annuitantInfo}>
              <p>Duration</p>
              <h2>{duration} Years</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.rate}`}><BsBarChartFill /></div>
            <div className={style.annuitantInfo}>
              <p>Rate</p>
              <h2>{rate}%</h2>
            </div>
          </div>

        </div>
        <div className={style.annuitantMoney}>
          <p>Deposit: ${collateralInUsd}</p>
          <p>futureValue: {futureValue}</p>
          <button>Withdraw</button>
        </div>
      </div>

      <div className={style.provider}>
        <h2>Provider</h2>
        <div>
          <p>Collateral: ${depositInUsd}</p>
          <p>minReqCollateral: {minReqCollateral} </p>
          <p>repaidAmt: {repaidAmt}</p>
          <p>isLiquidationRequired: {isLiquidationRequired} </p>
        </div>
      </div>
       
      <p>start: {start} </p>
      
    </div>
  );
};

export default Details;
