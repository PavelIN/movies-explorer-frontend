import { Route, Redirect } from 'react-router-dom';

const jwt = localStorage.getItem('jwt');

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        jwt ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
  );
};

export default ProtectedRoute;