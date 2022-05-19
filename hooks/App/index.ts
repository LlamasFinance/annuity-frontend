import { useAlert } from "./useAlert";

export const useApp = () => {
  const { newAlert } = useAlert();
  return { newAlert };
};
