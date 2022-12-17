import { Route, Redirect} from 'react-router-dom';
import React, {useMemo } from "react";

const ProtectedRoute = ({ component: Component, ...props }) => {

  const jwt = localStorage.getItem('jwt')


  return (

        jwt ? <Component {...props} /> : <Redirect to={'/'} />

  );
};

export default ProtectedRoute;

