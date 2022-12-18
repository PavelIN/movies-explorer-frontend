
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import './App.css';

import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import ProtectedRoute from '../ProtectedRoute';

import * as movies from '../../utils/MoviesApi.js';
import * as moviesApi from '../../utils/MainApi.js';
import * as ApiAuth from '../../utils/ApiAuth.js';

import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';



const App = () => {
  const hist = useHistory();
  const [saveMovi, setSaveMovi] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movi, setMovi] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const handler = () => {
      localStorage.setItem('allIsSubmitted', false)
    }
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  useEffect(() => {
    getMoviess();
    getSavedMuvies()
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  //регистрация

  const handleRegistration = (data) => {
    return ApiAuth
      .creatUser(data)
      .then(() => {
        handleAuthorization(data)
        //hist.push('/signin');
      })
      .catch((err) => {
        setError(err === 'Ошибка: 409' ? 'такой email уже существует' : 'на сервере произошла ошибка')
      });
  }


  //авторизация 

  const handleAuthorization = (data) => {
    return ApiAuth
      .login(data)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true)
        hist.push('/movies');
        Promise.all([ApiAuth.getUser(data.token), moviesApi.getSaveMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            localStorage.setItem('MovieUser', JSON.stringify(userMovies));
            setCurrentUser(userInfo);
            setSaveMovi(userMovies);
          })
      })
      .catch((error) => {
        setError(error === 'Ошибка: 401' ? 'неверный email или пароль' : 'на сервере произошла ошибка')
      });
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    ApiAuth
      .getUser(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };




  const getMoviess = async () => {
    setIsLoading(true);
    return movies.getMovies()
      .then((movies) => {
        setMovi(movies)
        localStorage.setItem('AllMovies', JSON.stringify(movies));
      })
      .catch(error => {
        console.log(`Ошибка: ${error}`)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



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
    return ApiAuth.updateUser({ name, email }, jwt)
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(error => {
        console.log(error)
        setError(error === 'Ошибка: 409' ? 'такой email уже существует' : 'на сервере произошла ошибка')
      })
  }


  const hendleDeleteMovie = (movieId) => {
    
    const jwt = localStorage.getItem('jwt');
    return moviesApi.deleteMovies(movieId, jwt)
      .then(() => {
        getSavedMuvies()
      })
  }



  const getSavedMuvies = () => {
    const jwt = localStorage.getItem('jwt');
    moviesApi.getSaveMovies(jwt)
      .then((userMovies) => {
        setSaveMovi(userMovies);
        localStorage.setItem('MovieUser', JSON.stringify(userMovies));
      })
  }





  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="app">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={isLoggedIn} logout={logout} />
          </Route>
          <Route exact path='/signup'>
            <Register onRegister={handleRegistration} error={error} />
          </Route>
          <Route exact path='/signin'>
            <Login onLogin={handleAuthorization} error={error} />
          </Route>
          <ProtectedRoute 
            component={Profile}
            path='/profile'
            loggedIn={isLoggedIn}
            logout={logout}
            onUpdateUser={onUpdateUser}
            error={error}
          /> 
          <ProtectedRoute
            getMoviess={getMoviess}
            component={Movies}
            path='/movies'
            loggedIn={isLoggedIn}
            isloading={isloading}
            movies={movi}
            savedMovies={saveMovi}
            saveMovie={hendleSveMovie}
            deleteMovie={hendleDeleteMovie}
          />
          <ProtectedRoute
            component={SavedMovies}
            path='/saved-movies'
            loggedIn={isLoggedIn}
            isloading={isloading}
            movies={saveMovi}
            deleteMovie={hendleDeleteMovie}
          />
          <Route exact path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
