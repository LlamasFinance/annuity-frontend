import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Moralis from "moralis";
import { Contract } from "../../hooks/Contract/useContract";
import ProposeButton from "../../components/Contract/ProposeButton";
import MintButton from "../../components/Contract/MintButton";
import { Icon, Table } from "web3uikit";
import { APP_ID, SERVER_URL, STATUS } from "../../constants";
import useFetchAllAgreements from "../../hooks/App/db/useFetchAllAgreements";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useTokenValue } from "../../hooks";

interface Props {
  //   agreements: Moralis.Object<Contract.AgreementDetails>[];
}

const Market = (props: Props) => {
  //   const [sortKey, setKey] = useState<any>("createdAt");
  const [sortOrder, setOrder] = useState<any>("desc");
  const { refetch, results: agreements } = useFetchAllAgreements();
  const { getValue } = useTokenValue();

  const sort = React.useCallback(
    (key: string) => {
      if (sortOrder === "asc") {
        refetch({ sortKey: key as any, sortOrder: sortOrder });
        setOrder("dsc");
      }
      if (sortOrder === "desc") {
        refetch({ sortKey: key as any, sortOrder: sortOrder });
        setOrder("asc");
      }
    },
    [sortOrder]
  );

  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">Market</h1>
        <div className="flex gap-x-4">
          <MintButton />
          <ProposeButton />
        </div>
      </div>

      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span onClick={() => sort("status")}>Status </span>,
          <span onClick={() => sort("amount")}>
            USD Deposit <br /> ($)
          </span>,
          <span onClick={() => sort("rate")}>APY (%)</span>,
          <span onClick={() => sort("duration")}>Duration (years)</span>,
          <span onClick={() => sort("createdAt")}>Date</span>,
          <span onClick={() => sort("uid")}>ID</span>,
          <span onClick={() => sort("details")}>Details</span>,
        ]}
        data={agreements.map(({ createdAt, attributes }) => {
          const { status, deposit, rate, duration, uid } = attributes;
          const { inUsd: depositUsd } = getValue({
            amount: deposit,
            inputType: "usdc",
          });

          return [
            <span>{STATUS[Number(status)]}</span>,
            <span>{depositUsd}</span>,
            <span>{Number(rate) / 10}</span>,
            <span>{duration}</span>,
            <span>{createdAt?.toLocaleDateString()}</span>,
            <span>{uid}</span>,
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

export default Market;
