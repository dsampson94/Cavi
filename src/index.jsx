import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';
import reportWebVitals from './reportWebVitals';

import rootReducer from './redux/reducers/index';

import App from './App';

import './stylesheets/app.scss';

import authSaga from './redux/sagas/auth.saga';
import graphicSaga from './redux/sagas/graphic.saga';
import clientSaga from './redux/sagas/client.saga';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(authSaga);
sagaMiddleware.run(graphicSaga);
sagaMiddleware.run(clientSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
