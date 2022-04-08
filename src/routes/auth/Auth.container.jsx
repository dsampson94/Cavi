import React from 'react';
import { Route, Switch } from 'react-router';

import LoginContainer from '../../components/screens/login/Login.container';

const AuthContainer = () => (
  <Switch>
    <Route exact path="/" component={ LoginContainer } />
  </Switch>
);

export default AuthContainer;
