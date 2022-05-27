import React, { useEffect } from "react";
import { Table } from "web3uikit";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import ProposeButton from "../../components/Contract/ProposeButton";
import MintButton from "../../components/Contract/MintButton";

import useFetchUserAgreements from "../../hooks/App/db/useFetchUserAgreements";
import { Contract } from "../../hooks/Contract/useContract";
import { STATUS } from "../../constants";
import { useTokenValue } from "../../hooks";
import Link from "next/link";
import UserInfo from "../../components/User/UserInfo";
import SetUserInfoButton from "../../components/User/SetUserInfo/SetUserInfoButton";

interface Props {}

const Account = (props: Props) => {
  const { results: agreements } = useFetchUserAgreements();
  const { account, user } = useMoralis();
  const { getValue } = useTokenValue({});

  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">My Agreements</h1>
        <div className="flex gap-x-4">
          <MintButton />
          <ProposeButton />
          {user?.get("hasUsername") && <SetUserInfoButton />}
        </div>
      </div>
      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span>Position</span>,
          <span>ID</span>,
          <span>Status</span>,
          <span>USD Deposit ($)</span>,
          <span>ETH Collateral</span>,
          <span>Details</span>,
        ]}
        data={agreements.map(({ createdAt, attributes }) => {
          const { lender, uid, status, deposit, collateral } = attributes;
          let { inEth } = getValue({
            amount: collateral,
            inputType: "wei",
          });
          inEth = Number(inEth) == 0 ? "--" : inEth;
          return [
            <span>{account == lender ? "Annuitant" : "Insurer"}</span>,
            <span>{uid}</span>,
            <span>{STATUS[Number(status)]}</span>,
            <span>
              {getValue({ amount: deposit, inputType: "usdc" }).inUsd}
            </span>,
            <span>{inEth}</span>,
            <span>
              <Link href={`/app/agreements/${uid}`}>
                <button className="btn-default btn">Details</button>
              </Link>
            </span>,
          ];
        })}
        pageSize={10}
      />
    </div>
  );
};

export default Account;
