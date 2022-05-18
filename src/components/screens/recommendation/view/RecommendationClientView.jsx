import React from 'react';

import { arrayOf, shape } from 'prop-types';
import { tableTemplateData } from '../../../common/table/table-functions.util';
import { ACCURACY_ANALYSIS, BULLSEYE, PREVIOUS, PREVIOUS_RECOMMENDATIONS } from '../../../../tools/general/system-variables.util';
import { retrieveLastSelectedUserFromLocalStorage } from '../../../../tools/storage/localStorage';

import ContentContainer from '../../../common/content-container/ContentContainer';
import Table from '../../../common/table/Table';
import TableSearch from '../../../common/table-search/TableSearch';
import Button from '../../../common/button/Button';

import './recommendation-client-view.scss';

const RecommendationClientView = ({ fieldList, fieldRainData }) => {

  const activeUser = retrieveLastSelectedUserFromLocalStorage();

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

  const TableTopBar = () => {
    return (
      <div className="recommendation-client-view__topbar">
        <div className="recommendation-client-view__topbar-left">
          <p>{ `Recommendations: ${ activeUser?.groupName?.toUpperCase() } -
            ${ activeUser?.clientName?.toUpperCase() }` }</p>
        </div>
        <div className="recommendation-client-view__topbar-right">
          <Button icon={ BULLSEYE }
                  iconFill={'#C24C41'}
                  tooltip={ ACCURACY_ANALYSIS }
                  spaced />
          <Button label={ 'Reports' }
                  spaced />
          <Button icon={ PREVIOUS }
                  tooltip={ PREVIOUS_RECOMMENDATIONS }
                  spaced />
          <Button label={ 'Show Archives' }
                  spaced />
          <Button label={ 'Reload Recommendations' }
                  spaced />
        </div>
      </div>
    );
  };

  const TableSearchBar = () => {
    return (
      <div className="recommendation-client-view__search">
        <TableSearch placeholder={ 'Search field or probe number' } />
      </div>
    );
  };

  return (
    <ContentContainer>
      <div className="recommendation-client-view">
        <TableTopBar />
        <TableSearchBar />
        <div className="recommendation-client-view__scroll">
          <Table tableName={ 'recommendationClientFieldView' }
                 tableData={ fieldList }
                 hiddenColumns={ ['id', '30dL', 'TotalL'].concat(getHiddenDateColumns()) }
                 tableDataTemplate={ tableTemplateData } />
        </div>
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
