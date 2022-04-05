import React from 'react';
import { connect } from 'react-redux';

import Login from './login';

const LoginContainer = ({ spinnerText, errors }) => {

  return <Login onLoginClick={ () => {} }
                spinnerText={ spinnerText }
                errors={ errors } />;
};

const mapStateToProps = ({ system }) => ({
  spinnerText: system.spinnerText
});

export default connect(mapStateToProps)(LoginContainer);
