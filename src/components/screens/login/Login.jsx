import React, { useState } from 'react';

import TextInput from '../../common/input/TextInput';
import Button from '../../common/button/Button';

import './login.scss';
import { func } from 'prop-types';
import Graphic from '../../common/graphic/Graphic';

const Login = ({ onLoginClick, graphic }) => {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLoginClick = () => onLoginClick({
    user: {
      username,
      password
    }
  });

  return (
    <div className="login">
      <Graphic login graphic={ graphic } />
      <TextInput label={ 'Username:' }
                 onChange={ ({ target }) => setUsername(target.value) }
                 login />

      <TextInput label={ 'Password:' }
                 type={ 'password' }
                 onChange={ ({ target }) => setPassword(target.value) }
                 login />

      <Button label={ 'Log in' }
              type="submit"
              onClick={ handleLoginClick }
              login />

      <Button label={ 'Log out of Pulse' } />

      <div className="login__button-group">
        <Button label={ 'English' } flex white />
        <Button label={ 'Spanish' } flex white />
        <Button label={ 'French' } flex white />
      </div>
    </div>
  );
};

Login.defaultProps = {};

Login.propTypes = {
  onLoginClick: func.isRequired
};

export default Login;
