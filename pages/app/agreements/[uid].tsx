import { useRouter } from "next/router";
import { Table } from "web3uikit";
import useFetchSpecificAgreements from "../../../hooks/App/db/useFetchSpecificAgreement";
import Moralis from "moralis";
import { Contract } from "../../../hooks/Contract/useContract";
import { useEffect, useState } from "react";
import { useTokenValue } from "../../../hooks";

import style from '../../../styles/components/agreement.module.scss';

const Details = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { results } = useFetchSpecificAgreements(uid);
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
  const { weiValue: collateralValue } = useTokenValue({
    weiAmount: collateral,
  });
  const { usdcValue: depositValue } = useTokenValue({
    usdcAmount: deposit,
  });

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

  return (
    <div className={style.container}>
      <p>Coso</p>

      <p>Borrower: {borrower}</p>
      <p>Lender: {lender}</p>
      <p>Deposit: ${depositValue}</p>
      <p>Collateral: ${collateralValue}</p>
      <p>repaidAmt: {repaidAmt}</p>

      <p>futureValue: {futureValue}</p>
      <p>start: {start}</p>
      <p>duration: {duration}</p>
      <p>rate: {rate}</p>
      <p>status: {status}</p>
      <p>minReqCollateral: {minReqCollateral}</p>
      <p>isLiquidationRequired: {isLiquidationRequired}</p>
      
    </div>
  );
};

export default Details;
