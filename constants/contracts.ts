import {
  abi as usdc_abi,
  address as usdc_address,
} from "./deployments/mumbai/USDC.json";

import {
  abi as exchange_abi,
  address as exchange_address,
} from "./deployments/mumbai/LiquidatableExchange.json";

export const USDC_ADDRESS = usdc_address;
export const USDC_ABI = usdc_abi;
export const USDC_DECIMALS = 6;

export const USDC_CONFIG = {
  abi: USDC_ABI,
  contractAddress: USDC_ADDRESS,
};

export const EXCHANGE_ADDRESS = exchange_address;
export const EXCHANGE_ABI = exchange_abi;

export const EXCHANGE_CONFIG = {
  abi: EXCHANGE_ABI,
  contractAddress: EXCHANGE_ADDRESS,
};

export enum STATUS {
  Proposed,
  Active,
  Repaid,
  Closed,
}

export const SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
