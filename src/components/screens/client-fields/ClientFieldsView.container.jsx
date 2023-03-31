import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import { mapFieldTableList1, mapWeatherList2 } from './ClientFieldsView.container.util.js';
import { requestClientFieldWeatherList, requestFullClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldWeatherList1 = useSelector(createSelector([state => state.client], client => client?.weatherList1?.data));
  const fieldWeatherList2 = useSelector(createSelector([state => state.client], client => client?.weatherList2?.data));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  const [reloadToggleActive, setReloadToggleActive] = useState(false);

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

  const onUnitClick = () => {
  };

  const onWeatherObjectClick = (weatherObject) => {
    dispatch(requestClientFieldWeatherList({
      ...request.clientParams,
      dash: 2,
      ws: weatherObject?.value?.wsnaam
    }));
  };

  const mappedFieldTableList1 = () => {
    return mapFieldTableList1(fieldList, fieldRainData, subGroupList);
  };

  return <ClientFieldsView mappedFieldList={ mappedFieldTableList1() }
                           mappedWeatherList1={ mappedWeatherList(fieldWeatherList1?.stations) }
                           mappedWeatherList2={ mapWeatherList2(fieldWeatherList2) }
                           clientRequestParams={ request.clientParams }
                           reloadToggleActive={ reloadToggleActive }
                           setReloadToggleActive={ setReloadToggleActive }
                           hasSubGroups={ !!(subGroupList.includes(1)) }
                           onUnitClick={ onUnitClick }
                           onWeatherObjectClick={ onWeatherObjectClick } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
