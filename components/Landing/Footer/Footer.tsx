import React from 'react';
import style from './Footer.module.scss';

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

        </div>
      </div>
      <div className={style.right}>
        <div>
          <h2>About</h2>
          <ul>
            <li>Info</li>
            <li>Info</li>
            <li>Info</li>
            <li>Info</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer