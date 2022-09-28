import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { CLIENT_FIELDS, CLIENT_FIELDS_MIDBAR } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';
import { toggleAllDropdowns, toggleDropdown, toggleDropdownAfterSearch } from './ClientFieldsView.util';
import { TableSearchBar } from '../../common/table/client-fields/TableComponents.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';
import Table from '../../common/table/client-fields/Table';

import './client-fields-view.scss';

const ClientFieldsView = ({ mappedFieldList, clientRequestFields, hasSubGroups, reloadToggleActive, setReloadToggleActive }) => {

  const [showClientsSideBar, setClientsShowSideBar] = useState(true);
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
    <ContentContainer view={ CLIENT_FIELDS }
                      clientRequestFields={ clientRequestFields }
                      showClientsSideBar={ showClientsSideBar }
                      setShowClientsSideBar={ setClientsShowSideBar }
                      mappedFieldList={ mappedFieldList }>
      <div className={ getClassNames('client-fields', { show: showClientsSideBar }) }>

        <MidBar view={ CLIENT_FIELDS_MIDBAR }
                filteredTableData={ filteredTableData }
                hasSubGroups={ hasSubGroups }
                showClientsSideBar={ showClientsSideBar }
                setFilteredTableData={ setFilteredTableData }
                setActiveTableData={ setActiveTableData }
                clientRequestFields={ clientRequestFields }
                toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) }
                reloadToggleActive={ reloadToggleActive }
                setReloadToggleActive={ setReloadToggleActive } />

        <TableSearchBar mappedFieldList={ mappedFieldList }
                        setFilteredTableData={ setFilteredTableData } />

        <div className="client-fields__scroll">
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

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
