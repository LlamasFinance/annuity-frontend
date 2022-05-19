import { useMoralis } from "react-moralis";
import { SignupOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useApp } from "../";

/**
 * Lets a user signup with Username and Password. Returns new User object
 *
 */
export const useSignup = () => {
  const { signup: moralisSignup } = useMoralis();
  const { newAlert } = useApp();

  type SignupProps = {
    username: string;
    password: string;
  };

  const signup = async ({ username, password }: SignupProps) => {
    const signupOptions: SignupOptions = {
      onSuccess: (user) =>
        newAlert({ type: "success", message: JSON.stringify(user) }),
      onError: (error) => newAlert({ type: "error", message: error.message }),
    };

    if (username && password) {
      const user = await moralisSignup(
        username,
        password,
        undefined,
        undefined,
        signupOptions
      );
      return user;
    }
  };

  const handleSignup = async ({ data }: FormDataReturned) => {
    const username =
      data?.find((input) => input.key == "USERNAME")?.inputResult.toString() ||
      "";

    const password =
      data?.find((input) => input.key == "PASSWORD")?.inputResult.toString() ||
      "";

    return await signup({ username, password });
  };

  return { signup, handleSignup };
};

/**
 * References:
 * Signup - https://github.com/MoralisWeb3/react-moralis#signup-non-crypto
 * Notification - https://github.com/web3ui/web3uikit#notification-
 */
