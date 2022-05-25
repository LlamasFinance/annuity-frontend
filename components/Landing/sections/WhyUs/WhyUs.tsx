import React from 'react';
import style from './WhyUs.module.scss';
import { BsArrowRight } from 'react-icons/bs';

const WhyUs = () => {
  return (
    <div className={style.container}>
      <img src="images/effects2.svg" className={style.effect} alt="Effect" />
      <div className={style.left}>
        <h2>Why Choose Us</h2>
        <img src="images/people.png" alt="Happy People" />
      </div>
      <div className={style.right}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className={style.cards}>
          <div className={style.card1}>
            <div>
              <img src="images/earnIcon.svg" alt="Icon" />
            </div>
            <h2>#1 Web3 Annuity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <button>Learn more <BsArrowRight /></button>
          </div>
          <div className={style.card2}>
            <div>
              <div></div>
              <img src="images/cashbackIcon.svg" alt="Icon" />
            </div>
            <h2>#1 Web3 Annuity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <button>Learn more <BsArrowRight /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs