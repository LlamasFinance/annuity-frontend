import React, { useEffect, useState } from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralisQuery } from "react-moralis";
import { Contract } from "../../Contract";

export default function useFetchSpecificAgreements(id: string) {
  const [agreement, setAgreement] =
    useState<Moralis.Object<Contract.AgreementDetails>>();
  const defaultObj = new Object() as Contract.AgreementDetails;
  const [
    {
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
    },
    setAttributes,
  ] = useState<Contract.AgreementDetails>(defaultObj);
  const {
    data: results,
    error,
    isLoading,
  } = useMoralisQuery<Contract.AgreementDetails>(
    "Agreement",
    (query) => query.equalTo("uid", id).limit(1).descending("createdAt"),
    [id],
    {
      live: true,
    }
  );
  useEffect(() => {
    if (results) {
      const agreement = results[0] as Moralis.Object<Contract.AgreementDetails>;
      setAgreement(agreement);
      console.log(agreement);
      if (agreement?.attributes) {
        setAttributes({ ...agreement.attributes });
      }
    }
  }, [results]);
  return {
    agreement,
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
    error,
    isLoading,
  };
}
