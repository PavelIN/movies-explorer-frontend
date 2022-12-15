import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  BREAKPOINT_1280,
  BREAKPOINT_990,
  BREAKPOINT_480,
  VISIBLE_MOVIES_5,
  VISIBLE_MOVIES_8,
  VISIBLE_MOVIES_12,
  VISIBLE_MOVIES_16,
  MOVIES_TO_LOAD_2,
  MOVIES_TO_LOAD_3,
  MOVIES_TO_LOAD_4,
} from '../../utils/constants.js';

const MoviesCardList = ({ isPersonal, movies, saveMovie, deleteMovie, savedMovies, isMovieFilter }) => {

  const shorMovies = movies.filter(movie => movie.duration < 40)
  const moviesFillter = isMovieFilter ? shorMovies : movies

  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const location = useLocation();

  const handleShowMoreMovies = () => {
    setDisplayedMovies((movies) => movies + moviesToLoad);
  };


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (location.pathname === '/movies') {
      if (windowWidth <= BREAKPOINT_480) {
        setDisplayedMovies(VISIBLE_MOVIES_5);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_990 &&
        windowWidth > BREAKPOINT_480
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_8);
        setMoviesToLoad(MOVIES_TO_LOAD_2);
      } else if (
        windowWidth <= BREAKPOINT_1280 &&
        windowWidth > BREAKPOINT_990
      ) {
        setDisplayedMovies(VISIBLE_MOVIES_12);
        setMoviesToLoad(MOVIES_TO_LOAD_3);
      } else if (windowWidth > BREAKPOINT_1280) {
        setDisplayedMovies(VISIBLE_MOVIES_16);
        setMoviesToLoad(MOVIES_TO_LOAD_4);
      }
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowWidth, location]);



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

   const btnNone = moviesFillter.length > displayedMovies ? true:false

  return (
    <section className='cards'>
       {!isPersonal ? (
        <>
      <ul className='cards__list'>
        {
          moviesFillter.slice(0, displayedMovies).map((movie) => {
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
                    <button onClick={handleClick(movie, isSaved)} className={isSaved ? 'card__button_saved ' : 'card__button '}>{getBtnValue(isSaved)}</button>
                  </div>
                }
              />
            );
          })}
      </ul>
      {btnNone ? <button onClick={handleShowMoreMovies} className="cards__button">Ещё</button>:<button onClick={handleShowMoreMovies} className="card__button_none">Ещё</button>}
      </>
      ) :(
      <ul className='cards__list'>
      {
        moviesFillter.map((movie) => {
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
     )}
    </section>
  )
};

export default MoviesCardList;