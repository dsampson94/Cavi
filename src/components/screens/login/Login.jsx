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

      <div className="flex flex-col max-w-m xs:max-w-xs max-h-90 p-12 bg-white dark:bg-dark-mode-grey-modal rounded-xl shadow-2xl">

        <Graphic login graphic={ logo } />

        <div className="mt-6 mb-6 text-center text-black dark:text-white">
          <label className="text-sm font-medium" htmlFor="username">Username</label>
          <input className="mt-2 w-full text-center border dark:text-black dark:bg-gray-300 dark:text-black border-gray-400 rounded-lg p-2
          focus:outline-none focus:shadow-outline"
                 type="text"
                 id="username"
                 onChange={ ({ target }) => setUsername(target.value) }
                 onKeyPress={ (event) => {
                   if (event.key === 'Enter') handleLoginClick();
                 } } />
        </div>

        <div className="mb-6 text-center text-black dark:text-white">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <input className="mt-2 text-center w-full border dark:bg-gray-300 dark:text-black border-gray-400 rounded-lg p-2
          focus:outline-none focus:shadow-outline"
                 type="password"
                 id="password"
                 onChange={ ({ target }) => setPassword(target.value) }
                 onKeyPress={ (event) => {
                   if (event.key === 'Enter') handleLoginClick();
                 } } />
        </div>

        <div className="mt-6 border-2 border-blue-600 dark:border-blue-800 rounded-lg">
          <button className="w-full bg-white hover:bg-blue-100 text-black dark:bg-blue-400 font-bold
        py-2 rounded-lg dark:text-white" onClick={ handleLoginClick }>
            Log in
          </button>
        </div>

        <div className="mt-6 flex border border-gray-400 ">
          <button className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2
          dark:bg-gray-400 rounded-l-md">English
          </button>
          <button className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2
          dark:bg-gray-400 rounded-r-md">Spanish
          </button>
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
