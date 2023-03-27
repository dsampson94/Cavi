import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';
import { getRequestParams } from '../../../redux/endpoints';

import FieldSetupView from './FieldSetupView';

import {
  BILLING_ROUTE,
  CLIENT_DETAILS_ROUTE,
  CROP_DETAILS_ROUTE,
  CROP_FACTORS_ROUTE,
  FIELDS_SPLIT_ROUTE,
  GENERAL_ROUTE,
  IRRIDAY_ROUTE,
  IRRISYS_ROUTE,
  MAP_ROUTE,
  ML_FORECASTS_ROUTE,
  PHENOLOGICAL_ROUTE,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  PUSH_WARNING_ROUTE,
  ROOTS_ROUTE,
  SASRI_ROUTE,
  SENSORS_ROUTE,
  SMS_RECOMMENDATION_ROUTE,
  SMS_WARNING_ROUTE,
  USERS_ROUTE,
  WEATHER_STATION_ROUTE
} from '../../../tools/general/system-variables.util';

import {
  requestFieldSetupList,
  requestSetFieldSetup,
  SET_FIELD_SETUP_BILLING_LIST,
  SET_FIELD_SETUP_CLIENT_DETAILS_LIST,
  SET_FIELD_SETUP_CROP_DETAILS_LIST,
  SET_FIELD_SETUP_CROP_FACTORS_LIST,
  SET_FIELD_SETUP_GENERAL_LIST,
  SET_FIELD_SETUP_IRRIGATION_DAYS_LIST,
  SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST,
  SET_FIELD_SETUP_MAP_LIST,
  SET_FIELD_SETUP_ML_FORECASTS_LIST,
  SET_FIELD_SETUP_PHENOLOGICAL_LIST,
  SET_FIELD_SETUP_PROBES_DETAILED_LIST,
  SET_FIELD_SETUP_PROBES_LIST,
  SET_FIELD_SETUP_PUSH_WARNING_LIST,
  SET_FIELD_SETUP_ROOTS_LIST,
  SET_FIELD_SETUP_SASRI_LIST,
  SET_FIELD_SETUP_SENSORS_LIST,
  SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST,
  SET_FIELD_SETUP_SMS_WARNING_LIST,
  SET_FIELD_SETUP_SPLIT_VALVES_LIST,
  SET_FIELD_SETUP_USERS_LIST,
  SET_FIELD_SETUP_WEATHER_STATION_LIST
} from '../../../redux/actions/field.action';

import { mapSetupList } from './FieldSetupView.container.util';
import { retrieveUserLoginFromLocalStorage } from '../../../tools/storage/localStorage';

