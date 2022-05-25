import React from 'react';
import style from './CardWhy.module.scss';

interface Prop {
    img: string;
    title: string;
    text: string;
}

const CardWhy = ({ img, title, text}: Prop) => {
  return (
    <div className={style.container}>
        <img src={`images/${img}.svg`} alt="Icon" />
        <h2>{title}</h2>
        <p>{text}</p>
    </div>
  )
}

export default CardWhy