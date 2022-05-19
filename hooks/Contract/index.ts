import { useMint } from "./useMint";
import { usePropose } from "./usePropose";
import { useEvents } from "./useEvents";

import { useContractFunction } from "./useContractFunction";

export const useContract = () => {
  const { handleMint, mint } = useMint();
  const { handlePropose, propose } = usePropose();

  const { runFunction: runExchangeFunction } = useContractFunction("exchange");
  const { runFunction: runUsdcFunction } = useContractFunction("usdc");

  const { events } = useEvents();

  return {
    handleMint,
    mint,
    runExchangeFunction,
    runUsdcFunction,
    handlePropose,
    propose,
    events,
  };
};
