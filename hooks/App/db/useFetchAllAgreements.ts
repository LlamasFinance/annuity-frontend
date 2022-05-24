import React from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralisQuery } from "react-moralis";
import { Contract } from "../../";

export default function useFetchAllAgreements() {
  const {
    data: results,
    error,
    isLoading,
  } = useMoralisQuery<Contract.AgreementDetails>(
    "Agreement",
    (query) => query.descending("createdAt"),
    undefined,
    { live: true }
  );

  return { results, error, isLoading };
}
