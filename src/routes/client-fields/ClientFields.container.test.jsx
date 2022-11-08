/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import { initialState as clientState } from '../../redux/reducers/client.reducer';

import { getMockStore } from '../../tools/testing/test.util';

import ClientFieldsContainer from './ClientFields.container';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({
    path: '/client'
  })
}));

const mockState = { client: clientState };

describe('Client Container', () => {
  const setUp = (path) => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ [path] }>
          <ClientFieldsContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render /client/clientName/groupName', () => {
    const { container } = setUp('/client/clientName/groupName');

    const ClientFieldsViewScreen = container.querySelector('.client-fields');
    expect(ClientFieldsViewScreen).toBeInTheDocument();
  });
});
