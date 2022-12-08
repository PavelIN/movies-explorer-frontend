import React from 'react';
import './Promo.css';
import promo from '../../images/landing-logo.svg';
import Header from '../Header/Header';

const Promo = ({loggedIn}) => {

    return (
      <>
      <Header loggedIn={loggedIn} />
      <div className="promo">
        <p className="promo_text">Учебный проект студента факультета Веб-разработки.</p>
        <img className='promo__logo' src={promo} alt='Логотип Промо.' />
      </div>
      </>
    );
  };

  export default Promo;