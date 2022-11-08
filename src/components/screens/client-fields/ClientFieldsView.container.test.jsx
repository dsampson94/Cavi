/* eslint-disable */
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as clientState } from '../../../redux/reducers/client.reducer';

import ClientFieldsViewContainer from './ClientFieldsView.container';

const mockState = { client: clientState };

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    groupName: 'mockGroupName',
    clientName: 'mockClientName'
  })
}));

xdescribe('ClientFieldsViewContainer', () => {
  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/recommendation/mockGroupName/mockClientName'] }>
          <ClientFieldsViewContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render/contain the ClientFieldsView screen', () => {
    const { container } = setUp();

    const recommendationClientViewScreen = container.querySelector('.client-table-view');
    expect(recommendationClientViewScreen).toBeInTheDocument();
  });
});
