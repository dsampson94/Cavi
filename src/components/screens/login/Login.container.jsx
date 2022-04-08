import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { retrieveGraphicOneFromLocalStorage } from '../../../tools/general/graphic.util';

import { requestLogin } from '../../../redux/actions/auth.action';
import { requestRetrieveGraphicOne } from '../../../redux/actions/graphic.action';

import Login from './Login';

const LoginContainer = ({ dispatch, spinnerText, errors }) => {

  const [graphicOne] = useState(retrieveGraphicOneFromLocalStorage());

  const history = useHistory();

  useEffect(() => {
    if (!graphicOne) {
      dispatch(requestRetrieveGraphicOne());
    }
  }, [dispatch, graphicOne]);

  const onLoginSuccess = () => history.push('/');

  const onLoginClick = (user) => dispatch(requestLogin(user, onLoginSuccess));

  return <Login graphic={ graphicOne }
                onLoginClick={ onLoginClick }
                spinnerText={ spinnerText }
                errors={ errors } />;
};

const mapStateToProps = ({ system }) => ({
  spinnerText: system.spinnerText
});

export default connect(mapStateToProps)(LoginContainer);
