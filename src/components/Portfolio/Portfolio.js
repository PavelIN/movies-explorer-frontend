import React from 'react';
import './Portfolio.css';
import strelka from '../../images/strelka.svg';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/PavelIN/how-to-learn' target='_blank'>
            Статичный сайт
            <img src={strelka}/>
          </a>
        </li>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/PavelIN/russian-travel' target='_blank'>
            Адаптивный сайт
            <img src={strelka}/>
          </a>
        </li>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/PavelIN?tab=repositories' target='_blank'>
            Одностраничное приложение
            <img src={strelka}/>
          </a>
        </li>
      </ul>
    </div>
  )
};

export default Portfolio;