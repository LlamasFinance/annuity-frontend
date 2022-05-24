import React from "react";
import { Table } from "web3uikit";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import ProposeButton from "../../components/Contract/ProposeButton";

import useFetchUserAgreements from "../../hooks/App/db/useFetchUserAgreements";
import { Contract } from "../../hooks/Contract/useContract";

interface Props {}

const Account = (props: Props) => {
  const { results: agreements } = useFetchUserAgreements();

  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">Overview</h1>
        <ProposeButton />
      </div>
      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span>Date</span>,
          <span>Status</span>,
          <span>Deposit</span>,
          <span>Rate</span>,
          <span>Duration</span>,
        ]}
        data={agreements.map(({ createdAt, attributes }) => {
          const { status, deposit, rate, duration } = attributes;
          return [
            <span>{createdAt?.toLocaleDateString()}</span>,
            <span>{status}</span>,
            <span>{Number(deposit) / 10 ** 6}</span>,
            <span>{Number(rate) / 10}</span>,
            <span>{duration}</span>,
          ];
        })}
        pageSize={10}
      />
    </div>
  );
};

export default Account;
