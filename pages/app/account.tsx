import React from "react";
import { Table } from "web3uikit";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import ProposeButton from "../../components/Contract/ProposeButton";

import useFetchUserAgreements from "../../hooks/App/db/useFetchUserAgreements";
import { Contract } from "../../hooks/Contract/useContract";

interface Props {}

const Account = (props: Props) => {
  const fetchUserAgreements = useFetchUserAgreements();
  const { isInitialized } = useMoralis();
  const [agreements, setAgreements] = React.useState<
    Array<Contract.AgreementDetails>
  >([]);

  React.useEffect(() => {
    if (isInitialized) {
      const userAddress = Moralis.User.current()?.get("ethAddress");
      fetchUserAgreements(userAddress).then((response: Array<any>) => {
        setAgreements(response.map(({ attributes }) => attributes));
      });
    }
  }, [isInitialized]);

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
        data={agreements.map(
          ({ createdAt, status, deposit, rate, duration }) => {
            return [
              <span>{createdAt?.toLocaleDateString()}</span>,
              <span>{status}</span>,
              <span>{Number(deposit) / 10 ** 6}</span>,
              <span>{Number(rate) / 10}</span>,
              <span>{duration}</span>,
            ];
          }
        )}
        pageSize={10}
      />
    </div>
  );
};

export default Account;
