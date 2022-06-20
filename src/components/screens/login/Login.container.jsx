import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { saveUserLoginToLocalStorage } from '../../../tools/storage/localStorage';

import { requestLogin } from '../../../redux/actions/auth.action';

import Login from './Login';

const LoginContainer = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const onLoginSuccess = ({ user }) => {
    saveUserLoginToLocalStorage(user);
    history.push('/recommendation/overview');
  };

  const onLoginClick = (user) => dispatch(requestLogin(user, () => onLoginSuccess(user)));

  return <Login onLoginClick={ onLoginClick } />;
};

export default LoginContainer;
