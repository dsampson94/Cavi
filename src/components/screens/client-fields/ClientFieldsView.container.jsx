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
import { requestClientFieldWeatherList, requestFullClientFieldList, setDetailsList3 } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldWeatherList1 = useSelector(createSelector([state => state.client], client => client?.weatherList1?.data));
  const fieldWeatherList2 = useSelector(createSelector([state => state.client], client => client?.weatherList2?.data));
  const fieldWeatherList3 = useSelector(createSelector([state => state.client], client => client?.weatherList3?.data));
  const fieldWeatherList4 = useSelector(createSelector([state => state.client], client => client?.weatherList4?.data));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  const [reloadToggleActive, setReloadToggleActive] = useState(false);
  const [activeWeatherStation, setActiveWeatherStation] = useState(undefined);
  const [activeDate, setActiveDate] = useState(new Date());

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
      dispatch(requestClientFieldWeatherList({
        ...request.clientParams,
        dash: 2,
        ws: activeWeatherStation,
        forDate: formatDate(activeDate),
        requestOption: 3
      }));

      dispatch(requestClientFieldWeatherList({
        ...request.clientParams,
        dash: 2,
        ws: activeWeatherStation,
        downloadspray: 1,
        forDate: formatDate(activeDate),
        requestOption: 4
      }));

      if (!fieldWeatherList2) {
        dispatch(requestClientFieldWeatherList({
          ...request.clientParams,
          dash: 2,
          ws: activeWeatherStation,
          requestOption: 2
        }));
      }
    }
  }, [activeWeatherStation, activeDate]);

  const onUnitClick = () => {
  };

  const onWeatherObjectClick = (weatherObject) => {
    setActiveWeatherStation(weatherObject?.value?.wsnaam);
    dispatch(requestClientFieldWeatherList({
      ...request.clientParams,
      dash: 2,
      ws: weatherObject?.value?.wsnaam,
      requestOption: 2
    }));
  };

  const onWeatherPopupDailyDataDetailClick = (date) => {
    setActiveDate(new Date(date));
    dispatch(setDetailsList3([]));
    dispatch(requestClientFieldWeatherList({
      ...request.clientParams,
      dash: 2,
      ws: activeWeatherStation,
      forDate: date,
      requestOption: 3
    }));
  };

  return <ClientFieldsView mappedFieldList={ mapFieldTableList1(fieldList, fieldRainData, subGroupList) }
                           mappedWeatherList1={ mappedWeatherList(fieldWeatherList1?.stations) }
                           mappedWeatherList2={ mapWeatherList2(fieldWeatherList2) }
                           mappedRainfallList={ mapRainfallList(fieldWeatherList2) }
                           mappedDailyDataList={ mapDailyDataList(fieldWeatherList2)?.reverse() }
                           mappedETOWeatherPopupChartList={ mapETOWeatherPopupChartList(fieldWeatherList2) }
                           mapActualForecastWeatherPopupChartList={ mapActualForecastWeatherPopupChartList(fieldWeatherList2) }
                           mapHumidityWeatherPopupChartList={ mapHumidityWeatherPopupChartList(fieldWeatherList2) }
                           mapWindWeatherPopupChartList={ mapWindWeatherPopupChartList(fieldWeatherList2) }
                           mapRainWeatherPopupChartList={ mapRainWeatherPopupChartList(fieldWeatherList2) }
                           onWeatherPopupDailyDataDetailClick={ onWeatherPopupDailyDataDetailClick }
                           mappedCurrentDashboardData={ mappedCurrentDashboardData(fieldWeatherList2) }
                           clientRequestParams={ request.clientParams }
                           reloadToggleActive={ reloadToggleActive }
                           setReloadToggleActive={ setReloadToggleActive }
                           hasSubGroups={ !!(subGroupList.includes(1)) }
                           onUnitClick={ onUnitClick }
                           onWeatherObjectClick={ onWeatherObjectClick }
                           mappedDetailsList={ mapDetailsList(fieldWeatherList2)?.reverse() }
                           activeDate={ activeDate }
                           setActiveDate={ setActiveDate }
                           mappedSprayConditionsList={ mapSprayConditionsList(fieldWeatherList4) }
                           mappedFireDangerIndexList={ mapFireIndexList(fieldWeatherList4) } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
