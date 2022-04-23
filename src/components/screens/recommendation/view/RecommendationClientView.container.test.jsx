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

import RecommendationClientViewContainer from './RecommendationClientView.container';

const mockState = {
  material: authState,
  supplier: systemState,
  contact: graphicState,
  client: clientState
};

xdescribe('RecommendationClientViewContainer', () => {
  const setUp = () => {

    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/recommendation/client'] }>
          <RecommendationClientViewContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  xtest('should render the RecommendationClientViewContainer screen', () => {
    const { container, getByText } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const midBar = container.querySelector('.mid-bar');
    expect(midBar).toBeInTheDocument();

    const table = container.querySelector('.table');
    expect(table).toBeInTheDocument();

    const text = getByText('Field Name');
    expect(text).toBeInTheDocument();
  });
});
