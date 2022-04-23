/* eslint-disable */
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { getMockStore } from '../../../../tools/testing/testing.util';
import { initialState as authState } from '../../../../redux/reducers/auth.reducer';
import { initialState as systemState } from '../../../../redux/reducers/system.reducer';
import { initialState as graphicState } from '../../../../redux/reducers/graphic.reducer';
import { initialState as clientState } from '../../../../redux/reducers/client.reducer';

import RecommendationOverviewContainer from './RecommendationOverview.container';

const mockState = {
  material: authState,
  supplier: systemState,
  contact: graphicState,
  client: clientState
};

xdescribe('RecommendationOverviewContainer', () => {
  const setUp = () => {

    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/recommendation/overview'] }>
          <RecommendationOverviewContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  xtest('should render the RecommendationOverviewContainer screen', () => {
    const { container, getByText } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const irriCheckPulse = getByText('IrriCheck Pulse');
    expect(irriCheckPulse).toBeInTheDocument();
  });
});
