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
          Quick Start
        </li>
        <li>
          Tools
        </li>
        <li>
          Insurers
        </li>
        <li>
          About Us
        </li>
        <li>
          Education
        </li>
      </ul>

      <Link href="/app">
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

              <button onClick={() => connectWallet()}>
                Get Started <BsDoorOpenFill />
              </button>

              <ul className={style.navbarLinks}>
                <li>
                  Quick Start
                </li>
                <li>
                  Tools
                </li>
                <li>
                  Insurers
                </li>
                <li>
                  About Us
                </li>
                <li>
                  Education
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