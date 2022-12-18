
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader.js';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from "react";


const Movies = ({ loggedIn, movies, saveMovie, savedMovies, deleteMovie, isloading,getMoviess }) => {


    const moviesL = !localStorage.getItem('AllMovies') ? movies : JSON.parse(localStorage.getItem('AllMovies'))

    const [Keyword, setKeyword] = useState(localStorage.getItem('allSearchValue') ? localStorage.getItem('allSearchValue') : '');
    const [filteredMovies, setFilteredMovies] = useState(moviesL);
    const [isSubmitted, setIssubmitted] = useState(localStorage.getItem('allIsSubmitted') === "true" ? true : !!Keyword);
 
  

    const filterMovies = (films) => {
        return films.filter(movie => movie.nameRU.toLowerCase().includes(Keyword.toLowerCase()))
    }

    const handleSubmit = () => {
        getMoviess()
        const SearchMovies = filterMovies(moviesL)
        const films = Keyword ? SearchMovies : moviesL
        setFilteredMovies(films)
        setIssubmitted(true)
        localStorage.setItem("allIsSubmitted", true)
    }

    const handleChange = (value) => {
        localStorage.setItem('allSearchValue', value);
        setKeyword(value);
    }

    const [isMovieFilter, setIsMovieFilter] = useState(false);


    useEffect(() => {
        const initalFiltterValue = localStorage.getItem('savedMovies') === "true" ? true : false
        const initialSearchValue = localStorage.getItem('allSearchValue')
        setIsMovieFilter(initalFiltterValue)
        setKeyword(initialSearchValue)
        setFilteredMovies(filterMovies(moviesL))
    }, [])





    const onFilter = () => {
        console.log('onFilter')
        setIsMovieFilter((isMovieFilter) => {
            localStorage.setItem('savedMovies', JSON.stringify(!isMovieFilter));
            return !isMovieFilter
        })
    }




    return (

        <section className='movies__page'>

            <Header loggedIn={loggedIn} />
            <div className='movies__content'>
                <SearchForm isMovieFilter={isMovieFilter} onFilter={onFilter} Keyword={Keyword} onSeachChange={handleChange} onSubmit={handleSubmit} />
            {!isloading ? (
                <MoviesCardList movies={isSubmitted ? filteredMovies : []} isPersonal={false} saveMovie={saveMovie} savedMovies={savedMovies} deleteMovie={deleteMovie} isMovieFilter={isMovieFilter} films={movies}/>
            ):(<Preloader/>)}
            </div>
            <Footer />



        </section>

    );
};

export default Movies;