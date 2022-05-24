import React from 'react';
import style from './Questions.module.scss';

import Faqs from '../../Faqs/Faqs';

import { BsArrowRight } from 'react-icons/bs';

const Questions = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <h2>Any questions? We got you.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation.</p>
        <button>More Faqs <BsArrowRight /></button>
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
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    question: 'Question 2',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    question: 'Question 3',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    question: 'Question 4',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  }
]