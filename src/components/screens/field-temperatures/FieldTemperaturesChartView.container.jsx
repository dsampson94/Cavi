import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import { retrieveUserLoginFromLocalStorage } from '../../../tools/storage/localStorage';
import { pushFieldRow, pushForecastRegionRow, pushLandGroupRow } from '../field/FieldChartView.container.util';
import { mapTemperatureLists, pushMappedTemperatureLists } from './FieldTemperaturesChartView.container.util';

import { requestClientFieldList } from '../../../redux/actions/client.action';
import { requestFieldChartList } from '../../../redux/actions/field.action';

import FieldTemperaturesChartView from './FieldTemperaturesChartView';

const FieldTemperaturesChartViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName, probeNumber } = useParams();

  const user = retrieveUserLoginFromLocalStorage();
  const fieldChartList = useSelector(createSelector([state => state.field], field => field?.chartList));
  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const [activeLoadPeriod, setActiveLoadPeriod] = useState('2 weeks');
  const [activeFieldName, setActiveFieldName] = useState(fieldName);

  useEffect(() => {
    dispatch(requestFieldChartList(fieldRequestFields));
    if (!fieldList) dispatch(requestClientFieldList(clientRequestFields));
    if (!fieldChartList) dispatch(requestFieldChartList(fieldRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(requestFieldChartList(fieldRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFieldName, activeLoadPeriod]);

  const clientRequestFields = {
    username: user?.username,
    password: user?.password,
    groupname: groupName,
    clientname: clientName
  };

  const fieldRequestFields = {
    username: user?.username,
    password: user?.password,
    groupname: groupName,
    clientname: clientName,
    field: activeFieldName,
    load: activeLoadPeriod
  };

  const mappedFieldList = () => {
    if (!fieldList) return;
    const tableList = [];
    const mappedList = [];

    for (let field in fieldList) tableList?.push(fieldList[field]);
    tableList.forEach((listItem, index) => {
      pushForecastRegionRow(tableList, listItem, index, mappedList);
      pushLandGroupRow(tableList, listItem, index, mappedList);
      pushFieldRow(tableList, listItem, index, mappedList);
    });
    return mappedList;
  };

  const mappedTemperaturesList = () => {
    if (!fieldChartList?.[probeNumber]) return;
    const mappedTemperaturesList = [], oneHundredMmList = [], twoHundredMmList = [], threeHundredMmList = [], fourHundredMmList = [],
      sixHundredMmList = [], eightHundredMmList = [];

    mapTemperatureLists(oneHundredMmList, twoHundredMmList, threeHundredMmList, fourHundredMmList,
      sixHundredMmList, eightHundredMmList, fieldChartList, probeNumber);
    pushMappedTemperatureLists(oneHundredMmList, twoHundredMmList, threeHundredMmList,
      fourHundredMmList, sixHundredMmList, eightHundredMmList, mappedTemperaturesList);
    return mappedTemperaturesList;
  };

  return <FieldTemperaturesChartView mappedFieldList={ mappedFieldList() }
                                     mappedTemperaturesList={ mappedTemperaturesList() }
                                     activeLoadPeriod={ activeLoadPeriod }
                                     setActiveLoadPeriod={ setActiveLoadPeriod }
                                     setActiveFieldName={ setActiveFieldName } />;
};

export default FieldTemperaturesChartViewContainer;
