import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";
import { useAlert } from "../../../hooks";

export const SetUserInfoForm = () => {
  const [key, setKey] = useState("profile");
  
  const { newAlert } = useAlert();
  const { setUserData, userError, isAuthenticated, authenticate, isUserUpdating, user } = useMoralis();
  
  useEffect(() => {
    userError && newAlert({
      type: 'error',
      message: userError.message,
    })
  },[userError])

  const handleEditSubmit = React.useCallback(
    (data) => {
      const username = data.data.find(({ key }: { key: string }) => key === "NAME").inputResult;
      const email = data.data.find(({ key }: { key: string }) => key === "EMAIL").inputResult;
      const bio = data.data.find(({ key }: { key: string }) => key === "BIO").inputResult;

      if(!isAuthenticated) authenticate();
  
      isAuthenticated && setUserData({
        username: username  ? username : user?.get("username"),
        email: email ? email : user?.get("email"),
        bio: bio ? bio : user?.get("bio"),
      });
    },
    []
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
            name: "Username",
            type: "text",
            value: "",
            key: "NAME",
          },
          {
            inputWidth: "80%",
            name: "Email",
            type: "text",
            value: "",
            key: "EMAIL",
          },
          {
            inputWidth: "80%",
            name: "Bio",
            type: "text",
            value: "",
            key: "BIO",
          },
        ]}
        key={key}
        onSubmit={(data) => {
          handleEditSubmit(data);
          setKey(key + new Date().toString());
        }}
        title="Edit Profile"
        id="profile-form"
      />
    </div>
  );
};