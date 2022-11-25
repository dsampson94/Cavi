import React from 'react';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { removeSystemNotice } from './redux/actions/system.action';
import { ProtectedRoute } from './routes';

import SnackBar from './components/common/snack-bar/SnackBar';
import Spinner from './components/common/spinner/Spinner';

import AuthContainer from './routes/auth/Auth.container';
import DashboardContainer from './routes/dashboard/Dashboard.container';
import ClientFieldsContainer from './routes/client-fields/ClientFields.container';

import useTheme from './tools/hooks/useTheme';

const App = () => {

  useTheme(true);

  const dispatch = useDispatch();

  const notices = useSelector(createSelector([state => state.system], system => system?.notices));
  const spinnerText = useSelector(createSelector([state => state.system], system => system?.spinnerText));

  const style = {
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const handleCloseNotice = (noticeId) => dispatch(removeSystemNotice(noticeId));

  return (
    <div className="app" style={ style }>
      <Route path="/" component={ AuthContainer } />
      <ProtectedRoute path="/dashboard" component={ DashboardContainer } />
      <ProtectedRoute path="/client" component={ ClientFieldsContainer } />

      <SnackBar notices={ notices } onCloseNotice={ handleCloseNotice } />
      <Spinner showSpinnerText={ spinnerText } />
    </div>
  );
};

export default App;
