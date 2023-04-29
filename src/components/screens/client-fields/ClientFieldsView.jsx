import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { CLIENT_FIELDS, CLIENT_RECOMMENDATION_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';
import { toggleAllDropdowns, toggleCapture, toggleDropdown, toggleDropdownAfterSearch } from './ClientFieldsView.util';
import { TableSearchBar } from '../../common/table/components/TableSearchBar';

import ContentContainer from '../../common/content-container/ContentContainer';
import { Popup } from '../../common/bottom-popup/Popup';
import { ClientFieldsTable } from '../../common/table/ClientFieldsTable';
import { QuickView } from '../../common/quick-view/QuickView';

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
                            mapRainWeatherPopupChartList,
                            onWeatherPopupDailyDataDetailClick,
                            mappedDetailsList,
                            activeDate,
                            setActiveDate,
                            mappedCurrentDashboardData,
                            mappedSprayConditionsList,
                            mappedFireDangerIndexList,
                            activeDataPeriod,
                            setActiveDataPeriod,
                            captureType,
                            setCaptureType,
                            captureValue,
                            setCaptureValue,
                            captureDate,
                            setCaptureDate,
                            captureField,
                            setCaptureField,
                            mappedChartList,
                            activeLoadPeriod,
                            setActiveLoadPeriod,
                            activeFieldName,
                            setActiveFieldName,
                            activeFieldProbeNumber,
                            setActiveFieldProbeNumber,
                            mappedQuickViewList
                          }) => {

  const [showClientsSideBar, setClientsShowSideBar] = useState(true);
  const [activeTableData, setActiveTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [allDropdownsExpanded, setAllDropdownsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [selectedDropdownObject, setSelectedDropdownObject] = useState(undefined);
  const [selectedCaptureObject, setSelectedCaptureObject] = useState(undefined);
  const [quickViewIsOpen, setQuickViewIsOpen] = useState(false);
  const [rowClickId, setRowClickId] = useState('');

  useEffect(() => {
    setActiveTableData(mappedFieldList);
  }, [mappedFieldList]);

  useEffect(() => {
    if (selectedIndex && selectedDropdownObject) {
      if (filteredTableData) toggleDropdownAfterSearch(mappedFieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData);
      else toggleDropdown(mappedFieldList, filteredTableData, selectedIndex, setActiveTableData);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex && selectedCaptureObject) {
      toggleCapture(activeTableData, filteredTableData, selectedCaptureObject, selectedIndex, setActiveTableData);
    }
  }, [rowClickId]);

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
                             setSelectedCaptureObject={ setSelectedCaptureObject }
                             setActiveTableData={ setActiveTableData }
                             toggleDropdowns={ () => setAllDropdownsExpanded(!allDropdownsExpanded) }
                             captureDate={ captureDate }
                             setCaptureDate={ setCaptureDate }
                             captureValue={ captureValue }
                             setCaptureValue={ setCaptureValue }
                             captureType={ captureType }
                             setCaptureType={ setCaptureType }
                             captureField={ captureField }
                             setCaptureField={ setCaptureField }
                             mappedChartList={ mappedChartList }
                             activeLoadPeriod={ activeLoadPeriod }
                             setActiveLoadPeriod={ setActiveLoadPeriod }
                             setActiveFieldName={ setActiveFieldName }
                             activeFieldProbeNumber={ activeFieldProbeNumber }
                             setActiveFieldProbeNumber={ setActiveFieldProbeNumber }
                             quickViewIsOpen={ quickViewIsOpen }
                             setQuickViewIsOpen={ setQuickViewIsOpen }
                             setRowClickId={ setRowClickId } />
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
               mapRainWeatherPopupChartList={ mapRainWeatherPopupChartList }
               onWeatherPopupDailyDataDetailClick={ onWeatherPopupDailyDataDetailClick }
               mappedDetailsList={ mappedDetailsList }
               activeDate={ activeDate }
               setActiveDate={ setActiveDate }
               mappedCurrentDashboardData={ mappedCurrentDashboardData }
               mappedSprayConditionsList={ mappedSprayConditionsList }
               mappedFireDangerIndexList={ mappedFireDangerIndexList }
               activeDataPeriod={ activeDataPeriod }
               setActiveDataPeriod={ setActiveDataPeriod } /> }


        <QuickView mappedChartList={ mappedChartList }
                   quickViewIsOpen={ quickViewIsOpen }
                   setQuickViewIsOpen={ setQuickViewIsOpen }
                   activeLoadPeriod={ activeLoadPeriod }
                   setActiveLoadPeriod={ setActiveLoadPeriod }
                   activeFieldName={ activeFieldName }
                   setActiveFieldName={ setActiveFieldName }
                   mappedQuickViewList={ mappedQuickViewList } />
      </div>
    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
