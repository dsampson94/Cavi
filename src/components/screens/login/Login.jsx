import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { func } from 'prop-types';

import useTheme from '../../../tools/hooks/useTheme';

import background from '../../../tools/images/irricheckbackground.jpg';
import logo from '../../../tools/images/pulselogo.png';

import TextInput from '../../common/input/text/TextInput';
import Button from '../../common/button/Button';
import Graphic from '../../common/graphic/Graphic';
import Spinner from '../../common/loader/spinner/Spinner';

import './login.scss';

const Login = ({ onLoginClick }) => {

  useTheme(true);

  const spinnerText = useSelector(createSelector([state => state.system], system => system?.spinnerText));

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginClick = () => onLoginClick({
    user: {
      username,
      password
    }
  });

  return (
    <div style={ style }>
      <div className="login">
        <div className="login__container">
          <Graphic login graphic={ logo } />
          <TextInput label={ 'Username:' }
                     onChange={ ({ target }) => setUsername(target.value) }
                     onKeyPress={ event => {
                       if (event.key === 'Enter') handleLoginClick();
                     } }
                     login />

          <TextInput label={ 'Password:' }
                     type={ 'password' }
                     onChange={ ({ target }) => setPassword(target.value) }
                     onKeyPress={ event => {
                       if (event.key === 'Enter') handleLoginClick();
                     } }
                     login />

          <Button label={ 'Log in' }
                  type={ 'submit' }
                  onClick={ handleLoginClick }
                  login />

          <Button label={ 'Log out of Pulse' } />

          <div className="login__button-group">
            <Button label={ 'English' } flex white />
            <Button label={ 'Spanish' } flex white />
            <Button label={ 'French' } flex white />
          </div>
        </div>
        <Spinner centered spinnerText={ spinnerText } />
      </div>
    </div>
  );
};

const style = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${ background })`
};

Login.propTypes = {
  onLoginClick: func.isRequired
};

export default Login;
