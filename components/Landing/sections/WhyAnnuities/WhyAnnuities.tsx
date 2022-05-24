import React from 'react';
import style from './WhyAnnuities.module.scss';
import CardWhy from '../../CardWhy/CardWhy';

const WhyAnnuities = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <h2>So why Fixed Annuities?</h2>
        <p>A fixed annuity is a tax-deferred retirement savings vehicle that 
          provides fixed asset accumulation.</p>
        <button>Buy an Annuity</button>
      </div>
      <div className={style.right}>
        <CardWhy 
          img='icon1' 
          title='Protection against market risk' 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' 
        />
        <CardWhy 
          img='icon2' 
          title='Guaranted Income for life' 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' 
        />
        <CardWhy 
          img='icon3' 
          title='Help with long-term care costs' 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' 
        />
        <CardWhy 
          img='icon4' 
          title='Financial Security for loved ones' 
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' 
        />
      </div>
    </div>
  )
}

export default WhyAnnuities