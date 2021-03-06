import { useRouter } from "next/router";
import { Icon, Table, Tooltip, getEllipsisTxt } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useCallback, useEffect, useState } from "react";
import { useTokenValue } from "../../../hooks";

import { Blockie } from "web3uikit";
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
  const { getValue } = useTokenValue();
  const { inUsd: depositUsd } = getValue({
    amount: deposit || "0",
    inputType: "usdc",
  });
  const { inUsd: futureValueUsd } = getValue({
    amount: futureValue || "0",
    inputType: "usdc",
  });
  const { inUsd: repaidUsd } = getValue({
    amount: repaidAmt || "0",
    inputType: "usdc",
  });
  const { inUsd: minReqCollateralUsd } = getValue({
    amount: minReqCollateral || "0",
    inputType: "wei",
  });
  const { inUsd: collateralUsd } = getValue({
    amount: collateral || "0",
    inputType: "wei",
  });
  const { inEth: collateralEth } = getValue({
    amount: collateral || "0",
    inputType: "wei",
  });

  const proposed = status == "0";
  const cancelled = status == "3" && start == "0";
  const repaid = status == "2";
  const hasLender = lender && lender.substring(0, 3) != "0x0";
  const hasBorrower = borrower && borrower.substring(0, 3) != "0x0";

  const LenderTooltip = (
    <Tooltip
      content={
        "Person who proposes annuity agreement and receives the guaranteed future value"
      }
      position="right"
    >
      <Icon fill="#68738D" size={30} svg="helpCircle" />
    </Tooltip>
  );

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
            {hasLender ? (
              <Blockie scale={7.2} seed={lender} />
            ) : (
              <AiOutlineUser />
            )}
          </div>
          <div className={style.infoText}>
            <div className={style.lender}>
              <h2>Lender (Annuitant)</h2>
              {LenderTooltip}
            </div>
            <p>{getEllipsisTxt(lender)}</p>
          </div>
        </div>
        <div className={style.infoCard}>
          <div className={style.icon}>
            {hasBorrower ? (
              <Blockie scale={7.2} seed={borrower} />
            ) : (
              <AiOutlineUser />
            )}
          </div>
          <div className={style.infoText}>
            <div className={style.borrower}>
              <h2>Borrower (Provider)</h2>
            </div>

            <p>{getEllipsisTxt(borrower)}</p>
          </div>
        </div>
      </div>

      <div className={style.annuitant}>
        <h2>Annuitant</h2>
        <div className={style.annuitantComp}>
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
              <h2>{Number(rate) / 10}%</h2>
            </div>
          </div>

          <div className={style.annuitantCard}>
            <div className={`${style.annuitantIcon} ${style.date}`}>
              <BsFillCalendarCheckFill />
            </div>
            <div className={style.annuitantInfo}>
              <p>Start Date</p>
              <h2>
                {proposed
                  ? "Not activated"
                  : new Date(parseInt(start) * 1000).toLocaleDateString(
                      "en-us",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
              </h2>
            </div>
          </div>
        </div>

        <div className={style.annuitantMoney}>
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div className={style.usdcValues}>
              <p>USDC Deposited:</p>
              <span>${cancelled ? "---" : depositUsd}</span>
            </div>

            <div className={style.activateBtn}>
              {proposed && (
                <>
                  <ActivateButton id={id} /> <span>{LenderTooltip}</span>
                </>
              )}
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div className={style.usdcValues}>
              <p>USDC Future Value:</p>
              <span>${cancelled ? "---" : futureValueUsd}</span>
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
            <div className={style.usdcValues}>
              <p>ETH Collateral:</p>
              <span>{proposed || cancelled ? "---" : collateralEth} ETH</span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div className={style.usdcValues}>
              <p>ETH Value:</p>
              <span>${proposed || cancelled ? "---" : collateralUsd} </span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div className={style.usdcValues}>
              <p>Liquidation minimum:</p>
              <span>
                ${proposed || cancelled || repaid ? "---" : minReqCollateralUsd}
              </span>
            </div>
          </div>
          <hr />
          <div className={style.usdc}>
            <div className={style.usdcIcon}>
              <IoLogoUsd />
            </div>
            <div className={style.usdcValues}>
              <p>USDC Repaid:</p>
              <span>${proposed || cancelled ? "---" : repaidUsd}</span>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className={style.forms}>
        <AddCollateralButton id={id} />
        <WithdrawCollateralButton id={id} />
        <RepayLoanButton id={id} />
      </div>
    </div>
  );
};

export default Details;
