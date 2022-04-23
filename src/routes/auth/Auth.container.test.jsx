/* eslint-disable */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { getMockStore } from '../../tools/testing/testing.util';

import { initialState as authState } from '../../redux/reducers/auth.reducer';
import { initialState as systemState } from '../../redux/reducers/system.reducer';
import { initialState as graphicState } from '../../redux/reducers/graphic.reducer';

import AuthContainer from './Auth.container';

const mockState = {
  auth: authState,
  system: systemState,
  graphic: graphicState
};

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
