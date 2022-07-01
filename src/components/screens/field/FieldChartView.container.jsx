import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { pushFieldRow, pushForecastRegionRow, pushLandGroupRow } from './FieldChartView.container.util';
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

  const [loadPeriod, setLoadPeriod] = useState('2 weeks');

  useEffect(() => {
    dispatch(requestFieldChartList(fieldRequestFields));
    if (!fieldList) dispatch(requestClientFieldList(clientRequestFields));
    if (!fieldChartList) dispatch(requestFieldChartList(fieldRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(requestFieldChartList(fieldRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName, loadPeriod]);

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
    field: fieldName,
    load: loadPeriod
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

  const mappedChartList = () => {
    if (!fieldChartList?.[probeNumber]) return;
    const mappedChartList = [];
    const oneHundredMmList = [];
    const twoHundredMmList = [];
    const threeHundredMmList = [];
    const fourHundredMmList = [];
    const sixHundredMmList = [];
    const eightHundredMmList = [];
    const topSoilMmList = [];
    const bottomSoilMmList = [];
    const dailyETOList = [];

    Object.entries(fieldChartList?.[probeNumber])?.forEach(([key, value]) => {
      Object.keys(value).forEach((innerKey) => {
        switch (innerKey) {
          case 'D1':
            oneHundredMmList.push({ x: key, y: value.D1 });
            return;
          case 'D2':
            twoHundredMmList.push({ x: key, y: value.D2 });
            return;
          case 'D3':
            threeHundredMmList.push({ x: key, y: value.D3 });
            return;
          case 'D4':
            fourHundredMmList.push({ x: key, y: value.D4 });
            return;
          case 'D5':
            sixHundredMmList.push({ x: key, y: value.D5 });
            return;
          case 'D6':
            eightHundredMmList.push({ x: key, y: value.D6 });
            return;
        }
      });
    });

    Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
      Object.keys(value).forEach((innerKey) => {
        switch (innerKey) {
          case 'TB':
            topSoilMmList.push({ x: key, y: value.TB });
            return;
          case 'TBSim':
            topSoilMmList.push({ x: key, y: value.TBSim });
            return;
          case 'TO':
            bottomSoilMmList.push({ x: key, y: value.TO });
            return;
          case 'TOSim':
            bottomSoilMmList.push({ x: key, y: value.TOSim });
            return;
        }
      });
    });

    Object.entries(fieldChartList?.eto)?.forEach(([key, value]) => {
      dailyETOList.push({ x: key, y: value.f });
    });

    mappedChartList.push(oneHundredMmList);
    mappedChartList.push(twoHundredMmList);
    mappedChartList.push(threeHundredMmList);
    mappedChartList.push(fourHundredMmList);
    mappedChartList.push(sixHundredMmList);
    mappedChartList.push(eightHundredMmList);
    mappedChartList.push(topSoilMmList);
    mappedChartList.push(bottomSoilMmList);
    mappedChartList.push(dailyETOList);
    return mappedChartList;
  };

  return <FieldChartView mappedFieldList={ mappedFieldList() }
                         mappedChartList={ mappedChartList() }
                         setLoadPeriod={ setLoadPeriod } />;
};

export default FieldChartViewContainer;
