/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { noOp } from '../../../../tools/general/helpers.util';

import { getMockStore } from '../../../../tools/testing/test.util';
import { initialState as clientState } from '../../../../redux/reducers/client.reducer';

import RecommendationOverview from './RecommendationOverview';

const mockState = { client: clientState };

describe('RecommendationOverview', () => {

  const history = createMemoryHistory();

  const setUp = () => {
    return render(
      <Provider store={ getMockStore(mockState) }>
        <Router history={ history }>
          <RecommendationOverview ownClientsList={ [] }
                                  overviewOptionSelected={ 1 }
                                  setOverviewOptionSelected={ noOp() }
                                  activePath={ '/recommendation/overview' } />
        </Router>
      </Provider>
    );
  };

  test('should render the RecommendationOverview screen', () => {
      const { container } = setUp();

      const contentContainer = container.querySelector('.content-container');
      expect(contentContainer).toBeInTheDocument();

      const overviewMidBar = container.querySelector('.mid-bar');
      expect(overviewMidBar).toBeInTheDocument();

      const overviewHeaderBar = container.querySelector('.recommendation-overview__top-button');
      expect(overviewHeaderBar).toBeInTheDocument();

      const overviewSearchBar = container.querySelector('.search');
      expect(overviewSearchBar).toBeInTheDocument();

      const overviewList = container.querySelector('.recommendation-overview__list');
      const overviewMenu = container.querySelector('.recommendation-overview__menu');
      expect(overviewList || overviewMenu).toBeInTheDocument();
    }
  );
});
