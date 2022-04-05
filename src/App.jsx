import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import AuthContainer from './routes/auth/Auth.container';

const App = () => {

  const style = {
    display: 'flex',
    flexDirection: 'column',
    height: '99.9vh',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid blue'
  };

  return (
    <div className="app" style={ style }>
      <Route path="/" component={ AuthContainer } />
    </div>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(App);
