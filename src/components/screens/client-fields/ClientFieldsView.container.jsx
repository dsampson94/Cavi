import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';
import { formatDate } from '../../../tools/general/helpers.util';

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

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldWeatherList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherList?.data));
  const fieldWeatherObjectList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherObjectList?.data));
  const fieldWeatherDetailsList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherDetailsList?.data));
  const fieldWeatherFireSprayList = useSelector(createSelector([state => state.client], client => client?.fieldWeatherFireSprayList?.data));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  const [reloadToggleActive, setReloadToggleActive] = useState(false);
  const [activeWeatherStation, setActiveWeatherStation] = useState(undefined);
  const [activeDate, setActiveDate] = useState(new Date());
  const [activeDataPeriod, setActiveDataPeriod] = useState(28);

  const request = getRequestParams({ groupName, clientName });

  const subGroupList = [];

  function mappedWeatherList(obj) {
    if (!obj) return;
    return Object.entries(obj)?.map(([key, value]) => ({ key, value }));
  }

  useEffect(() => {
    dispatch(requestFullClientFieldList(request.clientParams));
    dispatch(requestClientFieldWeatherList(request.weatherParams1));
  }, [groupName, clientName, reloadToggleActive]);

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
                           setActiveDataPeriod={ setActiveDataPeriod } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
