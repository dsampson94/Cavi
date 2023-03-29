import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { func } from 'prop-types';

import useTheme from '../../../tools/hooks/useTheme';

import background from '../../../tools/images/irricheckbackground.jpg';
import logo from '../../../tools/images/pulselogo.png';
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
    <div className="flex h-screen w-full items-center justify-center bg-center bg-cover"
         style={ { backgroundImage: `url(${ background })` } }>

      <div className="flex flex-col max-w-m xs:max-w-xs max-h-90 p-12 bg-white rounded-xl shadow-2xl">

        <Graphic login graphic={ logo } />

        <div className="mt-6 mb-6 text-center text-black">
          <label className="text-sm font-medium" htmlFor="username">Username</label>
          <input className="mt-2 w-full text-center border border-gray-400 rounded-lg p-2 focus:outline-none focus:shadow-outline"
                 type="text"
                 id="username"
                 onChange={ ({ target }) => setUsername(target.value) }
                 onKeyPress={ (event) => {
                   if (event.key === 'Enter') handleLoginClick();
                 } } />
        </div>

        <div className="mb-6 text-center text-black">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <input className="mt-2 text-center w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:shadow-outline"
                 type="password"
                 id="password"
                 onChange={ ({ target }) => setPassword(target.value) }
                 onKeyPress={ (event) => {
                   if (event.key === 'Enter') handleLoginClick();
                 } } />
        </div>

        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg" onClick={ handleLoginClick }>
          Log in
        </button>

        <div className="mt-6 flex border border-gray-400 rounded-lg">
          <button className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 rounded-lg">English</button>
          <button className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 rounded-lg">Spanish</button>
        </div>

      </div>
      <Spinner centered spinnerText={ spinnerText } />
    </div>
  );
};

Login.propTypes = {
  onLoginClick: func.isRequired
};

export default Login;
