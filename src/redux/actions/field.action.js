export const SET_FIELD_CHART_LIST = '[FIELD_STORE] Set field chart list';
export const SET_FIELD_VOLT_CHART_LIST = '[FIELD_STORE] Set field volt chart list';
export const SET_FIELD_FLOW_METER_DAILY_CHART_LIST = '[FIELD_STORE] Set field flow meter daily chart list';
export const SET_FIELD_FLOW_METER_HOURLY_CHART_LIST = '[FIELD_STORE] Set field flow meter chart hourly list';
export const SET_FIELD_EC_CHART_LIST = '[FIELD_STORE] Set field EC list';
export const SET_FIELD_VPD_CHART_LIST = '[FIELD_STORE] Set field VPD list';
export const SET_FIELD_MOTTECH_CHART_LIST = '[FIELD_STORE] Set field MOTTECH list';
export const SET_SOIL_TEMP_LIST = '[FIELD_STORE] Set soil temp list';

export const SET_FIELD_SETUP_GENERAL_LIST = '[FIELD_STORE] Set field setup general list';
export const SET_FIELD_SETUP_SENSORS_LIST = '[FIELD_STORE] Set field setup sensors list';
export const SET_FIELD_SETUP_PROBES_LIST = '[FIELD_STORE] Set field setup probes list';
export const SET_FIELD_SETUP_PROBES_DETAILED_LIST = '[FIELD_STORE] Set field setup probes detailed list';
export const SET_FIELD_SETUP_ROOTS_LIST = '[FIELD_STORE] Set field setup roots list';
export const SET_FIELD_SETUP_CROP_FACTORS_LIST = '[FIELD_STORE] Set field setup crop factors list';
export const SET_FIELD_SETUP_CROP_DETAILS_LIST = '[FIELD_STORE] Set field setup crop details list';
export const SET_FIELD_SETUP_WEATHER_STATION_LIST = '[FIELD_STORE] Set field setup weather station list';
export const SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST = '[FIELD_STORE] Set field setup irrigation system list';
export const SET_FIELD_SETUP_IRRIGATION_DAYS_LIST = '[FIELD_STORE] Set field setup irrigation days list';
export const SET_FIELD_SETUP_PUSH_WARNING_LIST = '[FIELD_STORE] Set field setup push warning list';
export const SET_FIELD_SETUP_SMS_WARNING_LIST = '[FIELD_STORE] Set field setup sms warning list';
export const SET_FIELD_SETUP_SPLIT_VALVES_LIST = '[FIELD_STORE] Set field setup split valves list';
export const SET_FIELD_SETUP_BILLING_LIST = '[FIELD_STORE] Set field setup billing list';
export const SET_FIELD_SETUP_CLIENT_DETAILS_LIST = '[FIELD_STORE] Set field setup client details list';
export const SET_FIELD_SETUP_USERS_LIST = '[FIELD_STORE] Set field setup users list';
export const SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST = '[FIELD_STORE] Set field setup sms recommendation list';
export const SET_FIELD_SETUP_ML_FORECASTS_LIST = '[FIELD_STORE] Set field setup forecasts list';
export const SET_FIELD_SETUP_SASRI_LIST = '[FIELD_STORE] Set field sasri list';
export const SET_FIELD_SETUP_PHENOLOGICAL_LIST = '[FIELD_STORE] Set field phenological list';
export const SET_FIELD_SETUP_MAP_LIST = '[FIELD_STORE] Set field map list';

export const GET_FIELD_CHART_LIST = '[FIELD_STORE] Get field chart list';
export const requestFieldChartList = (field) => ({
  type: GET_FIELD_CHART_LIST,
  field
});

export const REQUEST_PROBE_CALIBRATION = '[FIELD_STORE] Request probe calibration';
export const requestChartProbeCalibration = (field) => ({
  type: REQUEST_PROBE_CALIBRATION,
  field
});

export const REQUEST_EXTENDED_FIELD_CHART_LIST = '[FIELD_STORE] Request extended field chart list';
export const requestExtendedFieldChartList = (field, use) => ({
  type: REQUEST_EXTENDED_FIELD_CHART_LIST,
  field,
  use
});

export const REQUEST_FIELD_SETUP_LIST = '[FIELD_STORE] Request field setup list';
export const requestFieldSetupList = (field, use) => ({
  type: REQUEST_FIELD_SETUP_LIST,
  field,
  use
});
