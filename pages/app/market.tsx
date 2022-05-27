import { GetServerSideProps } from "next";
import React ,{useState,useEffect} from "react";
import Moralis from "moralis";
import { Contract } from "../../hooks/Contract/useContract";
import ProposeButton from "../../components/Contract/ProposeButton";
import MintButton from "../../components/Contract/MintButton";
import { Table } from "web3uikit";
import { APP_ID, SERVER_URL, STATUS } from "../../constants";
import useFetchAllAgreements from "../../hooks/App/db/useFetchAllAgreements";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useTokenValue } from "../../hooks";
import { FaSort } from "react-icons/fa";
import style from "./account.module.css";

interface Props {
    // agreements: Moralis.Object<Contract.AgreementDetails>[];
}

interface IAgreement{
  borrower:string,
  collateral:string,
  createdAt:string,
  deposit:string,
  duration:string,
  futureValue:string,
  isLiquidationRequired:string,
  minReqCollateral:string,
  objectId:string,
  rate:string,
  repaidAmt:string,
  start:string,
  status:string,
  uid:string,
  updatedAt:string,
}
const Market = (props: Props) => {
  const { results: agreements } = useFetchAllAgreements();
  const { account } = useMoralis();
  const { getValue } = useTokenValue({});
  const [order,setOrder]=useState("ASC");
  const [agreementsArray,setAgreementsArray]=useState<IAgreement[]>([]);

  const res=JSON.parse(JSON.stringify(agreements));

  const sorting=(basis:string):void=>{
    if(order==="ASC"){
     const result=agreementsArray.sort((a:any,b:any)=>
     a[basis].toLowerCase() >  b[basis].toLowerCase() ? 1:-1
     );
     setOrder("DSC");
     setAgreementsArray(result);
 }
   else if(order==="DSC"){
     const result=agreementsArray.sort((a:any,b:any)=>
     a[basis].toLowerCase() <  b[basis].toLowerCase() ? 1:-1
     );
     setOrder("ASC");
     setAgreementsArray(result);
 }
  }
  
useEffect(()=>{
setAgreementsArray(res)
},[agreements])

  
  return (
    <div className="Account">
      <div className="Account__header">
        <h1 className="Account__title">Market</h1>
        <div className="flex gap-x-4">
          <MintButton />
          <ProposeButton />
        </div>
      </div>
      <Table
        columnsConfig="1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        header={[
          <span ><label>Status</label><FaSort onClick={() => sorting("status")} className={style.icon} /> </span>,
          <span ><label>Amount($)</label><FaSort onClick={() => sorting("deposit")} className={style.icon} /></span>,
          <span ><label>APY(%)</label><FaSort onClick={() => sorting("rate")} className={style.icon} /></span>,
          <span ><label>Duration(yrs)</label><FaSort onClick={() => sorting("duration")} className={style.icon} /></span>,
          <span><label>Date<FaSort  onClick={() => sorting("createdAt")} className={style.icon} /></label></span>,
          <span><label>ID</label><FaSort  onClick={() => sorting("uid")} className={style.icon} /></span>,
          <span><label>Details</label></span>,
        ]}
        
        data={agreementsArray.map((agreement) => {
          const { status, deposit, rate, duration, uid ,start,createdAt} = agreement;
          
          return [
            <span>{STATUS[Number(status)]}  </span>,
            <span>{Number(deposit) / 10 ** 6} </span>,
            <span>{Number(rate) / 10} </span>,
            <span>{duration} </span>,
            <span>{new Date(createdAt)?.toLocaleDateString()}</span>,
            <span>{uid} </span>,
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

export default Market;
