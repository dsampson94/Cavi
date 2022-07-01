/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as clientState } from '../../../redux/reducers/client.reducer';

import ClientFieldsView from './ClientFieldsView';

const mockState = { client: clientState };
const mockHasSubGroups = true;
const mockClientRequestFields = {
  username: 'username',
  password: 'password',
  groupname: 'groupname',
  clientname: 'clientname'
};

describe('ClientFieldsView', () => {

  const history = createMemoryHistory();

  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <ClientFieldsView mappedFieldList={ [] }
                            clientRequestFields={ mockClientRequestFields }
                            hasSubGroups={ mockHasSubGroups } />
        </Router>
      </Provider>
    );
  };

  test('should render the ClientFieldsView screen', () => {
    const { container } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const tableTopBar = container.querySelector('.client-fields__top-bar');
    expect(tableTopBar).toBeInTheDocument();

    const tableSearchBar = container.querySelector('.client-fields__search');
    expect(tableSearchBar).toBeInTheDocument();

    const table = container.querySelector('.table');
    expect(table).toBeInTheDocument();

    const tableHeader = container.querySelector('.table__header');
    expect(tableHeader).toBeInTheDocument();

    const tableBody = container.querySelector('.table__body');
    expect(tableBody).toBeInTheDocument();
  });
});
