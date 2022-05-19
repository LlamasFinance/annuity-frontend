import { useMoralis } from "react-moralis";
import { UsernameAuth, WalletAuth } from "../components";

const Authenticate = () => {
  const { user } = useMoralis();
  if (!user) {
    return (
      <div>
        <h1>New users sign up</h1>
        <UsernameAuth signup={true} />
        <h1>Returning users log in</h1>
        <UsernameAuth signup={false} />
        <h1>Or use a wallet</h1>
        <WalletAuth />
      </div>
    );
  }

  return (
    <div>
      <h1>Already logged in!</h1>
      <p>Welcome {user.getUsername()}</p>
    </div>
  );
};

export default Authenticate;
