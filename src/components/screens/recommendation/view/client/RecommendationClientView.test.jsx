/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { getMockStore } from '../../../../../tools/testing/test.util';
import { initialState as clientState } from '../../../../../redux/reducers/client.reducer';

import RecommendationClientView from './RecommendationClientView';

const mockState = { client: clientState };
const mockHasSubGroups = true;
const mockClientRequestFields = {
  username: 'username',
  password: 'password',
  groupname: 'groupname',
  clientname: 'clientname'
};

describe('RecommendationClientView', () => {

  const history = createMemoryHistory();

  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <RecommendationClientView mappedFieldList={ [] }
                                    clientRequestFields={ mockClientRequestFields }
                                    hasSubGroups={ mockHasSubGroups } />
        </Router>
      </Provider>
    );
  };

  test('should render the RecommendationClientView screen', () => {
    const { container } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const tableTopBar = container.querySelector('.recommendation-client-view__topbar');
    expect(tableTopBar).toBeInTheDocument();

    const tableSearchBar = container.querySelector('.recommendation-client-view__search');
    expect(tableSearchBar).toBeInTheDocument();

    const table = container.querySelector('.table');
    expect(table).toBeInTheDocument();

    const tableHeader = container.querySelector('.table__header');
    expect(tableHeader).toBeInTheDocument();

    const tableBody = container.querySelector('.table__body');
    expect(tableBody).toBeInTheDocument();
  });
});
