import React , {useState,useEffect} from "react";
import { Table } from "web3uikit";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import ProposeButton from "../../components/Contract/ProposeButton";
import MintButton from "../../components/Contract/MintButton";

import useFetchUserAgreements from "../../hooks/App/db/useFetchUserAgreements";
import { Contract } from "../../hooks/Contract/useContract";
import { STATUS } from "../../constants";
import { useTokenValue } from "../../hooks";
import Link from "next/link";
import { FaSort } from "react-icons/fa";
import style from "./account.module.css";

interface Props {}

const Account = (props: Props) => {
  const { results: agreements } = useFetchUserAgreements();
  const { account } = useMoralis();
  const { getValue } = useTokenValue({});
  const [order,setOrder]=useState("ASC");
  const [agreementsArray,setAgreementsArray]=useState< Moralis.Object<Contract.AgreementDetails>[]>([]);

  const sorting=(basis:string):void=>{
    if(order==="ASC"){
     const result=agreements.sort((a:any,b:any)=>
     a.attributes[basis].toLowerCase() >  b.attributes[basis].toLowerCase() ? 1:-1
     );
     setOrder("DSC");
     setAgreementsArray(result);
 }
    if(order==="DSC"){
     const result=agreements.sort((a:any,b:any)=>
     a.attributes[basis].toLowerCase() <  b.attributes[basis].toLowerCase() ? 1:-1
     );
     setOrder("ASC");
     setAgreementsArray(result);
 }
  }
  console.log(agreementsArray);

  useEffect(()=>{
    setAgreementsArray(agreements);
  },[agreements]);
  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">Account Overview</h1>
        <div className="flex gap-x-4">
          <MintButton />
          <ProposeButton />
        </div>
        
      </div>
      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span>Position</span>,
          <span onClick={()=>sorting("uid")}>ID<FaSort className={style.icon} /></span>,
          <span onClick={()=>sorting("status")}>Status<FaSort className={style.icon} /></span>,
          <span onClick={()=>sorting("deposit")}> Deposit ($) <FaSort className={style.icon} /></span>,
          <span onClick={()=>sorting("collateral")}> Collateral <FaSort className={style.icon} /></span>,
          <span>Details</span>,
        ]}
        data={agreementsArray.map(({ createdAt, attributes }) => {
          const { lender, uid, status, deposit, collateral } = attributes;
          let { inEth } = getValue({
            amount: collateral,
            inputType: "wei",
          });
          inEth = Number(inEth) == 0 ? "--" : inEth;
          return [
            <span>{account == lender ? "Annuitant" : "Insurer"}</span>,
            <span>{uid}</span>,
            <span>{STATUS[Number(status)]}</span>,
            <span>
              {/* {getValue({ amount: deposit, inputType: "usdc" }).inUsd} */}
              {Number(deposit)/10**6}
            </span>,
            <span>{inEth}</span>,
            <span>
              <Link href={`/app/agreements/${uid}`}>
                <button className="btn-default btn">Details</button>
              </Link>
            </span>,
          ];
        })}
        pageSize={10}
      />
    </div>
  );
};

export default Account;
