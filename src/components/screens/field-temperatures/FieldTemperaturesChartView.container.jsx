import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import { mapFieldList } from '../field-charts/FieldChartsView.container.util';
import { mapTemperaturesList } from './FieldTemperaturesChartView.container.util';

import { requestClientFieldList } from '../../../redux/actions/client.action';
import { requestExtendedFieldChartList, SET_SOIL_TEMP_LIST } from '../../../redux/actions/field.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldTemperaturesChartView from './FieldTemperaturesChartView';

const FieldTemperaturesChartViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName, probeNumber } = useParams();

  const decodedGroupName = decodeURIComponent(groupName);
  const decodedClientName = decodeURIComponent(clientName);
  const decodedFieldName = decodeURIComponent(fieldName);

  const soilTempList = useSelector(createSelector([state => state.field], field => field?.soilTempList));
  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const [activeLoadPeriod, setActiveLoadPeriod] = useState('2 weeks');
  const [activeFieldName, setActiveFieldName] = useState(decodedFieldName);

  const request = getRequestParams({ groupName: decodedGroupName, clientName: decodedClientName, activeFieldName, activeLoadPeriod });

  useEffect(() => {
    dispatch(requestClientFieldList(request.clientParams));
  }, []);

  useEffect(() => {
    dispatch(requestExtendedFieldChartList(request.soilTempParams, SET_SOIL_TEMP_LIST));
  }, [activeFieldName]);

  const mappedFieldList = () => {
    return mapFieldList(fieldList);
  };

  const mappedTemperaturesList = () => {
    return mapTemperaturesList(soilTempList, probeNumber, activeLoadPeriod, dispatch);
  };

  return <FieldTemperaturesChartView mappedFieldList={ mappedFieldList() }
                                     mappedTemperaturesList={ mappedTemperaturesList() }
                                     activeLoadPeriod={ activeLoadPeriod }
                                     setActiveLoadPeriod={ setActiveLoadPeriod }
                                     setActiveFieldName={ setActiveFieldName } />;
};

export default FieldTemperaturesChartViewContainer;
