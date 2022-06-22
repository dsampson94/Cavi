/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as clientState } from '../../../redux/reducers/client.reducer';

import ContentContainer from './ContentContainer';
import RecommendationOverviewContainer from '../../screens/recommendation/overview/RecommendationOverview.container';

const mockState = { client: clientState };
const mockClientRequestFields = {
  username: 'username',
  password: 'password',
  groupname: 'groupname',
  clientname: 'clientname'
};

describe('ContentContainer', () => {

  const history = createMemoryHistory();

  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <ContentContainer children={ <RecommendationOverviewContainer /> }
                            clientRequestFields={ mockClientRequestFields } />
        </Router>
      </Provider>
    );
  };

  test('should render the ContentContainer', () => {
    const { container } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const topBar = container.querySelector('.top-bar');
    expect(topBar).toBeInTheDocument();

    const topBarLeftButtonBar = container.querySelector('.top-bar__lower-left');
    expect(topBarLeftButtonBar).toBeInTheDocument();

    const topBarRightButtonBar = container.querySelector('.top-bar__right');
    expect(topBarRightButtonBar).toBeInTheDocument();

    const sideBar = container.querySelector('.side-bar');
    expect(sideBar).toBeInTheDocument();

    const sideBarButton = container.querySelector('.side-bar__lower-button');
    expect(sideBarButton).toBeInTheDocument();
  });
});
