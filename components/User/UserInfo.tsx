import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react';
import { Blockie } from "web3uikit";
import style from './UserInfo.module.scss';

import SetUserInfoButton from './SetUserInfo/SetUserInfoButton';


interface Props {
    address: string
}

const UserInfo = ({ address }: Props) => {

    const { user, userError } = useMoralis();

    const username = user?.get("username");
    const email = user?.get("email");
    const bio = user?.get("bio");

    return(
        <div className={style.container}>
            {userError && <p>{userError.message}</p>}
            <div>
                <SetUserInfoButton />
                <Blockie scale={8} seed={address} />
                <div>
                    <h2>{ username ? username : 'Introduce'}</h2>
                    <p>{address?.substring(0,6)}...{address?.substring(address.length - 6)}</p> 
                    {
                        email ?
                        <h2>{email}</h2>
                        :
                        ''
                    }
                </div>
                <div>
                    {bio}
                </div>
                
            </div>
            
        </div>
    )
}

export default UserInfo;