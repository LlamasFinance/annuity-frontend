import React from 'react';
import style from './Questions.module.scss';

import Faqs from '../../Faqs/Faqs';

import { BsArrowRight } from 'react-icons/bs';

const Questions = () => {
  return (
    <div className={style.container} id='faqs'>
      <div className={style.left}>
        <h2>Any questions? We got you.</h2>
        <p>If you are not sure whether Fixed Annuities is suitable for you or not, 
        do not worry. We are here to explain everything you might want to know. </p>
        {/* <button>More Faqs <BsArrowRight /></button> */}
      </div>
      <div className={style.right}>
        <Faqs data={data} />
      </div>
    </div>
  )
}

export default Questions

const data = [
  {
    question: 'How annuities work?',
    answer: `A fixed annuity is a contract between you and an insurance provider. It can act as a 
    safe place for cash to accumulate interest tax deferred. 

    You pay a lump sum of income, and in exchange, the insurance provider guarantees your principal 
    plus a minimum interest rate fixed over a multi-year time horizon. 
    
    At the end of the annuity agreement’s period, you can withdraw 
    your initial principle plus the accumulated interest.`
  },
  {
    question: 'Who Is it for?',
    answer: `People buy fixed annuities because they promise a guaranteed return, regardless of the
      market. They provide a peace of mind because they aren’t ties to market downturns or
      recessions.
      `+`\r\n`+`
      They’re also an amazing retirement savings vehicle because they get tax-differed growth,
      meaning that interest can accumulate without incurring annual taxes, as is the case for a CD.
      This not only makes them attractive for people nearing retirement age, but also for
      corporations and wealthy individuals who have excess cash on their balance sheets or want to
      donate to charities.`
  },
  {
    question: 'Why would a provider take an overcollateralized loan?',
    answer: `Providers back annuity agreements because they want access to USDC (U.S. dollars) using their
    existing assets (ETH) without having to sell their ETH and buy USDC directly.
    They believe that their ETH will appreciate over the years, so they don’t want to lose it.
    However, they need U.S. Dollars to participate in securities markets or conduct business
    transactions.

    Due to the efficiencies of smart contracts, they can borrow USDC for lower interest rates than
    ones offered by common banks. They can also borrow regardless of their race, ethnicity, and
    identity.`
  },
  {
    question: 'Is It a Good Value?',
    answer: `A fixed annuity is a CD-like investment which credits a fixed interest rate over a specified
    period. However, unlike a CD which must be bought at a bank or an existing industry-standard
    annuity which must be bought from an insurance company, smart contract annuities can be
    bought or sold from peers across the globe.

    This results in a much larger pool of capital to access and zero overhead or administrative costs
    which nets in greater returns for both parties in an annuity agreement.`
  }
]