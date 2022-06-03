import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { toggleAllDropdowns, toggleDropdown, toggleDropdownAfterSearch } from './RecommendationClientView.util';
import { TableSearchBar, TableTopBar } from '../../../common/table/recommendations/TableComponents.util';
import ContentContainer from '../../../common/content-container/ContentContainer';
import Table from '../../../common/table/recommendations/Table';

import './recommendation-client-view.scss';

const RecommendationClientView = ({ fieldList, hasSubGroups, clientRequestFields }) => {

  const [activeTableData, setActiveTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [allDropdownsExpanded, setAllDropdownsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedDropdownObject, setSelectedDropdownObject] = useState(undefined);

  useEffect(() => {
      setActiveTableData(fieldList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fieldList]);

  useEffect(() => {
    if (!selectedIndex) return;
    if (filteredTableData) {
      toggleDropdownAfterSearch(fieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData);
    } else {
      toggleDropdown(fieldList, filteredTableData, selectedIndex, setActiveTableData);
    }
    setSelectedIndex(undefined);
  });

  useEffect(() => {
    toggleAllDropdowns(allDropdownsExpanded, fieldList, activeTableData, setActiveTableData);
  }, [allDropdownsExpanded]);

  return (
    <ContentContainer>
      <div className="recommendation-client-view">
        <TableTopBar filteredTableData={ filteredTableData }
                     hasSubGroups={ hasSubGroups }
                     setFilteredTableData={ setFilteredTableData }
                     setActiveTableData={ setActiveTableData }
                     clientRequestFields={ clientRequestFields }
                     toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) } />
        <TableSearchBar fieldList={ fieldList }
                        setFilteredTableData={ setFilteredTableData } />
        <div className="recommendation-client-view__scroll">
          <Table tableName={ 'recommendationClientFieldView' }
                 activeTableData={ (filteredTableData) ? filteredTableData : activeTableData }
                 hiddenColumns={ ['expanded'] }
                 setSelectedIndex={ setSelectedIndex }
                 setSelectedDropdownObject={ setSelectedDropdownObject }
                 setActiveTableData={ setActiveTableData } />
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
