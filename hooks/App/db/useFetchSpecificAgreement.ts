import React from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralisQuery } from "react-moralis";

export default function useFetchSpecificAgreements(id: string | string[]) {
  const {
    data: results,
    error,
    isLoading,
  } = useMoralisQuery(
    "Agreement",
    (query) => query.equalTo("uid", id).limit(1),
    [id],
    {
      live: true,
    }
  );

  return { results, error, isLoading };
}
