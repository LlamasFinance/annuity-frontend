import React from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralisQuery } from "react-moralis";

export default function useFetchAllAgreements() {
  const {
    data: results,
    error,
    isLoading,
  } = useMoralisQuery("Agreement", undefined, undefined, { live: true });

  return { results, error, isLoading };
}
