import React from 'react';

import TextInput from '../../common/input/TextInput';
import Button from '../../common/button/Button';

import './login.scss';

const Login = () => {

  return (
    <div className="login">
        <TextInput label={ 'Username:' } login />
        <TextInput label={ 'Password:' }  login />

        <Button label={ 'Log in' } login />
        <Button label={ 'Log out of Pulse' } />

        <div className="login__button-group">
          <Button label={ 'English' } flex white />
          <Button label={ 'Spanish' } flex white />
          <Button label={ 'French' } flex white />
        </div>

    </div>
  );
};

Login.defaultProps = {
};

Login.propTypes = {
};

export default Login;
