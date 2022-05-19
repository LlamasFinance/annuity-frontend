import { useSignup } from "./useSignup";
import { useLogin } from "./useLogin";

export const useUser = () => {
  const { signup, handleSignup } = useSignup();
  const { login, handleLogin } = useLogin();
  return { handleSignup, handleLogin, signup, login };
};
