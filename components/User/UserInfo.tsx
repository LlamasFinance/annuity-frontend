import { Moralis } from "moralis";
import { useMoralis, useNativeBalance } from "react-moralis";
import { useState, useEffect } from "react";
import { Blockie } from "web3uikit";
import style from "./UserInfo.module.scss";

import SetUserInfoButton from "./SetUserInfo/SetUserInfoButton";

interface Props {
  address: string;
}

const UserInfo = ({ address }: Props) => {
  const { user } = useMoralis();

  const username = user?.get("username");
  const email = user?.get("email");
  const bio = user?.get("bio");

  return (
    <div className={style.container}>
      <div className={style.first}>
        <SetUserInfoButton />
        <Blockie scale={8} seed={address} />
        <div className={style.info}>
          <h2>
            {username
              ? username.charAt(0).toUpperCase() + username.slice(1)
              : address}
          </h2>
          <p>
            {username && address?.substring(0, 6)}...
            {address?.substring(address.length - 6)}
          </p>
          {email && <span>Email: {email}</span>}
        </div>
      </div>
      <div className={style.bio}>
        {bio && bio?.charAt(0).toUpperCase() + bio?.slice(1)}
      </div>
    </div>
  );
};

export default UserInfo;
