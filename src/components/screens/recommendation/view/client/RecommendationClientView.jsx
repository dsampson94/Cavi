import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { toggleAllDropdowns, toggleDropdown, toggleDropdownAfterSearch } from './RecommendationClientView.util';
import { TableSearchBar, TableTopBar } from '../../../../common/table/recommendations/TableComponents.util';
import ContentContainer from '../../../../common/content-container/ContentContainer';
import Table from '../../../../common/table/recommendations/Table';

import './recommendation-client-view.scss';

const RecommendationClientView = ({ mappedFieldList, clientRequestFields, hasSubGroups }) => {

  const [activeTableData, setActiveTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [allDropdownsExpanded, setAllDropdownsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedDropdownObject, setSelectedDropdownObject] = useState(undefined);

  useEffect(() => {
      setActiveTableData(mappedFieldList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mappedFieldList]);

  useEffect(() => {
    if (!selectedIndex) return;
    if (filteredTableData) {
      toggleDropdownAfterSearch(mappedFieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData);
    } else {
      toggleDropdown(mappedFieldList, filteredTableData, selectedIndex, setActiveTableData);
    }
    setSelectedIndex(undefined);
  });

  useEffect(() => {
    toggleAllDropdowns(allDropdownsExpanded, mappedFieldList, activeTableData, setActiveTableData);
  }, [allDropdownsExpanded]);

  return (
    <ContentContainer clientRequestFields={ clientRequestFields }>
      <div className="recommendation-client-view">

        <TableTopBar filteredTableData={ filteredTableData }
                     hasSubGroups={ hasSubGroups }
                     setFilteredTableData={ setFilteredTableData }
                     setActiveTableData={ setActiveTableData }
                     clientRequestFields={ clientRequestFields }
                     toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) } />

        <TableSearchBar fieldList={ mappedFieldList }
                        setFilteredTableData={ setFilteredTableData } />

        <div className="recommendation-client-view__scroll">
          <Table tableName={ 'recommendationClientFieldView' }
                 activeTableData={ (filteredTableData) ? filteredTableData : activeTableData }
                 hiddenColumns={ ['expanded'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setSelectedDropdownObject={ setSelectedDropdownObject }
                 setActiveTableData={ setActiveTableData }
                 clientRequestFields={ clientRequestFields } />
        </div>
      </div>
    </ContentContainer>
  );
};

RecommendationClientView.defaultProps = {
  mappedFieldList: [],
  fieldRainData: undefined
};

RecommendationClientView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default RecommendationClientView;
