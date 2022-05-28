import React from 'react';
import style from './WhyAnnuities.module.scss';
import CardWhy from '../../CardWhy/CardWhy';

const WhyAnnuities = () => {
  return (
    <div className={style.container} id='fixedAnnuities'>
      <div className={style.left}>
        <h2>So why Fixed Annuities by Smart Contracts?</h2>
        <p>A fixed annuity is a contract between you and an insurance provider. 
          It can act as a safe place for cash to accumulate interest tax deferred.</p>
        {/* <button>Buy an Annuity</button> */}
      </div>
      <div className={style.right}>
        <CardWhy 
          img='icon1' 
          title='Protection against market risk' 
          text='If the value of a provider’s ETH collateral nears the agreement’s future, 
          then they will be automatically liquidated so that the annuitant is guaranteed 
          the principal and interest that the agreement spelled out.' 
        />
        <CardWhy 
          img='icon2' 
          title='Guaranteed, Strong Return' 
          text='The money you invest in a fixed annuity will accumulate at a fixed rate, 
          which is specified upfront and guaranteed for the entire contract. Fixed annuities 
          generally offer higher rates than CDs with the same contract.'
        />
        <CardWhy 
          img='icon3' 
          title='Help with long-term care costs' 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' 
        />
        <CardWhy 
          img='icon4' 
          title='Universal access to buy and sell' 
          text='This is enabled
          because all parties are anonymous.
          Participants can live in different
          countries or speak different languages. They can
          propose annuity agreements and the market determines where
          their proposal is accepted' 
        />
      </div>
    </div>
  )
}

export default WhyAnnuities