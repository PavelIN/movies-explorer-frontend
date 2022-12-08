import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
const MoviesCardList = () => {
    
    return (
      <section className='cards'>
        <ul className='cards__list'>
        <MoviesCard />
        </ul>
          <button className="cards__button">Ещё</button>
      </section>
    )
  };
  
  export default MoviesCardList;