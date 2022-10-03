export const SET_FIELD_CHART_LIST = '[FIELD_STORE] Set field chart list';
export const SET_FIELD_VOLT_CHART_LIST = '[FIELD_STORE] Set field volt chart list';
export const SET_FIELD_FLOW_METER_DAILY_CHART_LIST = '[FIELD_STORE] Set field flow meter daily chart list';
export const SET_FIELD_FLOW_METER_HOURLY_CHART_LIST = '[FIELD_STORE] Set field flow meter chart hourly list';
export const SET_FIELD_EC_CHART_LIST = '[FIELD_STORE] Set field EC list';
export const SET_FIELD_VPD_CHART_LIST = '[FIELD_STORE] Set field VPD list';
export const SET_FIELD_MOTTECH_CHART_LIST = '[FIELD_STORE] Set field MOTTECH list';

export const GET_FIELD_CHART_LIST = '[FIELD_STORE] Get field chart list';
export const requestFieldChartList = (field, onSuccess, onError) => ({
  type: GET_FIELD_CHART_LIST,
  field,
  onSuccess,
  onError
});

export const REQUEST_PROBE_CALIBRATION = '[FIELD_STORE] Request probe calibration';
export const requestChartProbeCalibration = (field, onSuccess, onError) => ({
  type: REQUEST_PROBE_CALIBRATION,
  field,
  onSuccess,
  onError
});

export const REQUEST_EXTENDED_FIELD_CHART_LIST = '[FIELD_STORE] Request extended field chart list';
export const requestExtendedFieldChartList = (field, use, onSuccess, onError) => ({
  type: REQUEST_EXTENDED_FIELD_CHART_LIST,
  field,
  use,
  onSuccess,
  onError
});
