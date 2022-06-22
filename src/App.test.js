import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { getMockStore } from './tools/testing/test.util';
import { initialState as systemState } from './redux/reducers/system.reducer';

import App from './App';

const mockState = { system: systemState };

describe('App', () => {

  test('should render the app', () => {
    render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const logIn = screen.getByText('Log in');
    expect(logIn).toBeInTheDocument();
  });
});
