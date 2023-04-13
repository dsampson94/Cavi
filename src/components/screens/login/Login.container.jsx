import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { Routes } from '../../../routes';
import { saveUserLoginToLocalStorage } from '../../../tools/storage/localStorage';

import { requestLogin } from '../../../redux/actions/auth.action';

import Login from './Login';

const LoginContainer = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const onLoginSuccess = ({ user }) => {
    history.push(Routes.OVERVIEW);
    saveUserLoginToLocalStorage(user);
  };

  const onLoginClick = (user) => dispatch(requestLogin(user, () => {
    onLoginSuccess(user);
  }));

  return <Login onLoginClick={ onLoginClick } />;
};

export default LoginContainer;
