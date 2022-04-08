import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { getMockStore } from '../../../tools/testing/testing.util';

import { initialState as authState } from '../../../redux/reducers/auth.reducer';
import { initialState as systemState } from '../../../redux/reducers/system.reducer';

import LoginContainer from './Login.container';

const mockAuthActions = require('../../../redux/actions/auth.action');

const mockState = { auth: authState, system: systemState };

describe('Login Container', () => {
  const setup = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/'] }>
          <LoginContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should dispatch the login action when the button is clicked', () => {
    const spy = jest.spyOn(mockAuthActions, 'requestLogin');

    setup();

    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    expect(spy).toHaveBeenCalled();
  });
});
