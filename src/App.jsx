import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { removeSystemNotice } from './redux/actions/system.action';

import SnackBar from './components/common/snack-bar/SnackBar';
import AuthContainer from './routes/auth/Auth.container';
import RecommendationContainer from './routes/recommendation/Recommendation.container';
import Spinner from './components/common/spinner/Spinner';

const App = ({ notices, dispatch, spinnerText }) => {

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const handleCloseNotice = (noticeId) => dispatch(removeSystemNotice(noticeId));

  return (
    <div className="app" style={ style }>
      <Route path="/" component={ AuthContainer } />
      <Route path="/recommendation" component={ RecommendationContainer } />
      <SnackBar notices={ notices } onCloseNotice={ handleCloseNotice } />
      <Spinner centered spinnerText={ spinnerText } />
    </div>
  );
};

const mapStateToProps = ({ system }) => ({
  notices: system.notices,
  spinnerText: system.spinnerText
});

export default connect(mapStateToProps)(App);
