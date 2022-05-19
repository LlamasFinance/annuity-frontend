import { Form } from "web3uikit";
import { useUser } from "../../hooks";

type Props = {
  signup?: boolean;
};
export const UsernameAuth = ({ signup }: Props) => {
  const { handleSignup, handleLogin } = useUser();
  return (
    <Form
      customFooter={
        <button type="submit" className="btn btn-primary" id="form-submit ">
          {signup ? "Signup" : "Login"}
        </button>
      }
      data={[
        {
          key: "USERNAME",
          name: "Username",
          type: "text",
          validation: {
            required: true,
          },
          value: "",
        },
        {
          key: "PASSWORD",
          name: "Password",
          type: "password",
          validation: {
            required: true,
          },
          value: "",
        },
      ]}
      onSubmit={signup ? handleSignup : handleLogin}
      title={signup ? "Signup" : "Login"}
      id="authenticate-form"
    />
  );
};
