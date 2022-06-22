/* eslint-disable */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { getMockStore } from '../../tools/testing/test.util';

import { initialState as authState } from '../../redux/reducers/auth.reducer';

import AuthContainer from './Auth.container';

const mockState = { auth: authState };

describe('AuthContainer', () => {
  const setup = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/'] }>
          <AuthContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render the login page', () => {
    const { getByText } = setup();

    const loginButton = getByText('Log in');
    expect(loginButton).toBeInTheDocument();
  });
});
