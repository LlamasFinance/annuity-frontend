import React from 'react';
import style from './WhyUs.module.scss';
import { BsArrowRight, BsFileEarmarkCode, BsBookmarkCheck } from 'react-icons/bs';

import { HiClipboardCheck } from 'react-icons/hi';
import { FaRegHandshake } from 'react-icons/fa';
import { BiGitPullRequest } from 'react-icons/bi';

const WhyUs = () => {
  return (
    <div className={style.container} id='whyUs'>
      <img src="images/effects2.svg" className={style.effect} alt="Effect" />
      <div className={style.importantInfo}>
      <div className={style.left}>
        <h2>Why Choose Us</h2>
        <img src="images/people.png" alt="Happy People" />
      </div>
      <div className={style.right}>
        <p className={style.headerText}>We're on a mission to eliminate the mistrust, waste, complexity and 
          inequality that makes the current industry so notorious.</p>
        <div className={style.cards}>
          <div className={style.card1}>
            <div>
              <img src="images/earnIcon.svg" alt="Icon" />
            </div>
            <h2>Better with Smart Contracts</h2>
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
      
      <div className={style.smartContracts}>
        <h2>How smart contracts are the solution</h2>
        <div className={style.reasonsCards}>
          <div>          
            <BsBookmarkCheck />
            <h3>Efficient</h3>
            <p>
              <ul>
                <li>No administration fees</li>
                <li>0 comisions</li>
                <li>0 cost riders</li>
                <li>0 hidden fees</li>
              </ul>
            </p>
          </div>
          <div>
            <FaRegHandshake />
            <h3>Temper-proof & Guaranted</h3>
            <p><strong>0 deceptive practices</strong> because there are
            no salesmen as it’s an open market
           </p>
          </div>
          <div>
            <BiGitPullRequest />
            <h3>Logical</h3>
            <p><strong>1 universal language</strong> is all that’s
            required to understand smart contract
            annuities — <strong>code</strong> <br />
            The code on the blockchain is the
            foundational contract</p>
          </div>
          <div>
            <BsFileEarmarkCode />
            <h3>Equal Access</h3>
            <p>Universal access to <strong>buy</strong> is enabled
            because all parties are anonymous and 
            universal access to <strong>sell</strong> is created
            because the peer-to-peer nature of the blockchain</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs