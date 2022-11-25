/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState as AuthState } from '../../redux/reducers/auth.reducer';

import { getMockStore } from '../../tools/testing/test.util';

import DashboardContainer from './Dashboard.container';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({
    path: '/overview'
  })
}));

const mockState = { auth: AuthState };

describe('Overview Container', () => {
  const setUp = (path) => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ [path] }>
          <DashboardContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render /overview', () => {
    const { container } = setUp('/overview');

    const fieldOverviewScreen = container.querySelector('.fields-overview');
    expect(fieldOverviewScreen).toBeInTheDocument();
  });
});
