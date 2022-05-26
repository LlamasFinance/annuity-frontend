import { useMoralis } from "react-moralis";
import { STATUS } from "../../constants";
import { useAlert } from "../../hooks";
import useFetchSpecificAgreements from "../../hooks/App/db/useFetchSpecificAgreement";
import { useContract } from "../../hooks/Contract/useContract";

interface Props {
  id: string;
}

export const CloseButton = ({ id }: Props) => {
  const { close, closeError } = useContract();
  const { account, isInitialized } = useMoralis();
  const { status, lender } = useFetchSpecificAgreements(id);
  const { newAlert } = useAlert();

  const handleWithdrawClick = async () => {
    if (account) {
      if (status != "0" && status != "2") {
        newAlert({
          type: "error",
          message: "Agreement must have status Proposed or Repaid",
        });
        return;
      }
      if (account != "lender") {
        newAlert({
          type: "error",
          message: "Only annuitant can withdraw their USDC",
        });
        return;
      }
      await close({ id: id });
    }
  };
  return (
    <>
      <button onClick={handleWithdrawClick}>
        {status == "0" ? "Cancel Agreement" : "Withdraw Future Value"}
      </button>
    </>
  );
};

export default CloseButton;
