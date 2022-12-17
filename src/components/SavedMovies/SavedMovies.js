
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';
import React, { useEffect, useState,useMemo } from "react";




const SavedMovies = ({ loggedIn, movies, deleteMovie,isloading}) => {

    const moviesL = useMemo(()=>{
       return !localStorage.getItem('MovieUser') ? movies : JSON.parse(localStorage.getItem('MovieUser'))
    },[movies])  


    const [Keyword, setKeyword] = useState(localStorage.getItem('searchValue') ? localStorage.getItem('searchValue') : '');
    const [filteredMovies, setFilteredMovies] = useState(moviesL);

    

    const handleChange = (value) => {
        localStorage.setItem('searchValue', value);
        setKeyword(value);
    }

const filterMovies =(films)=>{
    return films.filter(movie => movie.nameRU.toLowerCase().includes(Keyword.toLowerCase()))
}

    const handleSubmit = () => {
        const SearchMovies = filterMovies(moviesL)
        const films = Keyword ? SearchMovies : moviesL
        setFilteredMovies(films)
    }


    const [isMovieFilter, setIsMovieFilter] = useState(false);

    useEffect(() => {
        const SearchMovies = filterMovies(moviesL)
        setFilteredMovies(SearchMovies)
    }, [moviesL])

    useEffect(() => {
        const initialFiltterValue = localStorage.getItem('savedMoviePer') === "true" ? true : false
        const initialSearchValue = localStorage.getItem('searchValue')
        setIsMovieFilter(initialFiltterValue)
        setKeyword(initialSearchValue)
    }, [])


    const onFilter = () => {
        setIsMovieFilter(!isMovieFilter)
        localStorage.setItem('savedMoviePer', JSON.stringify(!isMovieFilter));
    }



    return (
        <section className='savedMovies__page'>
            <Header loggedIn={loggedIn} />
            <div className='savedMovies__content'>
                <SearchForm isMovieFilter={isMovieFilter} onFilter={onFilter} Keyword={Keyword} onSeachChange={handleChange} onSubmit={handleSubmit} />
                {!isloading ? (
                <MoviesCardList isPersonal={true} movies={filteredMovies} deleteMovie={deleteMovie} isMovieFilter={isMovieFilter} onFilter={onFilter} films={movies}/>
                ):(<Preloader/>)}
            </div>
            <Footer />
        </section>
    );
};

export default SavedMovies;