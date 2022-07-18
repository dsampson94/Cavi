import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import {
  mapAggregateLists,
  mapDeficitLists,
  mapMenuData,
  mappedDailyETOList,
  pushFieldRow,
  pushForecastRegionRow,
  pushLandGroupRow,
  pushMappedLists
} from './FieldChartView.container.util';
import { retrieveUserLoginFromLocalStorage } from '../../../tools/storage/localStorage';

import { requestFieldChartList } from '../../../redux/actions/field.action';
import { requestClientFieldList } from '../../../redux/actions/client.action';

import FieldChartView from './FieldChartView';

const FieldChartViewContainer = () => {

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

  const mappedMenuList = () => {
    if (!fieldChartList) return;
    return mapMenuData(fieldChartList);
  };

  const mappedChartList = () => {
    if (!fieldChartList?.[probeNumber]) return;
    const mappedChartList = [], oneHundredMmList = [], twoHundredMmList = [], threeHundredMmList = [], fourHundredMmList = [],
      sixHundredMmList = [], eightHundredMmList = [], topSoilMmList = [], bottomSoilMmList = [], recommendationsSizeList = [];

    mapDeficitLists(oneHundredMmList, twoHundredMmList, threeHundredMmList, fourHundredMmList,
      sixHundredMmList, eightHundredMmList, fieldChartList, probeNumber);
    mapAggregateLists(topSoilMmList, bottomSoilMmList, fieldChartList, recommendationsSizeList);
    pushMappedLists(oneHundredMmList, twoHundredMmList, threeHundredMmList, fourHundredMmList, sixHundredMmList, eightHundredMmList,
      topSoilMmList, recommendationsSizeList, bottomSoilMmList, mappedDailyETOList(fieldChartList, probeNumber),
      mappedChartList, fieldChartList);
    return mappedChartList;
  };

  return <FieldChartView mappedFieldList={ mappedFieldList() }
                         mappedChartList={ mappedChartList() }
                         mappedMenuList={ mappedMenuList() }
                         setActiveLoadPeriod={ setActiveLoadPeriod }
                         setActiveFieldName={ setActiveFieldName } />;
};

export default FieldChartViewContainer;
