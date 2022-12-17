import React from 'react';
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";

import './Main.css';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';
import AboutMe from '../AboutMe/AboutMe.js';
import NavTab from '../NavTab/NavTab.js';

const Main = ({ loggedIn}) => {
  return (
    <>
      <Promo loggedIn={loggedIn}/>
      <NavTab/>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
};

export default Main;