/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as clientState } from '../../../redux/reducers/client.reducer';

import ContentContainer from './ContentContainer';
import OverviewContainer from '../../screens/dashboard/overview/DashboardOverview.container';
import { CLIENT_FIELDS } from '../../../tools/general/system-variables.util';

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
        <MemoryRouter history={ history }>
          <ContentContainer children={ <OverviewContainer /> }
                            view={ CLIENT_FIELDS }
                            setShowClientsSideBar={ true }
                            clientRequestFields={ mockClientRequestFields } />
        </MemoryRouter>
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
