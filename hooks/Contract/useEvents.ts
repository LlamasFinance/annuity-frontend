import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { EXCHANGE_ABI, EXCHANGE_ADDRESS } from "../../constants";

export const useEvents = () => {
  const [events, setEvents] = useState();
  const provider = new ethers.providers.JsonRpcProvider();
  const exchange = new ethers.Contract(
    EXCHANGE_ADDRESS,
    EXCHANGE_ABI,
    provider
  );
  const exchangeFilter = exchange.filters;
  const filters = [
    { name: "Propose", filter: exchangeFilter.Propose() },
    { name: "AddCollateral", filter: exchangeFilter.AddCollateral() },
    { name: "Closed", filter: exchangeFilter.Closed() },
    { name: "Liquidate", filter: exchangeFilter.Liquidate() },
  ];
  const getEvents = async () => {
    let allEvents: any = [];
    filters.forEach(async (f) => {
      const events = (await exchange.queryFilter(f.filter, -10)).map(
        (event) => {
          return event.args;
        }
      );
      allEvents.push({ name: f.name, events: events });
    });

    console.log(allEvents);
    setEvents(allEvents);
    return allEvents;
  };

  useEffect(() => {
    getEvents();
  }, []);
  return { events };
};

/**
 * "event AddCollateral(address indexed,uint256 indexed,uint256 indexed)",
  "event Closed(address indexed,address indexed,uint256 indexed)",
  "event Liquidate(address indexed,uint256)",
  "event OwnershipTransferred(address indexed,address indexed)",
  "event Paused(address)",
  "event Propose(address indexed,uint256 indexed,uint256 indexed)",
  "event Received(address,uint256)",
  "event Repaid(address indexed,uint256 indexed,uint256 indexed)",
  "event Repay(address indexed,uint256 indexed,uint256 indexed)",
  "event Unpaused(address)",
  "event WithdrawCollateral(address indexed,uint256 indexed,uint256 indexed)",
 */
