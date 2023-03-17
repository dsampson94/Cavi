import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import { mapFieldTableList } from './ClientFieldsView.container.util.js';
import { requestClientFieldWeatherList, requestFullClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldWeatherList = useSelector(createSelector([state => state.client], client => client?.weatherList?.data));
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
    dispatch(requestClientFieldWeatherList(request.weatherParams));
  }, [groupName, clientName, reloadToggleActive]);

  const mappedFieldTableList = () => {
    return mapFieldTableList(fieldList, fieldRainData, subGroupList);
  };

  return <ClientFieldsView mappedFieldList={ mappedFieldTableList() }
                           mappedWeatherList={ mappedWeatherList(fieldWeatherList?.stations) }
                           clientRequestParams={ request.clientParams }
                           reloadToggleActive={ reloadToggleActive }
                           setReloadToggleActive={ setReloadToggleActive }
                           hasSubGroups={ !!(subGroupList.includes(1)) } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
