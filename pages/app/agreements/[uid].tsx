import { useRouter } from "next/router";
import { Table } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useEffect, useState } from "react";
import { useTokenValue } from "../../../hooks";

import AddCollateralButton from "../../../components/Contract/AddColateralButton";
import RepayLoanButton from "../../../components/Contract/RepayLoanButton";

import style from '../../../styles/components/agreement.module.scss';

import { FaFileContract } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBarChartFill, BsFillClockFill } from 'react-icons/bs';
import { IoIosPaper, IoLogoUsd } from 'react-icons/io';
import { SiEthereum } from 'react-icons/si';

const Details = () => {
  const router = useRouter();
  const { uid } = router.query as any;
  const { agreement, borrower, lender, collateral, deposit, repaidAmt, futureValue, start, duration, rate, status, minReqCollateral, isLiquidationRequired, error, isLoading } =
    useFetchSpecificAgreements(uid);

  const { inUsd: collateralInUsd } = useTokenValue({
    amount: collateral,
    inputType: "wei",
  });

  const { inUsd: minReqCollInUsd } = useTokenValue({
    amount: minReqCollateral,
    inputType: "wei",
  });

  const { inUsd: depositInUsd } = useTokenValue({
    amount: deposit,
    inputType: "usdc",
  });

  const { inUsd: futureValueInUsd } = useTokenValue({
    amount: futureValue,
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
          <div className={style.usdc}>
            <div className={style.usdcIcon}><IoLogoUsd /></div>
            <div>
              <p>USDC Deposited:</p>
              <span>${depositInUsd}</span>  
            </div>
          </div>
          <hr /> 
          <div className={style.usdc}>
            <div className={style.usdcIcon}><IoLogoUsd /></div>
            <div>
              <p>USDC Future Value:</p>
              <span>${futureValueInUsd}</span>
            </div>
          </div>
          <hr />

          <button>Withdraw</button>
        </div>
      </div>

      <div className={style.provider}>
        <h2>Provider</h2>
        <div className={style.annuitantMoney}>
          <div className={style.usdc}>
            <div className={style.usdcIcon}><SiEthereum /></div>
            <div>
              <p>ETH Collateral:</p>
              <span>{collateralInUsd} ETH</span>  
            </div>
          </div>
          <hr /> 
          <div className={style.usdc}>
            <div className={style.usdcIcon}><SiEthereum /></div>
            <div>
              <p>ETH Value:</p>
              <span>{collateralInUsd} ETH</span>  
            </div>
          </div>
          <hr /> 
          <div className={style.usdc}>
            <div className={style.usdcIcon}><IoLogoUsd /></div>
            <div>
              <p>Liquidation minimum:</p>
              <span>${minReqCollInUsd}</span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}><IoLogoUsd /></div>
            <div>
              <p>USDC Repaid:</p>
              <span>${repaidAmt}</span>
            </div>
          </div>
          <hr />
        </div> 
      </div>
      <div className={style.forms}>
        <AddCollateralButton />
        <RepayLoanButton />
      </div>
   
      <p>start: {start} </p>
      <div>
          <p>USDC Repaid: {isLiquidationRequired} </p>
        </div>
    </div>
  );
};

export default Details;
