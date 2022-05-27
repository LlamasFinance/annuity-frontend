import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { useAlert } from "../../../hooks";

export const SetUserInfoForm = () => {
  const [key, setKey] = useState("profile");

  const { newAlert } = useAlert();
  const {
    setUserData,
    userError,
    isAuthenticated,
    isInitialized,
    isUserUpdating,
    user,
    account,
  } = useMoralis();
  const hasUsername = user?.has("hasUsername");
  const username = user?.get("username");

  useEffect(() => {
    userError &&
      newAlert({
        type: "error",
        message: userError.message,
      });
  }, [userError]);

  const handleEditSubmit = React.useCallback(
    async (data) => {
      if (!account || !isAuthenticated) {
        newAlert({ type: "error", message: "Please connect your wallet" });
      } else if (isInitialized) {
        const user = await setUserData({
          username: data.data.find(({ key }: { key: string }) => key === "NAME")
            .inputResult,
          hasUsername: true,
        });
        if (user?.get("hasUsername")) {
          const username = user?.get("username");
          newAlert({
            type: "success",
            message: `  Set username to ${username}`,
          });
        }
      }
      // clear form entry
      setKey(key.substring(0, 3) + new Date().toString());
    },
    [account, isAuthenticated, isInitialized]
  );

  return (
    <div>
      <Form
        customFooter={
          <button
            type="submit"
            className={`btn btn-primary ${isUserUpdating && "loading"}`}
            id="form-submit"
          >
            Submit
          </button>
        }
        data={[
          {
            inputWidth: "80%",
            name: hasUsername ? username : "Username",
            type: "text",
            value: "",
            key: "NAME",
          },
        ]}
        key={key}
        onSubmit={handleEditSubmit}
        title="Edit Profile"
        id="profile-form"
      />
    </div>
  );
};
