/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import RecommendationClientView from '../view/client/RecommendationClientView';
import { mockTableData } from '../../../common/table/recommendations/TableFunctions.util';

xdescribe('RecommendationClientView', () => {

  const setUp = () => {
    return render(
      <RecommendationClientView mappedFieldList={ mockTableData } />
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
