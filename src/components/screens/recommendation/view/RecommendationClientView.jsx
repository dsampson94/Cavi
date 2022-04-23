import React from 'react';

import { arrayOf, shape } from 'prop-types';
import { tableTemplateData } from '../../../common/table/table-functions.util';

import ContentContainer from '../../../common/content-container/ContentContainer';
import Table from '../../../common/table/Table';

import './recommendation-client-view.scss';

const RecommendationClientView = ({ fieldList, fieldRainData }) => {

  const getHiddenDateColumns = () => {
    const columnList = [];
    if (fieldRainData) {
      let KeyOne = Object.keys(fieldRainData)[0];
      columnList.push(`${ KeyOne }L`);
      let KeyTwo = Object.keys(fieldRainData)[1];
      columnList.push(`${ KeyTwo }L`);
      let KeyThree = Object.keys(fieldRainData)[2];
      columnList.push(`${ KeyThree }L`);
      let KeyFour = Object.keys(fieldRainData)[3];
      columnList.push(`${ KeyFour }L`);
      return columnList;
    } else {
      return columnList;
    }
  };

  return (
    <ContentContainer>
      <div className="recommendation-client-view">
        <Table tableName={ 'recommendationClientFieldView' }
               tableData={ fieldList }
               hiddenColumns={ ['id', '30dL', 'TotalL'].concat(getHiddenDateColumns()) }
               tableDataTemplate={ tableTemplateData } />
      </div>
    </ContentContainer>
  );
};

RecommendationClientView.defaultProps = {
  fieldList: [],
  fieldRainData: undefined
};

RecommendationClientView.propTypes = {
  fieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default RecommendationClientView;
