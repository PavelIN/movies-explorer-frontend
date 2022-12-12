
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from "react";




const SavedMovies  = ({ loggedIn, movies,deleteMovie}) => {

const moviesL = !localStorage.getItem('MovieUser') ? movies : JSON.parse(localStorage.getItem('MovieUser'))

const [isMovieFilter, setIsMovieFilter] = useState(false);
const onFilter=()=>{
  setIsMovieFilter(!isMovieFilter)
  localStorage.setItem('savedMoviePer', JSON.stringify(!isMovieFilter));
}



    return (
        <section className='savedMovies__page'>
            <Header loggedIn={loggedIn} />
            <div className='savedMovies__content'>
            <SearchForm isMovieFilter={isMovieFilter} onFilter={onFilter}/>
            <MoviesCardList isPersonal={true} movies={moviesL} deleteMovie={deleteMovie} isMovieFilter={isMovieFilter} onFilter={onFilter}/>
            </div>
            <Footer />
        </section>
    );
};

export default SavedMovies ;