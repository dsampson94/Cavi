/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { noOp } from '../../../tools/general/helpers.util';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as authState } from '../../../redux/reducers/auth.reducer';

import Login from './Login';

const mockState = { auth: authState };

describe('Login Screen', () => {

  const history = createMemoryHistory();

  const setup = (mockLoginFn = noOp) => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <Login onLoginClick={ mockLoginFn } />
        </Router>
      </Provider>
    );
  };

  test('should render the login screen', () => {
    const { container } = setup();

    const usernameInput = container.querySelectorAll('input')[0];
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = container.querySelectorAll('input')[1];
    expect(passwordInput).toBeInTheDocument();

    const usernameText = screen.getByText('Username:');
    expect(usernameText).toBeInTheDocument();

    const passwordText = screen.getByText('Password:');
    expect(passwordText).toBeInTheDocument();

    const loginButton = screen.getByText('Log in');
    expect(loginButton).toBeInTheDocument();

    const logOutButton = screen.getByText('Log out of Pulse');
    expect(logOutButton).toBeInTheDocument();

    const EnglishButton = screen.getByText('English');
    expect(EnglishButton).toBeInTheDocument();

    const spanishButton = screen.getByText('Spanish');
    expect(spanishButton).toBeInTheDocument();

    const frenchButton = screen.getByText('French');
    expect(frenchButton).toBeInTheDocument();
  });

  test('should call login function with values', () => {
    const mockLoginFn = jest.fn();

    const { container } = setup(mockLoginFn);

    const usernameInput = container.querySelectorAll('input')[0];
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });

    const passwordInput = container.querySelectorAll('input')[1];
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    expect(mockLoginFn).toHaveBeenCalledWith({ user: { username: 'testUsername', password: 'testPassword' } });
  });
});
