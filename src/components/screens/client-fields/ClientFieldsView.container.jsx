import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';
import { formatDate, formatDateTime } from '../../../tools/general/helpers.util';

import {
  mapActualForecastWeatherPopupChartList,
  mapDailyDataList,
  mapDetailsList,
  mapETOWeatherPopupChartList,
  mapFieldTableList1,
  mapFireIndexList,
  mapHumidityWeatherPopupChartList,
  mappedCurrentDashboardData,
  mapRainfallList,
  mapRainWeatherPopupChartList,
  mapSprayConditionsList,
  mapWeatherList2,
  mapWindWeatherPopupChartList
} from './ClientFieldsView.container.util.js';

import {
  requestClientFieldWeatherDetailsList,
  requestClientFieldWeatherFireSprayList,
  requestClientFieldWeatherList,
  requestClientFieldWeatherObjectList,
  requestFullClientFieldList,
  setDetailsList3
} from '../../../redux/actions/client.action';

import { getRequestParams } from '../../../redux/endpoints';

import { requestActiveImage, requestFieldChartList, requestQuickViewList, requestSetFieldCapture } from '../../../redux/actions/field.action';

import { mapChartList } from '../field-charts/FieldChartsView.container.util';
import { TWO_WEEKS_LABEL } from '../../../tools/general/system-variables.util';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldWeatherList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherList?.data));
  const fieldWeatherObjectList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherObjectList?.data));
  const fieldWeatherFireSprayList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherFireSprayList?.data));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));
  const fieldChartList = useSelector(createSelector([state => state.field], field => field?.chartList));
  const fieldQuickViewList = useSelector(createSelector([state => state.field], field => field?.quickViewList?.data));
  const fieldActiveImage = useSelector(createSelector([state => state.field], field => field?.activeImage));

  const [reloadToggleActive, setReloadToggleActive] = useState(false);
  const [activeWeatherStation, setActiveWeatherStation] = useState(undefined);
  const [activeDate, setActiveDate] = useState(new Date());
  const [activeDataPeriod, setActiveDataPeriod] = useState(28);

  const [captureValue, setCaptureValue] = useState('');
  const [captureDate, setCaptureDate] = useState(new Date());
  const [captureType, setCaptureType] = useState('Irrigation');
  const [captureField, setCaptureField] = useState(undefined);

  const [selectedPhotoName, setSelectedPhotoName] = useState(undefined);
  const [photoClicked, setPhotoClicked] = useState(false);

  const [activeLoadPeriod, setActiveLoadPeriod] = useState(TWO_WEEKS_LABEL);
  const [activeFieldName, setActiveFieldName] = useState(undefined);
  const [activeFieldProbeNumber, setActiveFieldProbeNumber] = useState(undefined);

  const request = getRequestParams({ groupName, clientName });

  const subGroupList = [];

  function mappedWeatherList(obj) {
    if (obj) return Object.entries(obj)?.map(([key, value]) => ({ key, value }));
  }

  useEffect(() => {
    dispatch(requestFullClientFieldList(request.clientParams));
    dispatch(requestClientFieldWeatherList(request.weatherParams1));
  }, [groupName, clientName, reloadToggleActive]);

  useEffect(() => {
    dispatch(requestActiveImage({ ...request.clientParams, image: selectedPhotoName }));
  }, [selectedPhotoName, photoClicked]);

  useEffect(() => {
    if (activeFieldName) {
      dispatch(requestFieldChartList({
        ...request.clientParams,
        field: activeFieldName ? activeFieldName : null,
        load: activeLoadPeriod ? activeLoadPeriod : null
      }));
      dispatch(requestQuickViewList({
        ...request.clientParams,
        field: activeFieldName ? activeFieldName : null,
        quickviewtype: 'fieldsummary'
      }));
    }
  }, [activeFieldName, activeLoadPeriod]);

  useEffect(() => {
    if (activeWeatherStation) {
      dispatch(requestClientFieldWeatherDetailsList({
        ...request.clientParams,
        dash: 2,
        ws: activeWeatherStation,
        forDate: formatDate(activeDate)
      }));

      dispatch(requestClientFieldWeatherFireSprayList({
        ...request.clientParams,
        dash: 2,
        ws: activeWeatherStation,
        downloadspray: 1,
        forDate: formatDate(activeDate)
      }));

      dispatch(requestClientFieldWeatherObjectList({
        ...request.clientParams,
        dash: 2,
        ws: activeWeatherStation
      }));
    }
  }, [activeWeatherStation, activeDate]);

  const onWeatherObjectClick = (weatherObject) => {
    setActiveWeatherStation(weatherObject?.value?.wsnaam);
  };

  const onWeatherPopupDailyDataDetailClick = (date) => {
    setActiveDate(new Date(date));
    dispatch(setDetailsList3([]));
    dispatch(requestClientFieldWeatherDetailsList({
      ...request.clientParams,
      dash: 2,
      ws: activeWeatherStation,
      forDate: date
    }));
  };

  useEffect(() => {
    if (captureField, captureDate, captureValue, captureType) {
      dispatch(requestSetFieldCapture({
        ...request.clientParams,
        field: captureField,
        dte: formatDateTime(captureDate),
        text: captureValue,
        type: captureType
      }));
    }
  }, [captureType]);

  return <ClientFieldsView mappedFieldList={ mapFieldTableList1(fieldList, fieldRainData, subGroupList) }
                           mappedWeatherList1={ mappedWeatherList(fieldWeatherList?.stations) }
                           mappedWeatherList2={ mapWeatherList2(fieldWeatherObjectList) }
                           mappedRainfallList={ mapRainfallList(fieldWeatherObjectList) }
                           mappedDailyDataList={ mapDailyDataList(fieldWeatherObjectList)?.reverse() }
                           mappedETOWeatherPopupChartList={ mapETOWeatherPopupChartList(fieldWeatherObjectList, activeDataPeriod) }
                           mapActualForecastWeatherPopupChartList={ mapActualForecastWeatherPopupChartList(fieldWeatherObjectList, activeDataPeriod) }
                           mapHumidityWeatherPopupChartList={ mapHumidityWeatherPopupChartList(fieldWeatherObjectList, activeDataPeriod) }
                           mapWindWeatherPopupChartList={ mapWindWeatherPopupChartList(fieldWeatherObjectList, activeDataPeriod) }
                           mapRainWeatherPopupChartList={ mapRainWeatherPopupChartList(fieldWeatherObjectList, activeDataPeriod) }
                           onWeatherPopupDailyDataDetailClick={ onWeatherPopupDailyDataDetailClick }
                           mappedCurrentDashboardData={ mappedCurrentDashboardData(fieldWeatherObjectList) }
                           clientRequestParams={ request.clientParams }
                           reloadToggleActive={ reloadToggleActive }
                           setReloadToggleActive={ setReloadToggleActive }
                           hasSubGroups={ !!(subGroupList.includes(1)) }
                           onWeatherObjectClick={ onWeatherObjectClick }
                           mappedDetailsList={ mapDetailsList(fieldWeatherObjectList)?.reverse() }
                           activeDate={ activeDate }
                           setActiveDate={ setActiveDate }
                           mappedSprayConditionsList={ mapSprayConditionsList(fieldWeatherFireSprayList?.hourly) }
                           mappedFireDangerIndexList={ mapFireIndexList(fieldWeatherFireSprayList?.daily) }
                           activeDataPeriod={ activeDataPeriod }
                           setActiveDataPeriod={ setActiveDataPeriod }
                           captureValue={ captureValue }
                           setCaptureValue={ setCaptureValue }
                           captureType={ captureType }
                           setCaptureType={ setCaptureType }
                           captureDate={ captureDate }
                           setCaptureDate={ setCaptureDate }
                           captureField={ captureField }
                           setCaptureField={ setCaptureField }
                           mappedChartList={ mapChartList(fieldChartList, activeFieldProbeNumber) }
                           activeFieldProbeNumber={ activeFieldProbeNumber }
                           setActiveFieldProbeNumber={ setActiveFieldProbeNumber }
                           activeLoadPeriod={ activeLoadPeriod }
                           setActiveLoadPeriod={ setActiveLoadPeriod }
                           activeFieldName={ activeFieldName }
                           setActiveFieldName={ setActiveFieldName }
                           mappedQuickViewList={ fieldQuickViewList }
                           selectedPhotoName={ selectedPhotoName }
                           setSelectedPhotoName={ setSelectedPhotoName }
                           fieldActiveImage={ fieldActiveImage }
                           photoClicked={ photoClicked }
                           setPhotoClicked={ setPhotoClicked }
  />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
