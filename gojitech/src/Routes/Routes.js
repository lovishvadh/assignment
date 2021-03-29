import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {
  SignIn as SignInView,
} from '../Views';
import { RouteWithLayout } from '../Components/';
import Dashboard from '../Views/Dashboard';

const isLoggedIn = () => {
  return (localStorage.getItem('jwt') && localStorage.getItem('twitchAccessToken'));
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  isLoggedIn() ?
  <RouteWithLayout component={Component} {...rest}  /> 
  :   <Redirect
  to="/sign-in"
/>
)

const Routes = () => {
  return (
    <Switch>
     <AuthenticatedRoute
        component={Dashboard}
        exact
        path="/"
      />
       <RouteWithLayout
        component={SignInView}
        exact
        path="/sign-in"
      />
      <RouteWithLayout
        component={<div>Not Found</div>}
        exact
        path="/not-found"
      />
      <Redirect to="/not-found" /> 
    </Switch>
  );
};

export default Routes;
