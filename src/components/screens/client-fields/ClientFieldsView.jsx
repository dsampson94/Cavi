import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { CLIENT_FIELDS, CLIENT_RECOMMENDATION_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';
import { toggleAllDropdowns, toggleDropdown, toggleDropdownAfterSearch } from './ClientFieldsView.util';
import { TableSearchBar } from '../../common/table/TableComponents.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import Table from '../../common/table/Table';

import './client-fields-view.scss';

const ClientFieldsView = ({ mappedFieldList, clientRequestParams, hasSubGroups, reloadToggleActive, setReloadToggleActive }) => {

  const [showClientsSideBar, setClientsShowSideBar] = useState(true);
  const [activeTableData, setActiveTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [allDropdownsExpanded, setAllDropdownsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedDropdownObject, setSelectedDropdownObject] = useState(undefined);

  useEffect(() => {
    setActiveTableData(mappedFieldList);
  }, [mappedFieldList]);

  useEffect(() => {
    if (!selectedIndex) return;
    if (filteredTableData) toggleDropdownAfterSearch(mappedFieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData);
    else toggleDropdown(mappedFieldList, filteredTableData, selectedIndex, setActiveTableData);

    setSelectedIndex(undefined);
  });

  useEffect(() => {
    toggleAllDropdowns(allDropdownsExpanded, mappedFieldList, activeTableData, setActiveTableData);
  }, [allDropdownsExpanded]);

  return (
    <ContentContainer view={ CLIENT_FIELDS }
                      clientRequestParams={ clientRequestParams }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setClientsShowSideBar }
                      mappedFieldList={ mappedFieldList }>

      <div className={ getClassNames('client-fields', { show: showClientsSideBar }) }>

        {/*<MidBar view={ CLIENT_FIELDS_MIDBAR }*/ }
        {/*        filteredTableData={ filteredTableData }*/ }
        {/*        hasSubGroups={ hasSubGroups }*/ }
        {/*        showClientsSideBar={ showClientsSideBar }*/ }
        {/*        setFilteredTableData={ setFilteredTableData }*/ }
        {/*        setActiveTableData={ setActiveTableData }*/ }
        {/*        toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) }*/ }
        {/*        reloadToggleActive={ reloadToggleActive }*/ }
        {/*        setReloadToggleActive={ setReloadToggleActive } />*/ }

        <TableSearchBar mappedFieldList={ mappedFieldList }
                        setFilteredTableData={ setFilteredTableData } />

        <div className="client-fields__scroll">
          <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
                 activeTableData={ (filteredTableData) ? filteredTableData : activeTableData }
                 hiddenColumns={ ['expanded'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setSelectedDropdownObject={ setSelectedDropdownObject }
                 setActiveTableData={ setActiveTableData }
                 toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) } />
        </div>

      </div>
    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
