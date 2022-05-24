import React, { useEffect, useState } from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Contract } from "../../Contract/useContract";

export default function useFetchUserAgreements() {
  const { account, isInitialized } = useMoralis();
  const [results, setResults] = useState<
    Moralis.Object<Contract.AgreementDetails>[]
  >([]);
  /**
   * fetch lender agreements
   */
  const {
    data: lenderAgreements,
    error,
    isLoading,
  } = useMoralisQuery(
    "Agreement",
    (query) => query.equalTo("lender", account),
    [account, isInitialized],
    { live: true }
  );
  /**
   * fetch user agreements
   */
  const { data: borrowerAgreements } = useMoralisQuery(
    "Agreement",
    (query) => query.equalTo("borrower", account),
    [account, isInitialized],
    { live: true }
  );
  useEffect(() => {
    setResults([
      ...new Set([
        ...(lenderAgreements as Array<any>),
        ...(borrowerAgreements as Array<any>),
      ]),
    ]);
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
