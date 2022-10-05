import React from 'react';
import { Route, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { removeSystemNotice } from './redux/actions/system.action';

import SnackBar from './components/common/snack-bar/SnackBar';
import Spinner from './components/common/spinner/Spinner';

import AuthContainer from './routes/auth/Auth.container';
import OverviewContainer from './routes/overview/Overview.container';
import ClientContainer from './routes/client/Client.container';

const App = () => {

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
      <Route path="/overview" component={ OverviewContainer } />
      <Route path="/client" component={ ClientContainer } />
      <SnackBar notices={ notices } onCloseNotice={ handleCloseNotice } />
      <Spinner showSpinnerText={ spinnerText } />
    </div>
  );
};

export default App;
