import React, { useEffect, useState } from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Contract } from "../../Contract/useContract";
import { useDatabase } from "../useDatabase";

export default function useFetchUserAgreements() {
  const { account, isInitialized, isAuthenticated } = useMoralis();
  const [results, setResults] = useState<
    Moralis.Object<Contract.AgreementDetails>[]
  >([]);
  const { isUpdatingDb } = useDatabase();
  /**
   * fetch lender agreements
   */
  const {
    data: lenderAgreements,
    error,
    isLoading,
  } = useMoralisQuery<Contract.AgreementDetails>(
    "Agreement",
    (query) => query.equalTo("lender", account || "").descending("createdAt"),
    [account, isInitialized, isAuthenticated, isUpdatingDb],
    { live: true }
  );
  /**
   * fetch borrower agreements
   */
  const { data: borrowerAgreements } =
    useMoralisQuery<Contract.AgreementDetails>(
      "Agreement",
      (query) =>
        query.equalTo("borrower", account || "").descending("createdAt"),
      [account],
      { live: true }
    );

  /**
   * combine the two agreements
   */
  useEffect(() => {
    setResults([...new Set([...lenderAgreements, ...borrowerAgreements])]); // THIS needs to be unique array based on the account address. Right now it's a unique array based on unique agreements. Idk, but this is the file where you can debug.
  }, [lenderAgreements, borrowerAgreements]);

  //   const { newAlert } = useAlert();

  //   return React.useCallback(
  //     async (address: string) => {
  //       const Agreement = Moralis.Object.extend("Agreement");
  //       const query = new Moralis.Query(Agreement);
  //       query.equalTo("lender", address);
  //       const results = await query.find();

  //       return results;
  //     },
  //     [newAlert]
  //   );
  return { results, error, isLoading };
}
