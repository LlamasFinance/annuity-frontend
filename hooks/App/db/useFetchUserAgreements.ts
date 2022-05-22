import React from "react";
import { useAlert } from "../../App/useAlert";
import { Moralis } from "moralis";

export default function useFetchUserAgreements() {
  const { newAlert } = useAlert();

  return React.useCallback(
    async (address: string) => {
      const Agreement = Moralis.Object.extend("Agreement");
      const query = new Moralis.Query(Agreement);
      query.equalTo("lender", address);
      const results = await query.find();

      return results;
    },
    [newAlert]
  );
}
