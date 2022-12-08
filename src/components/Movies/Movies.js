import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = ({ loggedIn }) => {

    return (
        <section className='movies__page'>
            <Header loggedIn={loggedIn} />
            <div className='movies__content'>
            <SearchForm/>
            <MoviesCardList/>
            </div>
            <Footer />
        </section>
    );
};

export default Movies;