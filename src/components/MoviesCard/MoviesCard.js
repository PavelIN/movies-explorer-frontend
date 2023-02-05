import React from 'react';
import './MoviesCard.css';
const MoviesCard = ({ title, duration, imgSrc, controls,trailerLink}) => {
  let mins  = (duration%60)
  let hours = (duration - mins) / 60;

  let result = (`${hours}ч ${mins}м`)


  
  return (
    <div className='card'>
      <div className='card__description'>
        <span className='card__name'>{title}</span>
        <span className='card__duration'>{result}</span>
      </div>
      <a href={trailerLink} target="_blank">
      <img className='card__image' src={imgSrc} alt={title} />
      </a>
      {controls}
      
    </div>
  )
};

export default MoviesCard;