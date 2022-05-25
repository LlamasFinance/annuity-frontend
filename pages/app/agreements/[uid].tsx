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
  const { uid } = router.query as any;
  const { agreement, borrower, lender, collateral, deposit } =
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
      <p>Coso</p>

      <p>Borrower: {borrower}</p>
      <p>Lender: {lender}</p>
      <p>Deposit: ${collateralInUsd}</p>
      <p>Collateral: ${depositInUsd}</p>
    </div>
  );
};

export default Details;
