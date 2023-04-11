import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { CLIENT_FIELDS, CLIENT_RECOMMENDATION_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';
import { toggleAllDropdowns, toggleDropdown, toggleDropdownAfterSearch } from './ClientFieldsView.util';
import { TableSearchBar } from '../../common/table/TableComponents.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import { Popup } from '../../common/bottom-popup/Popup';
import { ClientFieldsTable } from '../../common/table/ClientFieldsTable';

import './client-fields-view.scss';

const ClientFieldsView = ({
                            mappedFieldList,
                            mappedWeatherList1,
                            mappedWeatherList2,
                            mappedRainfallList,
                            mappedDailyDataList,
                            clientRequestParams,
                            hasSubGroups,
                            reloadToggleActive,
                            setReloadToggleActive,
                            onUnitClick,
                            onWeatherObjectClick,
                            mappedETOWeatherPopupChartList,
                            mapActualForecastWeatherPopupChartList,
                            mapHumidityWeatherPopupChartList,
                            mapWindWeatherPopupChartList,
                            mapRainWeatherPopupChartList
                          }) => {

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

        <TableSearchBar mappedFieldList={ mappedFieldList }
                        setFilteredTableData={ setFilteredTableData } />

        <div className="client-fields__scroll">
          <ClientFieldsTable tableName={ CLIENT_RECOMMENDATION_VIEW }
                             activeTableData={ (filteredTableData) ? filteredTableData : activeTableData }
                             hiddenColumns={ ['expanded'] }
                             selectedIndex={ selectedIndex }
                             setSelectedIndex={ setSelectedIndex }
                             setSelectedDropdownObject={ setSelectedDropdownObject }
                             setActiveTableData={ setActiveTableData }
                             toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) } />
        </div>

        { !isEmpty(mappedWeatherList1) &&
        <Popup mappedWeatherList1={ mappedWeatherList1 }
               mappedWeatherList2={ mappedWeatherList2 }
               mappedDailyDataList={ mappedDailyDataList }
               mappedRainfallList={ mappedRainfallList }
               onUnitClick={ onUnitClick }
               onWeatherObjectClick={ onWeatherObjectClick }
               mappedETOWeatherPopupChartList={ mappedETOWeatherPopupChartList }
               mapActualForecastWeatherPopupChartList={ mapActualForecastWeatherPopupChartList }
               mapHumidityWeatherPopupChartList={ mapHumidityWeatherPopupChartList }
               mapWindWeatherPopupChartList={ mapWindWeatherPopupChartList }
               mapRainWeatherPopupChartList={ mapRainWeatherPopupChartList } /> }
      </div>
    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
