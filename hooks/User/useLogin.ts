import { useMoralis } from "react-moralis";
import { SignupOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";
import { FormDataReturned } from "web3uikit/dist/components/Form/types";
import { useApp } from "../";

/**
 * Lets a user login with Username and Password. Returns new User object
 *
 */
export const useLogin = () => {
  const { login: moralisLogin } = useMoralis();
  const { newAlert } = useApp();

  type SignupProps = {
    username: string;
    password: string;
  };

  const login = async ({ username, password }: SignupProps) => {
    const signupOptions: SignupOptions = {
      onSuccess: (user) =>
        newAlert({ type: "success", message: JSON.stringify(user) }),
      onError: (error) => newAlert({ type: "error", message: error.message }),
    };

    if (username && password) {
      const user = await moralisLogin(username, password, signupOptions);
      return user;
    }
  };

  const handleLogin = async ({ data }: FormDataReturned) => {
    const username =
      data?.find((input) => input.key == "USERNAME")?.inputResult.toString() ||
      "";

    const password =
      data?.find((input) => input.key == "PASSWORD")?.inputResult.toString() ||
      "";

    return await login({ username, password });
  };

  return { login, handleLogin };
};

/**
 * References:
 * Signup - https://github.com/MoralisWeb3/react-moralis#signup-non-crypto
 * Notification - https://github.com/web3ui/web3uikit#notification-
 */
