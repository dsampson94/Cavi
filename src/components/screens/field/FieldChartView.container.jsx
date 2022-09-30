import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { DEFICIT_ETO, VOLT_READINGS } from '../../../tools/general/system-variables.util';

import { mapChartList, mapFieldList, mapMenuData, mapVoltChartLists } from './FieldChartView.container.util';

import { requestChartProbeCalibration, requestFieldChartList, requestFieldVoltChartList } from '../../../redux/actions/field.action';
import { requestClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldChartView from './FieldChartView';

const FieldChartViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName, probeNumber } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const fieldChartList = useSelector(createSelector([state => state.field], field => field?.chartList));
  const fieldVoltChartList = useSelector(createSelector([state => state.field], field => field?.voltChartList));

  const [activeLoadPeriod, setActiveLoadPeriod] = useState('2 weeks');
  const [activeFieldName, setActiveFieldName] = useState(fieldName);
  const [activeProbeFactor, setActiveProbeFactor] = useState(undefined);
  const [activeExtendedChart, setActiveExtendedChart] = useState(DEFICIT_ETO);

  const request = getRequestParams({ groupName, clientName, activeFieldName, activeLoadPeriod, activeProbeFactor });

  useEffect(() => {
    dispatch(requestClientFieldList(request.clientParams));
    dispatch(requestFieldChartList(request.loadParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeExtendedChart === VOLT_READINGS) dispatch(requestFieldVoltChartList(request.voltParams));
  }, [activeExtendedChart]);

  useEffect(() => {
    dispatch(requestFieldChartList(request.loadParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFieldName, activeLoadPeriod]);

  useEffect(() => {
    if (activeProbeFactor) dispatch(requestChartProbeCalibration(request.calibrationParams));
    dispatch(requestFieldChartList(request.loadParams));
    setActiveProbeFactor(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProbeFactor]);

  const mappedFieldList = () => {
    return mapFieldList(fieldList);
  };

  const mappedMenuList = () => {
    return mapMenuData(fieldChartList);
  };

  const mappedChartList = () => {
    return mapChartList(fieldChartList, probeNumber);
  };

  const mappedVoltChartList = () => {
    return mapVoltChartLists(fieldVoltChartList, fieldChartList, activeLoadPeriod);
  };

  return <FieldChartView mappedFieldList={ mappedFieldList() }
                         mappedChartList={ mappedChartList() }
                         mappedMenuList={ mappedMenuList() }
                         mappedVoltChartList={ mappedVoltChartList() }
                         activeLoadPeriod={ activeLoadPeriod }
                         setActiveLoadPeriod={ setActiveLoadPeriod }
                         setActiveFieldName={ setActiveFieldName }
                         activeProbeFactor={ activeProbeFactor }
                         setActiveProbeFactor={ setActiveProbeFactor }
                         activeExtendedChart={ activeExtendedChart }
                         setActiveExtendedChart={ setActiveExtendedChart } />;
};

export default FieldChartViewContainer;
