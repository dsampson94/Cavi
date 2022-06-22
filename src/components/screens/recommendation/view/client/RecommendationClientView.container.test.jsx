/* eslint-disable */
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { getMockStore } from '../../../../../tools/testing/test.util';
import { initialState as clientState } from '../../../../../redux/reducers/client.reducer';
import RecommendationClientViewContainer from './RecommendationClientView.container';

const mockState = { client: clientState };

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    groupName: 'mockGroupName',
    clientName: 'mockClientName'
  })
}));

xdescribe('RecommendationClientViewContainer', () => {
  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/recommendation/mockGroupName/mockClientName'] }>
          <RecommendationClientViewContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render/contain the RecommendationClientView screen', () => {
    const { container } = setUp();

    const recommendationClientViewScreen = container.querySelector('.recommendation-client-view');
    expect(recommendationClientViewScreen).toBeInTheDocument();
  });
});
