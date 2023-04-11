import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { ACTUAL_IRRIGATION, DEFICIT_ETO, EC, FLOW_DAILY, FLOW_HOURLY, TWO_WEEKS_LABEL, VOLT_READINGS, VPD } from '../../../tools/general/system-variables.util';

import {
  mapActualMottechChartLists,
  mapChartList,
  mapECChartLists,
  mapFieldList,
  mapFlowMeterDailyChartLists,
  mapFlowMeterHourlyChartLists,
  mapMenuData,
  mapVoltChartLists,
  mapVPDChartLists
} from './FieldChartsView.container.util';

import {
  requestChartProbeCalibration,
  requestExtendedFieldChartList,
  requestFieldChartList,
  SET_FIELD_EC_CHART_LIST,
  SET_FIELD_FLOW_METER_DAILY_CHART_LIST,
  SET_FIELD_FLOW_METER_HOURLY_CHART_LIST,
  SET_FIELD_MOTTECH_CHART_LIST,
  SET_FIELD_VOLT_CHART_LIST,
  SET_FIELD_VPD_CHART_LIST
} from '../../../redux/actions/field.action';

import { requestClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldChartView from './FieldChartsView';

const FieldChartsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName, fieldName, probeNumber } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const fieldChartList = useSelector(createSelector([state => state.field], field => field?.chartList));
  const fieldVoltChartList = useSelector(createSelector([state => state.field], field => field?.voltChartList));
  const fieldFlowMeterDailyChartList = useSelector(createSelector([state => state.field], field => field?.flowMeterDailyList));
  const fieldFlowMeterHourlyChartList = useSelector(createSelector([state => state.field], field => field?.flowMeterHourlyList));
  const fieldECChartList = useSelector(createSelector([state => state.field], field => field?.ECList));
  const fieldVPDChartList = useSelector(createSelector([state => state.field], field => field?.VPDList));
  const fieldActualChartList = useSelector(createSelector([state => state.field], field => field?.mottechList));

  const [activeLoadPeriod, setActiveLoadPeriod] = useState(TWO_WEEKS_LABEL);
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
    switch (activeExtendedChart) {
      case VOLT_READINGS:
        return dispatch(requestExtendedFieldChartList(request.voltParams, SET_FIELD_VOLT_CHART_LIST));
      case FLOW_DAILY:
        return dispatch(requestExtendedFieldChartList(request.flowMeterDailyParams, SET_FIELD_FLOW_METER_DAILY_CHART_LIST));
      case FLOW_HOURLY:
        return dispatch(requestExtendedFieldChartList(request.flowMeterHourlyParams, SET_FIELD_FLOW_METER_HOURLY_CHART_LIST));
      case EC:
        return dispatch(requestExtendedFieldChartList(request.ECParams, SET_FIELD_EC_CHART_LIST));
      case VPD:
        return dispatch(requestExtendedFieldChartList(request.VPDParams, SET_FIELD_VPD_CHART_LIST));
      case ACTUAL_IRRIGATION:
        return dispatch(requestExtendedFieldChartList(request.mottechParams, SET_FIELD_MOTTECH_CHART_LIST));
    }
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

  const mappedFlowMeterDailyChartList = () => {
    return mapFlowMeterDailyChartLists(fieldFlowMeterDailyChartList, fieldVoltChartList, fieldChartList, activeLoadPeriod);
  };

  const mappedFlowMeterHourlyList = () => {
    return mapFlowMeterHourlyChartLists(fieldFlowMeterHourlyChartList, fieldChartList, activeLoadPeriod);
  };

  const mappedECChartList = () => {
    return mapECChartLists(fieldECChartList, fieldChartList, activeLoadPeriod);
  };

  const mappedVPDChartList = () => {
    return mapVPDChartLists(fieldVPDChartList, fieldChartList, activeLoadPeriod);
  };

  const mappedActualChartList = () => {
    return mapActualMottechChartLists(fieldActualChartList, fieldChartList, activeLoadPeriod);
  };

  return <FieldChartView mappedFieldList={ mappedFieldList() }
                         mappedChartList={ mappedChartList() }
                         mappedMenuList={ mappedMenuList() }
                         mappedVoltChartList={ mappedVoltChartList() }
                         mappedFlowMeterDailyChartList={ mappedFlowMeterDailyChartList() }
                         mappedFlowMeterHourlyList={ mappedFlowMeterHourlyList() }
                         mappedECChartList={ mappedECChartList() }
                         mappedVPDChartList={ mappedVPDChartList() }
                         mappedActualChartList={ mappedActualChartList() }
                         activeLoadPeriod={ activeLoadPeriod }
                         setActiveLoadPeriod={ setActiveLoadPeriod }
                         setActiveFieldName={ setActiveFieldName }
                         activeProbeFactor={ activeProbeFactor }
                         setActiveProbeFactor={ setActiveProbeFactor }
                         activeExtendedChart={ activeExtendedChart }
                         setActiveExtendedChart={ setActiveExtendedChart } />;
};

export default FieldChartsViewContainer;
