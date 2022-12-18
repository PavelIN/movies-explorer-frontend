import React from 'react';
import './MoviesCard.css';
const MoviesCard = ({ title, duration, imgSrc, controls}) => {
  let mins  = (duration%60)
  let hours = (duration - mins) / 60;

  let result = (`${hours}ч ${mins}м`)


  
  return (
    <div className='card'>
      <div className='card__description'>
        <span className='card__name'>{title}</span>
        <span className='card__duration'>{result}</span>
      </div>
      <img className='card__image' src={imgSrc} alt={title} />
      {controls}
    </div>
  )
};

export default MoviesCard;