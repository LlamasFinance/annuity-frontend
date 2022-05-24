import { useRouter } from "next/router";
import { Table } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useEffect, useState } from "react";

const Details = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { results } = useFetchSpecificAgreements(uid);
  const [agreement, setAgreement] =
    useState<Moralis.Object<Contract.AgreementDetails>>();

  useEffect(() => {
    setAgreement(results[0] as Moralis.Object<Contract.AgreementDetails>);
  }, [results]);

  const {
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
    minReqCollateral,
    isLiquidationRequired,
  } = agreement?.attributes;

  return (
    <div>
      <p>Borrower: {borrower}</p>
      <p>Lender: {lender}</p>
      <p>Deposit: {deposit}</p>
      <p>Collateral: {collateral}</p>
    </div>
  );
};

export default Details;
