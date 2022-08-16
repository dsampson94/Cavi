/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { getMockStore } from '../../../tools/testing/test.util';
import { initialState as clientState } from '../../../redux/reducers/client.reducer';

import FieldChartView from './FieldChartView';

const mockState = { client: clientState };
const mockHasSubGroups = true;
const mockClientRequestFields = {
  username: 'username',
  password: 'password',
  groupname: 'groupname',
  clientname: 'clientname'
};

describe('FieldChartView', () => {

  const history = createMemoryHistory();

  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <FieldChartView mappedFieldList={ [] }
                          clientRequestFields={ mockClientRequestFields }
                          hasSubGroups={ mockHasSubGroups } />
        </Router>
      </Provider>
    );
  };

  test('should render the FieldChartView screen', () => {
    const { container } = setUp();

    const contentContainer = container.querySelector('.content-container');
    expect(contentContainer).toBeInTheDocument();

    const chartContainer = container.querySelector('.field-chart');
    expect(chartContainer).toBeInTheDocument();

    const chartTopBar = container.querySelector('.field-chart__top-bar');
    expect(chartTopBar).toBeInTheDocument();

    const leftChartsContainer = container.querySelector('.field-chart__left');
    expect(leftChartsContainer).toBeInTheDocument();

    const rightChartsContainer = container.querySelector('.field-chart__right');
    expect(rightChartsContainer).toBeInTheDocument();
  });
});
