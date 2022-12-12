
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from "react";


const Movies = ({ loggedIn,movies,saveMovie,savedMovies,deleteMovie}) => {


    const moviesL = !localStorage.getItem('AllMovies') ? movies : JSON.parse(localStorage.getItem('AllMovies'))
   

    const [isMovieFilter, setIsMovieFilter] = useState(false);

    const onFilter=()=>{
      setIsMovieFilter(!isMovieFilter)
      localStorage.setItem('savedMovies', JSON.stringify(!isMovieFilter));
    }
    
    


    return (
        <section className='movies__page'>
            <Header loggedIn={loggedIn} />
            <div className='movies__content'>
            <SearchForm isMovieFilter={isMovieFilter} onFilter={onFilter}/>
            <MoviesCardList movies={moviesL} isPersonal={false} saveMovie={saveMovie} savedMovies={savedMovies} deleteMovie={deleteMovie} isMovieFilter={isMovieFilter}/>
            </div>
            <Footer />
        </section>
    );
};

export default Movies;