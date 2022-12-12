import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from '../../images/icon.svg';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Navigation = ({ loggedIn}) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(true);
  const location = useLocation().pathname;

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <nav className='navigation'>
      {loggedIn ? (
        <>
          <div className={location === '/' ? 'navigation__movies navigation__movies_white' : 'navigation__movies'}>
            <Link
              to='/movies'
              className={location === '/movies' ? 'navigation__movies-link_active' : 'navigation__movies-link'}>
              Фильмы
            </Link>
            <Link
              to='/saved-movies'
              className={location === '/saved-movies' ? 'navigation__movies-link_active' : 'navigation__movies-link'}>
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to='/profile'>
              <span className='navigation__button_account'>
                Аккаунт
              </span>
              <img className='navigation__button_icon' src={icon}/>
            </Link>
          </div>
          <button  className='burger__button'
          onClick={toggleBurgerMenu}>
          </button>
        </>
      ) : (
        <div className='navigation__auth'>
          <Link to='/signup' className='navigation__header-link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='navigation__button'>
              Войти
            </button>
          </Link>
        </div>
      )}
    <BurgerMenu onClose={toggleBurgerMenu} isBurgerMenuOpen={isBurgerMenuOpen}/>
    </nav>
  )
};

export default Navigation;