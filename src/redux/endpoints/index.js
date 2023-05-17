import { retrieveUserLoginFromLocalStorage } from '../../tools/storage/localStorage';

import {
  BILLING_STRING,
  CLIENT_DETAILS_STRING,
  CROP_DETAILS_STRING,
  CROP_FACTORS_STRING,
  EC_STRING,
  FIELDS_SPLIT_STRING,
  FLOW_DAILY_STRING,
  FLOW_HOURLY_STRING,
  GENERAL_STRING,
  IRRIDAY_STRING,
  IRRISYS_STRING,
  MAP_STRING,
  ML_FORECASTS_STRING,
  MOTTECH_STRING,
  PHENOLOGICAL_STRING,
  PROBES_DETAILED_STRING,
  PROBES_STRING,
  PUSH_WARNING_STRING,
  ROOTS_STRING,
  SASRI_STRING,
  SENSORS_STRING,
  SMS_RECOMMENDATION_STRING,
  SMS_WARNING_STRING,
  SOIL_TEMP,
  USERS_STRING,
  VOLTS_STRING,
  VPD_STRING,
  WEATHER_STATION_STRING
} from '../../tools/general/system-variables.util';

export const API_HOST = process.env.REACT_APP_API_ENDPOINT; // api endpoint provided in .env
export const SERVER_HOST = process.env.REACT_APP_HOST; // host provided in .env

export const responseStatus = (data) => Object.freeze({
  SUCCESS: (data),
  ERROR: (!data)
});

export const requestResponse = () => Object.freeze({
  SUCCESS: 1,
  ERROR: 0
});

export function getResponseMetaData(data) {
  return {
    responseMessage: data?.snackbartext
  };
}

const POST = 'POST';
export const getHttpPostOptions = (params = null, data, headers = null) => ({
  method: POST,
  params,
  data,
  headers
});

const GET = 'GET';
export const getHttpGetOptions = (params = null, headers = null) => ({
  method: GET,
  params,
  headers
});

export const getHttpGetPDFOptions = (params = null, headers = null) => ({
  method: GET,
  responseType: 'blob',
  params,
  headers
});

export const getHttpGetImageOptions = (params = null, headers = null) => ({
  method: GET,
  responseType: 'arraybuffer',
  params,
  headers
});

export const getRequestParams = ({
                                   groupName,
                                   clientName,
                                   activeFieldName,
                                   activeLoadPeriod,
                                   activeProbeFactor,
                                   overviewOptionSelected,
                                   activeObject,
                                   selectedProbeNumber,
                                   haValueToUpdate,
                                   adminUserFilter,
                                   sortType,
                                   onlyBehind,
                                   dfm,
                                   probeNumber,
                                   probeType,
                                   filterNumber,
                                   weatherStationName
                                 }) => {

  const user = retrieveUserLoginFromLocalStorage();

  const clientParams = {
    username: user?.username,
    password: user?.password,
    groupname: groupName,
    clientname: clientName
  };

  return {
    overviewParams: {
      username: user?.username,
      password: user?.password,
      getwhat: overviewOptionSelected
    },
    adminUserParams: {
      username: user?.username,
      password: user?.password,
      list: 1
    },
    monitorProbesParams: {
      username: user?.username,
      password: user?.password,
      filter: adminUserFilter?.name,
      sort: sortType?.name,
      onlybehind: onlyBehind?.id,
      dfm: dfm?.id === 0 ? 'no' : 'yes'
    },
    lastReadingsParams: {
      username: user?.username,
      password: user?.password,
      findnumber: probeNumber,
      records: filterNumber?.name
    },
    neglectedFieldsParams: {
      username: user?.username,
      password: user?.password,
      filter: adminUserFilter?.name,
      lastviewed: 'yes'
    },
    rawReadingsParams: {
      username: user?.username,
      password: user?.password,
      chartofrawreadings: 1,
      id: 1
    },
    rawReadingsChartParams: {
      username: user?.username,
      password: user?.password,
      id: 'id',
      chartofrawreadings: 1,
      probe: probeNumber,
      tipe: probeType
    },
    clientParams: {
      ...clientParams
    },
    weatherParams1: {
      ...clientParams,
      dash: 1
    },
    weatherParams2: {
      ...clientParams,
      dash: 2,
      ws: weatherStationName
    },
    loadParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      load: activeLoadPeriod ? activeLoadPeriod : null
    },
    recommendationModalParams: {
      ...clientParams,
      sensor: activeObject?.sensor,
      day: activeObject?.day,
      fieldname: activeObject?.fieldName?.locationName
    },
    calibrationParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      f: activeProbeFactor ? activeProbeFactor : null
    },
    voltParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: VOLTS_STRING
    },
    flowMeterDailyParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: FLOW_DAILY_STRING
    },
    flowMeterHourlyParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: FLOW_HOURLY_STRING
    },
    ECParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: EC_STRING
    },
    VPDParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: VPD_STRING
    },
    mottechParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: MOTTECH_STRING
    },
    soilTempParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: SOIL_TEMP
    },
    fieldSetupGeneralParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: GENERAL_STRING
    },
    fieldSetupSensorParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: SENSORS_STRING
    },
    fieldSetupProbesParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: PROBES_STRING
    },
    fieldSetupProbesDetailedParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: PROBES_DETAILED_STRING
    },
    fieldSetupMapParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: MAP_STRING
    },
    fieldSetupRootsParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: ROOTS_STRING
    },
    fieldSetupCropFactorsParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: CROP_FACTORS_STRING
    },
    fieldSetupCropDetailsParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: CROP_DETAILS_STRING
    },
    fieldSetupPhenologicalParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: PHENOLOGICAL_STRING
    },
    fieldSetupIrrigationSystemParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: IRRISYS_STRING
    },
    fieldSetupIrrigationDaysParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: IRRIDAY_STRING
    },
    fieldSetupWeatherStationParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: WEATHER_STATION_STRING
    },
    fieldSetupSASRIParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: SASRI_STRING
    },
    fieldSetupUsersParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: USERS_STRING
    },
    fieldSetupSMSRecommendationParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: SMS_RECOMMENDATION_STRING
    },
    fieldSetupSMSWarningParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: SMS_WARNING_STRING
    },
    fieldSetupPushWarningParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: PUSH_WARNING_STRING
    },
    fieldSetupFieldSplitParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: FIELDS_SPLIT_STRING
    },
    fieldSetupClientDetailsParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: CLIENT_DETAILS_STRING
    },
    fieldSetupBillingParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: BILLING_STRING
    },
    fieldSetupMLForecastsParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      g: ML_FORECASTS_STRING
    },
    setFieldSetupHa: {
      ...clientParams,
      fieldname: activeFieldName ? activeFieldName : null,
      probeno: selectedProbeNumber,
      setfield: 'ha',
      setvalue: haValueToUpdate
    }
  };
};
