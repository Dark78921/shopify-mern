import React, { FC } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../context/State.Context';

const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
  const [{ user }] = useStateValue();
  return user !== null ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
