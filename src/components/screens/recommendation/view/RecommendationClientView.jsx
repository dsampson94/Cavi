import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';
import { tableTemplateData } from '../../../common/table/table-functions.util';
import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  DROPDOWN_ALL,
  PREVIOUS,
  PREVIOUS_RECOMMENDATIONS
} from '../../../../tools/general/system-variables.util';
import { retrieveLastSelectedUserFromLocalStorage } from '../../../../tools/storage/localStorage';

import ContentContainer from '../../../common/content-container/ContentContainer';
import Table from '../../../common/table/Table';
import TableSearch from '../../../common/table-search/TableSearch';
import Button from '../../../common/button/Button';

import './recommendation-client-view.scss';

const RecommendationClientView = ({ fieldList }) => {

  const activeUser = retrieveLastSelectedUserFromLocalStorage();

  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [allDropdownsExpanded, setAllDropdownsExpanded] = useState(false);

  useEffect(() => {
    setFilteredTableData(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldList]);

  const allDropdownsToggle = () => {
    setAllDropdownsExpanded(!allDropdownsExpanded);
  };

  const TableTopBar = () => {
    return (
      <div className="recommendation-client-view__topbar">
        <div className="recommendation-client-view__topbar-left">
          <div className="recommendation-client-view__topbar-left-button">
            <Button icon={ DROPDOWN_ALL } onClick={ allDropdownsToggle } />
          </div>
          <p>{ `Recommendations: ${ activeUser?.groupName?.toUpperCase() } -
            ${ activeUser?.clientName?.toUpperCase() }` }</p>
        </div>
        <div className="recommendation-client-view__topbar-right">
          <Button icon={ BULLSEYE }
                  iconFill={ '#C24C41' }
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
                  onClick={ () => {
                    setFilteredTableData(undefined);
                  } }
                  spaced />
        </div>
      </div>
    );
  };

  const TableSearchBar = () => {
    return (
      <div className="recommendation-client-view__search">
        { (fieldList.length > 10) &&
          <TableSearch placeholder={ 'Search field or probe number' }
                       dataToFilter={ (filteredTableData) ? filteredTableData : fieldList }
                       setFilteredData={ setFilteredTableData } table /> }
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
                 tableData={ (filteredTableData) ? filteredTableData : fieldList }
                 hiddenColumns={ ['expanded'] }
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
