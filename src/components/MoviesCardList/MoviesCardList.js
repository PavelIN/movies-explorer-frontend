import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as moviesApi from '../../utils/MainApi.js';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ isPersonal, movies, saveMovie, deleteMovie, savedMovies,isMovieFilter }) => {


  const shorMovies = movies.filter(movie=>movie.duration < 40) 
  const moviesFillter = isMovieFilter ? shorMovies : movies



  const getBtnValue = (isSaved) => {
    if (isSaved && !isPersonal) {
      return ""
    }
    if (!isPersonal) {
      return "сохранить"
    }
    return "×"
  }

  const handleClick = (movie, isSaved) => () => {
    if (isPersonal || isSaved) {
      const movid = movie._id || savedMovies?.find((savedMovie) => {
        return movie.id === savedMovie.movieId
      })._id
      deleteMovie(movid)
      return
    }
    if (!isPersonal) {
      saveMovie(movie)
      return
    }

    return null
  }


  return (
    <section className='cards'>
      <ul className='cards__list'>
        {moviesFillter.map((movie) => {
          const isSaved = isPersonal || savedMovies?.some(savedMovie => {
            return movie.id === savedMovie.movieId
          })
          return (
            <MoviesCard
              key={movie._id || movie.id}
              title={movie.nameRU}
              duration={movie.duration}
              imgSrc={movie.image.url.startsWith("http") ? movie.image.url : `https://api.nomoreparties.co/${movie.image.url}`}
              controls={
                <div className='card__buton_container' >
                  <button onClick={handleClick(movie, isSaved)} className={!isPersonal && isSaved ? 'card__button_saved ' : 'card__button '}>{getBtnValue(isSaved)}</button>
                </div>
              }
            />
          );
        })}
      </ul>
      {!isPersonal ? <button className="cards__button">Ещё</button> : <button className="card__button_none">Ещё</button>}
    </section>
  )
};

export default MoviesCardList;