/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState as authState } from '../../redux/reducers/auth.reducer';
import { initialState as systemState } from '../../redux/reducers/system.reducer';
import { initialState as graphicState } from '../../redux/reducers/graphic.reducer';
import { initialState as clientState } from '../../redux/reducers/client.reducer';

import RecommendationContainer from './Recommendation.container';
import { getMockStore, mockLoginSuccessData } from '../../tools/testing/testing.util';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({
    path: '/recommendation'
  })
}));

const mockState = {
  material: authState,
  supplier: systemState,
  contact: graphicState,
  client: clientState
};

const mockAuthUtil = require('../../tools/storage/localStorage');

xdescribe('Recommendation Container', () => {

  const setUp = (path) => {
    jest.spyOn(mockAuthUtil, 'retrieveUserFromLocalStorage').mockReturnValue(mockLoginSuccessData);

    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ [path] }>
          <RecommendationContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  xtest('should render /recommendation', () => {
    const { container } = setUp('/recommendation');

    const recommendationScreen = container.querySelector('.content-container');
    expect(recommendationScreen).toBeInTheDocument();
  });

  xtest('should render /recommendation/overview', () => {
    const { container } = setUp('/recommendation/overview');

    const recommendationOverviewScreen = container.querySelector('.content-container');
    expect(recommendationOverviewScreen).toBeInTheDocument();
  });

  xtest('should render /recommendation/client', () => {
    const { container } = setUp('/recommendation/client');

    const recommendationClientFieldListScreen = container.querySelector('.content-container');
    expect(recommendationClientFieldListScreen).toBeInTheDocument();
  });
});
