import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import { mapFieldList } from '../field/FieldChartView.container.util';
import { mapTemperaturesList } from './FieldTemperaturesChartView.container.util';

import { requestClientFieldList } from '../../../redux/actions/client.action';
import { requestFieldChartList } from '../../../redux/actions/field.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldTemperaturesChartView from './FieldTemperaturesChartView';

const FieldTemperaturesChartViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName, probeNumber } = useParams();

  const fieldChartList = useSelector(createSelector([state => state.field], field => field?.chartList));
  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const [activeLoadPeriod, setActiveLoadPeriod] = useState('2 weeks');
  const [activeFieldName, setActiveFieldName] = useState(fieldName);

  const request = getRequestParams({ groupName, clientName, activeFieldName, activeLoadPeriod });

  useEffect(() => {
    dispatch(requestFieldChartList(request.loadParams));
    dispatch(requestClientFieldList(request.clientParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(requestFieldChartList(request.loadParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFieldName, activeLoadPeriod]);

  const mappedFieldList = () => {
    return mapFieldList(fieldList);
  };

  const mappedTemperaturesList = () => {
    return mapTemperaturesList(fieldChartList, probeNumber);
  };

  return <FieldTemperaturesChartView mappedFieldList={ mappedFieldList() }
                                     mappedTemperaturesList={ mappedTemperaturesList() }
                                     activeLoadPeriod={ activeLoadPeriod }
                                     setActiveLoadPeriod={ setActiveLoadPeriod }
                                     setActiveFieldName={ setActiveFieldName } />;
};

export default FieldTemperaturesChartViewContainer;
