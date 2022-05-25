import React, { useState } from 'react';
import { Faq } from '../../../typings';
import style from './Faqs.module.scss';

interface Prop {
    data: Faq[],
}

const Faq = ({ data }: Prop) => {
  const [selected, setSelected] = useState<null|Number>(null);

  function showAnswer(i: Number){
    if( selected === i){
      return setSelected(null);
    }

    setSelected(i)
  }

  return (
    <div className={style.container}>
      <div className={style.accordion}>
        {
          data.map((item, i) => (
            <div className={style.item}>
              <div className={style.header} onClick={() => showAnswer(i)}>
                <h2>{item.question}</h2>
                <span>{ selected === i ? '-' : '+'}</span>
              </div>
              <div className={ selected === i ? `${style.content} ${style.show}` : style.content }>
                {item.answer}
              </div>
              <hr />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Faq