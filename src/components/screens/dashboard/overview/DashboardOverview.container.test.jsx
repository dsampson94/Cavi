/* eslint-disable */
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import {
  FIELD_UP_TO_DATE_QUESTION,
  FIELDS_LAST_VIEWED_QUESTION,
  FIELDS_MOISTURE_QUESTION
} from '../../../../tools/general/system-variables.util';

import { getMockStore } from '../../../../tools/testing/test.util';
import { initialState as clientState } from '../../../../redux/reducers/client.reducer';

import OverviewContainer from './DashboardOverview.container';

const mockClientActions = require('../../../../redux/actions/client.action');
const mockState = { client: clientState };

describe('OverviewContainer', () => {
  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <MemoryRouter initialEntries={ ['/recommendation/overview'] }>
          <OverviewContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  test('should render/contain the DashboardOverview screen', () => {
    const { container } = setUp();

    const recommendationOverviewScreen = container.querySelector('.fields-overview');
    expect(recommendationOverviewScreen).toBeInTheDocument();
  });

  test('should dispatch requestClientOverviewList action on option click', () => {
    const spy = jest.spyOn(mockClientActions, 'requestClientOverviewList');
    const { container, getByText } = setUp();

    const optionButton = container.querySelector('.fields-overview__top-button');
    expect(optionButton).toBeInTheDocument();

    const overviewTextOne = getByText(FIELDS_LAST_VIEWED_QUESTION);
    expect(overviewTextOne).toBeInTheDocument();

    fireEvent.click(optionButton);
    expect(overviewTextOne).toBeInTheDocument();

    const overviewTextTwo = getByText(FIELDS_MOISTURE_QUESTION);
    expect(overviewTextTwo).toBeInTheDocument();

    const overviewTextThree = getByText(FIELD_UP_TO_DATE_QUESTION);
    expect(overviewTextThree).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();
  });
});
