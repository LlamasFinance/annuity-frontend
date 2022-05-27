import React from 'react';
import style from './Header.module.scss';
import Link from 'next/link';

import Navbar from '../../Navbar/Navbar';
import BestAnnuities from '../../BestAnnuities/BestAnnuities';

import { BsFillCheckCircleFill, BsShieldLockFill } from 'react-icons/bs';

const Header = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.leftContent}>
            <h2>
             Fixed Annuities 
            </h2>
            <h3>
            The best way to get confidence in the future.
            </h3>
            <p>Helping you secure a guaranteed lifetime income</p>
            <div>
              <button className={style.apply}>
                View Annuities
              </button>
              {/* <button>
                See Insurers
              </button> */}
            </div>
            <div className={style.checks}>
              <div>
                <BsFillCheckCircleFill /> Secured by Smart Contracts
              </div>
              <div>
              <BsFillCheckCircleFill /> Great Service
              </div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.effects}>
            <img src="images/effect1.svg" alt="Effect" />
            <div>
                <img src="images/effect2.svg" className={style.circle1} alt="Circle1" />
                <img src="images/effect2.svg" className={style.circle2} alt="Circle2" />
            </div>
          </div>
          <div className={style.boxes}>
            <div className={style.box1}>
              <BsShieldLockFill /> Financial Security
            </div>
            <div className={style.box2}>
              {/* another box */}
            </div>
            <div className={style.box3}>
              {/* another box */}
            </div>
          </div>
          <img src="images/family.png" alt="Family" className={style.family} />
        </div>
      </div>
      <BestAnnuities />
    </div>
  )
}

export default Header