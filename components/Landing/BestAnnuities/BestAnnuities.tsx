import React, { useState, useEffect } from 'react';
import style from './BestAnnuities.module.scss';
import Link from 'next/link';
import useFetchAllAgreements from "../../../hooks/App/db/useFetchAllAgreements";

interface Prop {
  rate: string;
  time: string;
  id: string;
};

const BestAnnuities = () => {
  const { results: agreements } = useFetchAllAgreements();

  return (
    <div className={style.container}>
        <p>Today's Best Annuity Rates</p>
        <p className={style.mobileTitle}>Best Annuity Rates</p>

        <div>
            {
              !agreements.length ? 

              <>
              <AnnuityRate rate='6%' time='2-Year' id='' />
              <AnnuityRate rate='5%' time='3-Year' id=''/>
              <AnnuityRate rate='7%' time='5-Year' id=''/>
              <AnnuityRate rate='4%' time='7-Year' id=''/>
              <AnnuityRate rate='8%' time='9-Year' id=''/>
              </>
              :
              agreements.map(({ attributes }, i) => {

                if(i < 5 ) {
                  const { rate, duration, uid } = attributes;
                  return (
                      <AnnuityRate rate={`${rate}%`} time={`${duration}-Year`} id={uid} />
                  )
                }
               
              })
            }
            
        </div>

        <Link href='/app/market'>
          <button>
            Buy an annuity
          </button>
        </Link>
        
    </div>
  )
}

export default BestAnnuities

const AnnuityRate = ({ rate, time, id }: Prop) => {
    return (
        <Link href={ id ? `/app/agreements/${id}` : ''}>
          <div className={style.rates}>
              <span>{rate}</span>
              <p>{time}</p>
          </div>
        </Link>
    )
}