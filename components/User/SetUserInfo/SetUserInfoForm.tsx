import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Form } from "web3uikit";

export const SetUserInfoForm = () => {
  const [key, setKey] = useState("profile");
  
  const { setUserData, refetchUserData, userError, isAuthenticated, authenticate, isUserUpdating, user } = useMoralis();
  
  const handleEditSubmit = React.useCallback(
    (data) => {
      console.log(data);
      console.log(isAuthenticated)
     
      if(!isAuthenticated) authenticate();
  
      setUserData({
        username: "Batman",
        email: "batman@marvel.com",
        bio: 'soy batman',
      });

      console.log(user);
      
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
            name: "Name",
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
        id="editProfile-form"
      />
    </div>
  );
};