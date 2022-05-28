import React from 'react';
import style from './Footer.module.scss';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.logo}>
          <img src="images/white-logo.svg" alt="Logo" />
          <p>Llamas Finances</p>
        </div>
        <div className={style.social}>
          
        </div>
        <div className={style.copyright}>
          <FaRegCopyright />
          <p>Copy Right 2022. <br />
          All rights reserved
          </p>
        </div>
      </div>
      <div className={style.right}>
        <div>
          <h2>Team</h2>
        </div>
        <div>
          <h2>Service</h2>
        </div>
        <div>
          <h2>Contact Us</h2>
        </div>
      </div>
    </div>
  )
}

export default Footer