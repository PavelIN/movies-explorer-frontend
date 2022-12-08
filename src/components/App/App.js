
import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import './App.css';

import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';


const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <Route exact path='/signin'>
            <Login />
          </Route>
          <Route exact path='/profile'>
            <Profile loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='/movies'>
            <Movies loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='/movies'>
            <Movies loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='/saved-movies'>
            <SavedMovies loggedIn={isLoggedIn} />
          </Route>
          <Route exact path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