const FieldSetupViewContainer = () => {

  const dispatch = useDispatch();

  const { groupName, clientName, activeScreen } = useParams();

  const generalList = useSelector(createSelector([state => state.field], field => field?.fieldSetupGeneralList));
  const editGeneralListResponse = useSelector(createSelector([state => state.field], field => field?.chartList?.id));
  const probeSummaryList = useSelector(createSelector([state => state.field], field => field?.fieldSetupProbesList));
  const probeDetailedList = useSelector(createSelector([state => state.field], field => field?.fieldSetupProbesDetailedList));
  const sensorList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSensorsList));
  const rootsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupRootsList));
  const cropFactorsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupCropFactorsList));
  const cropDetailsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupCropDetailsList));
  const weatherStationList = useSelector(createSelector([state => state.field], field => field?.fieldSetupWeatherStationList));
  const irrigationSystemList = useSelector(createSelector([state => state.field], field => field?.fieldSetupIrrigationSystemList));
  const irrigationDaysList = useSelector(createSelector([state => state.field], field => field?.fieldSetupIrrigationDaysList));
  const pushWarningsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupPushWarningList));
  const SMSWarningsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSMSWarningList));
  const splitValvesList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSplitValvesList));
  const billingList = useSelector(createSelector([state => state.field], field => field?.fieldSetupBillingList));
  const usersList = useSelector(createSelector([state => state.field], field => field?.fieldSetupUsersList));
  const clientDetailsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupClientDetailsList));
  const SMSRecommendationsList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSMSRecommendationList));
  const MLForecastList = useSelector(createSelector([state => state.field], field => field?.fieldSetupMLForecastList));
  const SASRIList = useSelector(createSelector([state => state.field], field => field?.fieldSetupSASRIList));
  const phenologicalList = useSelector(createSelector([state => state.field], field => field?.fieldSetupPhenologicalList));
  const mapList = useSelector(createSelector([state => state.field], field => field?.fieldSetupMapList));

  const [selectedProbeNumber, setSelectedProbeNumber] = useState(null);
  const [selectedFieldName, setSelectedFieldName] = useState(null);

  const [valueToUpdate, setValueToUpdate] = useState(undefined);

  const request = getRequestParams({
    groupName,
    clientName,
    selectedProbeNumber,
    activeFieldName: selectedFieldName
  });

  useEffect(() => {
    switch (activeScreen) {
      case GENERAL_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupGeneralParams, SET_FIELD_SETUP_GENERAL_LIST));
        return;
      case PROBES_SUMMARY_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupProbesParams, SET_FIELD_SETUP_PROBES_LIST));
        return;
      case PROBES_DETAILED_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupProbesDetailedParams, SET_FIELD_SETUP_PROBES_DETAILED_LIST));
        return;
      case SENSORS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupSensorParams, SET_FIELD_SETUP_SENSORS_LIST));
        return;
      case MAP_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupMapParams, SET_FIELD_SETUP_MAP_LIST));
        return;
      case ROOTS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupRootsParams, SET_FIELD_SETUP_ROOTS_LIST));
        return;
      case CROP_FACTORS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupCropFactorsParams, SET_FIELD_SETUP_CROP_FACTORS_LIST));
        return;
      case CROP_DETAILS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupCropDetailsParams, SET_FIELD_SETUP_CROP_DETAILS_LIST));
        return;
      case PHENOLOGICAL_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupPhenologicalParams, SET_FIELD_SETUP_PHENOLOGICAL_LIST));
        return;
      case IRRISYS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupIrrigationSystemParams, SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST));
        return;
      case IRRIDAY_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupIrrigationDaysParams, SET_FIELD_SETUP_IRRIGATION_DAYS_LIST));
        return;
      case WEATHER_STATION_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupWeatherStationParams, SET_FIELD_SETUP_WEATHER_STATION_LIST));
        return;
      case SASRI_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupSASRIParams, SET_FIELD_SETUP_SASRI_LIST));
        return;
      case USERS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupUsersParams, SET_FIELD_SETUP_USERS_LIST));
        return;
      case SMS_RECOMMENDATION_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupSMSRecommendationParams, SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST));
        return;
      case SMS_WARNING_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupSMSWarningParams, SET_FIELD_SETUP_SMS_WARNING_LIST));
        return;
      case PUSH_WARNING_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupPushWarningParams, SET_FIELD_SETUP_PUSH_WARNING_LIST));
        return;
      case FIELDS_SPLIT_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupFieldSplitParams, SET_FIELD_SETUP_SPLIT_VALVES_LIST));
        return;
      case CLIENT_DETAILS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupClientDetailsParams, SET_FIELD_SETUP_CLIENT_DETAILS_LIST));
        return;
      case BILLING_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupBillingParams, SET_FIELD_SETUP_BILLING_LIST));
        return;
      case ML_FORECASTS_ROUTE:
        dispatch(requestFieldSetupList(request.fieldSetupMLForecastsParams, SET_FIELD_SETUP_ML_FORECASTS_LIST));
        return;
    }
  }, [activeScreen]);

  const updateFieldDetails = useCallback((fieldDetailName, inputValue) => {
    const user = retrieveUserLoginFromLocalStorage();
    dispatch(requestSetFieldSetup({
      username: user?.username,
      password: user?.password,
      groupname: groupName,
      clientname: clientName,
      fieldname: selectedFieldName ? selectedFieldName : null,
      probeno: selectedProbeNumber,
      setfield: fieldDetailName,
      setvalue: inputValue
    }));
  }, [dispatch, groupName, clientName, selectedFieldName, selectedProbeNumber]);

  const mappedFieldSetupList = useMemo(() => {
    return mapSetupList(
      activeScreen,
      generalList,
      probeSummaryList,
      probeDetailedList,
      sensorList,
      rootsList,
      cropFactorsList,
      cropDetailsList,
      weatherStationList,
      irrigationSystemList,
      irrigationDaysList,
      pushWarningsList,
      SMSWarningsList,
      splitValvesList,
      billingList,
      usersList,
      clientDetailsList,
      SMSRecommendationsList,
      MLForecastList,
      SASRIList,
      phenologicalList,
      mapList,
      clientName,
      groupName
    );
  }, [
    activeScreen,
    generalList,
    probeSummaryList,
    probeDetailedList,
    sensorList,
    rootsList,
    cropFactorsList,
    cropDetailsList,
    weatherStationList,
    irrigationSystemList,
    irrigationDaysList,
    pushWarningsList,
    SMSWarningsList,
    splitValvesList,
    billingList,
    usersList,
    clientDetailsList,
    SMSRecommendationsList,
    MLForecastList,
    SASRIList,
    phenologicalList,
    mapList,
    clientName,
    groupName
  ]);

  useEffect(() => {
    dispatch(requestFieldSetupList(request.fieldSetupGeneralParams, SET_FIELD_SETUP_GENERAL_LIST));
  }, [editGeneralListResponse]);

  const mappedDropdownList = useMemo(() => {
    const forecastList = generalList?.gebied?.[0]?.map((value, index) => {
      return { id: `gebied-${ index }`, name: value };
    }) ?? [];

    const unitList = generalList?.units?.[0]?.map((value, index) => {
      return { id: `units-${ index }`, name: value };
    }) ?? [];

    return [forecastList, unitList];
  }, [generalList?.gebied?.[0], generalList?.units?.[0]]);

  return <FieldSetupView mappedSetupList={ mappedFieldSetupList }
                         mappedDropdownList={ mappedDropdownList }
                         activeScreen={ activeScreen }
                         clientRequestParams={ request.clientParams }
                         setSelectedProbeNumber={ setSelectedProbeNumber }
                         setSelectedFieldName={ setSelectedFieldName }
                         updateFieldDetails={ updateFieldDetails }
                         valueToUpdate={ valueToUpdate }
                         setValueToUpdate={ setValueToUpdate } />;
};

export default FieldSetupViewContainer;
