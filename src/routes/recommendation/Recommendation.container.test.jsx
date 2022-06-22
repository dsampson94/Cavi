/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState as clientState } from '../../redux/reducers/client.reducer';

import { getMockStore } from '../../tools/testing/test.util';

import RecommendationContainer from './Recommendation.container';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({
    path: '/recommendation'
  })
}));

const mockState = { client: clientState };

describe('Recommendation Container', () => {
  const setUp = (path) => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ [path] }>
          <RecommendationContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render /recommendation/overview', () => {
    const { container } = setUp('/recommendation/overview');

    const recommendationOverviewScreen = container.querySelector('.recommendation-overview');
    expect(recommendationOverviewScreen).toBeInTheDocument();
  });

  test('should render /recommendation/clientName/groupName', () => {
    const { container } = setUp('/recommendation/clientName/groupName');

    const recommendationClientViewScreen = container.querySelector('.recommendation-client-view');
    expect(recommendationClientViewScreen).toBeInTheDocument();
  });
});
