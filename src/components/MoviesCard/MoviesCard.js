
import './MoviesCard.css';
import pic from '../../images/pic.svg';
const MoviesCard = () => {

  return (
    <div className='card'>
        <div className='card__description'>
            <span className='card__name'>asdasdasdasdasd</span>
            <span className='card__duration'>asdasdasdasdasd</span>
        </div>
        <img className='card__image' src={pic}/>
        <button className='card__button '>Сохранить</button>
    </div>
  )
};

export default MoviesCard;