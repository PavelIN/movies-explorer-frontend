import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link ,useLocation} from 'react-router-dom'


const Header = ({loggedIn}) => {
  const location = useLocation().pathname;
    return (
      <header className={location === '/' ? 'header' : 'header header-white'}>
        <Link to='/'>
            <img src={logo} alt="лого" className="header__logo"/>
        </Link>
        <Navigation loggedIn={loggedIn} />
      </header>
    );
  };
  
  export default Header;