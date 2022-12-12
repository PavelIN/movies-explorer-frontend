import { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';

const SearchForm = ({onFilter,isMovieFilter}) => {
    
    function handleSavedMoviesFormSubmit(e) {
        e.preventDefault()
      }

    return (
      <section className='search'>
            <form className='search__form form' name='search-saved-movie-form'  noValidate onSubmit={handleSavedMoviesFormSubmit}>
              <input
                type='text'
                placeholder='Фильм'
                className='search__input'
                required
                name='searchRequest'
              />
              <button
                type='submit'
                className='search__button'
              >
                Найти
              </button>
            </form>
            <FilterCheckbox onFilter={onFilter} isMovieFilter={isMovieFilter}/>
        <div className='search__line' />
      </section>
    )
  };
  
  export default SearchForm;