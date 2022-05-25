import React from 'react';
import style from './BestAnnuities.module.scss';

interface Prop {
  rate: string;
  time: string;
};

const BestAnnuities = () => {
  return (
    <div className={style.container}>
        <p>Today's Best Annuity Rates</p>
        <p className={style.mobileTitle}>Best Annuity Rates</p>

        <div>
            <AnnuityRate rate='2.85%' time='2-Year'/>
            <AnnuityRate rate='2.85%' time='3-Year'/>
            <AnnuityRate rate='2.85%' time='5-Year'/>
            <AnnuityRate rate='2.85%' time='7-Year'/>
            <AnnuityRate rate='2.85%' time='9-Year'/>
        </div>
        <button>
            Buy an annuity
        </button>
    </div>
  )
}

export default BestAnnuities

const AnnuityRate = ({ rate, time}: Prop) => {
    return (
        <div className={style.rates}>
            <span>{rate}</span>
            <p>{time}</p>
        </div>
    )
}