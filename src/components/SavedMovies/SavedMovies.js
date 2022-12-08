import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const SavedMovies  = ({ loggedIn }) => {

    return (
        <section className='savedMovies__page'>
            <Header loggedIn={loggedIn} />
            <div className='savedMovies__content'>
            <SearchForm/>
            <MoviesCardList/>
            </div>
            <Footer />
        </section>
    );
};

export default SavedMovies ;