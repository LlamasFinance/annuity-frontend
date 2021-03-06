import React from 'react';
import style from './HowItWork.module.scss';

import { FaEthereum, FaWallet } from 'react-icons/fa';
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';

//--------------------------------
//Needs a Better Responsive Design
//--------------------------------

const HowItWork = () => {
  return (
    <div className={style.container} id='howItWork'>
      <div className={style.header}>
          <h2> How it works </h2>
          <p>
          An “annuitant” proposes to the market an annuity agreement that specific their initial USDC
          deposit, the period of the agreement, and the fixed annual interest rate they want to earn over
          that period.
          </p>  
      </div>
      <div className={style.lineContainer}>
        <svg viewBox="0 0 1071 449" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.line}>
          <g filter="url(#filter0_d_50_1386)" className={style.svgContainer}>
            <path d="M27 311C75.0199 346 186.866 412 250.092 396C329.125 376 348.633 273 470.684 249C592.734 225 682.271 308.5 776.81 188C871.349 67.5003 917.368 -11.4997 1044.42 5.50027" stroke="#414887" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <filter id="filter0_d_50_1386" x="0.5" y="0.703613" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="24"/>
              <feGaussianBlur stdDeviation="12"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.203922 0 0 0 0 0.662745 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_50_1386"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_50_1386" result="shape"/>
            </filter>
          </defs>
        </svg>
        <svg width="395" height="1071" viewBox="0 0 395 1071" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.lineMobile}>
        <g filter="url(#filter0_d_94_1591)">
          <path d="M102.453 3C72.2578 51 15.3175 162.8 29.1212 226C46.3758 305 135.237 324.5 155.943 446.5C176.648 568.5 104.61 658 208.57 752.5C312.529 847 380.685 893 366.018 1020" stroke="#414887" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <filter id="filter0_d_94_1591" x="0.5" y="0.499695" width="394" height="1070" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="24"/>
            <feGaussianBlur stdDeviation="12"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.203922 0 0 0 0 0.662745 0 0 0 0.3 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_94_1591"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_94_1591" result="shape"/>
          </filter>
        </defs>
        </svg>

        <div className={style.cards}>
          <div className={style.card1}>
            <div>
              <FaWallet />
            </div>
            <span>1</span>
            <h2>Set up your digital wallet</h2>
            <p>
              Get a wallet and mint USDC. Propose an annuity agreement
              if you're a buyer. Lock USDC into the smart contract
            </p>
          </div>
          <div className={style.card2}>
            <div>
              <BsFillFileEarmarkCodeFill />
            </div>
            <span>2</span>
            <h2>Choose an Agreement</h2>
            <p>
              View proposed annuities and their borrowing rates if you're
              a seller. Activate an annuity by locking ETH Collateral into
              the smart contract in order to borrow USDC
            </p>
          </div>
          <div className={style.card3}>
            <div>
              <GiReceiveMoney />
            </div>
            <span>3</span>
            <h2>Recive Your Money</h2>
            <p>
            If the value of a provider’s ETH collateral nears the agreement’s future, then they will be
            automatically liquidated
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWork