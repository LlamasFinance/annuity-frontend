import React, { useState } from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Contract, useDatabase } from "../../";

interface Props {
  sortKey:
    | "createdAt"
    | "objectId"
    | "updatedAt"
    | "ACL"
    | "uid"
    | "deposit"
    | "collateral"
    | "repaidAmt"
    | "futureValue"
    | "start"
    | "duration"
    | "rate";
  sortOrder: "desc" | "asc";
}
export default function useFetchAllAgreements() {
  const [stateSortKey, setSortKey] = useState<Props["sortKey"]>("createdAt");
  const [stateSortOrder, setSortOrder] = useState<Props["sortOrder"]>("desc");
  const { isUpdatingDb } = useDatabase();
  const { account, isAuthenticated, isInitialized } = useMoralis();

  const {
    data: results,
    error,
    isLoading,
  } = useMoralisQuery<Contract.AgreementDetails>(
    "Agreement",
    (query) =>
      stateSortOrder == "desc"
        ? query.descending(stateSortKey)
        : query.ascending(stateSortKey),
    [
      isUpdatingDb,
      stateSortKey,
      stateSortOrder,
      isAuthenticated,
      isInitialized,
      account,
    ],
    { live: true }
  );

  const refetch = ({ sortKey, sortOrder }: Props) => {
    console.log(sortKey, sortOrder);
    setSortKey(sortKey);
    setSortOrder(sortOrder);
  };

  return { results, error, isLoading, refetch };
}
