import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <span className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__bottom-block'>
        <span className='footer__copyright'>© 2022</span>
        <div className='footer__socials'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/PavelIN' target='_blank' rel="noreferrer">Github</a>
          <a className='footer__link' href='https://vk.com/oranlo' target='_blank' rel="noreferrer">Вконтакте</a>
        </div>
      </div>

    </footer>
  )
};

export default Footer;