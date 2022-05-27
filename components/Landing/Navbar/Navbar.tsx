import React, { useState } from 'react';
import style from './Navbar.module.scss';
import Link from 'next/link';

import { RiWallet3Line } from 'react-icons/ri';
import { BsDoorOpenFill } from 'react-icons/bs';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  function connectWallet() {
    //code
  }

  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <img src='images/black-logo.svg' alt="Logo" />
        <p>Llamas Finances</p>
      </div>

      <ul className={style.navbarLinks}>
        <li>
          <a href="#fixedAnnuities">Quick Start</a>
        </li>
        <li>
          <Link href="/app/market">
            Agreements
          </Link>
        </li>
        <li>
          <a href="#howItWork">How it works</a>
        </li>
        <li>
          <a href="#whyUs">About Us</a>
        </li>
        <li>
          <a href="#faqs">Education</a>
        </li>
      </ul>

      <Link href="/app/market">
      <button>
          Get Started <BsDoorOpenFill /> 
      </button>
      </Link>

      <div className={style.mobileMenu}>
        <HiMenuAlt3 onClick={() => setToggle(true)}/>

        {
          toggle && (
            <div>
              <div className={style.logo}>
                <img src='images/black-logo.svg' alt="Logo" />
                <p>Llamas Finances</p>
              </div>

              <HiX onClick={() => setToggle(false)}/>

              <Link href="/app/market">
              <button onClick={() => connectWallet()}>
                <p>Get Started</p>  <BsDoorOpenFill />
              </button>
              </Link>

              <ul className={style.navbarLinks}>
                <li>
                  <a href="#fixedAnnuities">Quick Start</a>
                </li>
                <li>
                  <Link href="/app/market">
                    Agreements
                  </Link>
                </li>
                <li>
                  <a href="#howItWork">How it works</a>
                </li>
                <li>
                  <a href="#whyUs">About Us</a>
                </li>
                <li>
                  <a href="#faqs">Education</a>
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar