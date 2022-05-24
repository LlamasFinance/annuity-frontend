import { GetServerSideProps } from "next";
import React from "react";
import Moralis from "moralis";
import { Contract } from "../../hooks/Contract/useContract";
import ProposeButton from "../../components/Contract/ProposeButton";
import { Table } from "web3uikit";
import { APP_ID, SERVER_URL, STATUS } from "../../constants";
import useFetchAllAgreements from "../../hooks/App/db/useFetchAllAgreements";
import Link from "next/link";

interface Props {
  //   agreements: Moralis.Object<Contract.AgreementDetails>[];
}

const Market = (props: Props) => {
  const { results: agreements } = useFetchAllAgreements();
  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">Market</h1>
        <ProposeButton />
      </div>
      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span>Status</span>,
          <span>Amount ($USDC)</span>,
          <span>APY (%)</span>,
          <span>Duration (years)</span>,
          <span>Date</span>,
          <span>ID</span>,
          <span>Details</span>,
        ]}
        data={agreements.map(({ createdAt, attributes }) => {
          const { status, deposit, rate, duration, uid } = attributes;
          return [
            <span>{STATUS[status]}</span>,
            <span>{Number(deposit) / 10 ** 6}</span>,
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
