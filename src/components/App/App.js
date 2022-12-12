
import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import './App.css';

import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import * as movies from '../../utils/MoviesApi.js';
import * as moviesApi from '../../utils/MainApi.js';

import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';



const App = () => {
  const hist = useHistory();
  const [saveMovi, setSaveMovi] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movi, setMovi] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  //регистрация

  const handleRegistration = (data) => {
    return moviesApi
      .creatUser(data)
      .then(() => {
        handleAuthorization(data)
        //hist.push('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //авторизация 

  const handleAuthorization = (data) => {
    return moviesApi
      .login(data)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true)
        hist.push('/movies');
        Promise.all([moviesApi.getUser(data.token), moviesApi.getSaveMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            localStorage.setItem('MovieUser', JSON.stringify(userMovies));
            setCurrentUser(userInfo);
            setSaveMovi(userMovies);
            console.log(userMovies)
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    moviesApi
      .getUser(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        hist.push('/movies');
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);


  const getMoviess = async () => {
    return movies.getMovies()
      .then((movies) => {
        setMovi(movies)
        localStorage.setItem('AllMovies', JSON.stringify(movies));
      })
      .catch(error => {
        console.log(`Ошибка: ${error}`)
      });
  };

  React.useEffect(() => {
    getMoviess();
  }, []);

  const logout = async () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt')
    hist.push('/');
  };

  const hendleSveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    return moviesApi.addMovie(movie, jwt)
      .then(() => {
        getSavedMuvies()
      }
      )
  }

  const onUpdateUser = ({ name, email }) => {
    const jwt = localStorage.getItem('jwt');
    return moviesApi.updateUser({name,email},jwt)
    .then((data) => {
      setCurrentUser(data)
    }
    )
  }


const hendleDeleteMovie = (movieId) => {
  const jwt = localStorage.getItem('jwt');
  return moviesApi.deleteMovies(movieId, jwt)
    .then(() => {
      getSavedMuvies()
      console.log(saveMovi)
    }
    )
}


const getSavedMuvies = () => {
  const jwt = localStorage.getItem('jwt');
  moviesApi.getSaveMovies(jwt)
    .then((userMovies) => {
      setSaveMovi(userMovies);
      localStorage.setItem('MovieUser', JSON.stringify(userMovies));
    })
}

React.useEffect(() => {
  getSavedMuvies()
}, []);




return (
  <CurrentUserContext.Provider value={currentUser}>
    <main className="app">
      <Switch>
        <Route exact path='/'>
          <Main loggedIn={isLoggedIn} logout={logout} />
        </Route>
        <Route exact path='/signup'>
          <Register onRegister={handleRegistration} />
        </Route>
        <Route exact path='/signin'>
          <Login onLogin={handleAuthorization} />
        </Route>
        <Route exact path='/profile'>
          <Profile loggedIn={isLoggedIn} logout={logout} onUpdateUser={onUpdateUser} />
        </Route>
        <Route exact path='/movies'>
          <Movies movies={movi} savedMovies={saveMovi} loggedIn={isLoggedIn} saveMovie={hendleSveMovie} deleteMovie={hendleDeleteMovie} />
        </Route>
        <Route exact path='/saved-movies'>
          <SavedMovies movies={saveMovi} loggedIn={isLoggedIn} deleteMovie={hendleDeleteMovie} />
        </Route>
        <Route exact path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </main>
  </CurrentUserContext.Provider>
);
}

export default App;
