import { useMoralis } from "react-moralis";
import { useContract } from "../../hooks/Contract/useContract";

interface Props {
  id: string;
}

export const WithdrawButton = ({ id }: Props) => {
  const { close, closeError } = useContract();
  const { account, isInitialized } = useMoralis();

  const handleWithdrawClick = async () => {
    if (account) {
      console.log("account ", account);
      await close({ id: id });
    }
  };
  return (
    <>
      <button onClick={handleWithdrawClick}>Withdraw</button>
    </>
  );
};

export default WithdrawButton;
