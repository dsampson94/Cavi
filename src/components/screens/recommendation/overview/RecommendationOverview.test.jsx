/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import RecommendationClientView from '../view/RecommendationClientView';
import { mockTableData } from '../../../common/table/table-functions.util';

xdescribe('RecommendationClientView', () => {

  const setUp = () => {
    return render(
      <RecommendationClientView fieldList={ mockTableData } />
    );
  };

  xtest('should render the RecommendationClientView screen', () => {
    const { container } = setUp();

    const contactDetails = container.querySelector('.content-container');
    expect(contactDetails).toBeInTheDocument();

    const midBar = container.querySelector('.mid-bar');
    expect(midBar).toBeInTheDocument();

    const table = container.querySelector('.table');
    expect(table).toBeInTheDocument();
  });
});
