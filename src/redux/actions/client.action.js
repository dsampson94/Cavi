export const SET_CLIENT_OVERVIEW_LIST = '[CLIENT_STORE] Set overview list';
export const SET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set field list';
export const SET_FULL_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set full field list (fields & rain)';
export const SET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Set field rain data';
export const SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Set field rain data for chart';
export const SET_CLIENT_PDF = '[CLIENT_STORE] Set client PDF';

export const GET_CLIENT_OVERVIEW_LIST = '[CLIENT_STORE] Get overview list';
export const requestClientOverviewList = (client) => ({
  type: GET_CLIENT_OVERVIEW_LIST,
  client
});

export const GET_FULL_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get full field list (fields & rain)';
export const requestFullClientFieldList = (client) => ({
  type: GET_FULL_CLIENT_FIELD_LIST,
  client
});

export const GET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get field list';
export const requestClientFieldList = (client) => ({
  type: GET_CLIENT_FIELD_LIST,
  client
});

export const GET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Get field rain data';
export const requestClientFieldRainData = (client) => ({
  type: GET_CLIENT_FIELD_RAIN_DATA,
  client
});

export const GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Get field rain data for chart';
export const requestClientFieldRainDataForChart = (client) => ({
  type: GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  client
});

export const GET_CLIENT_PDF = '[CLIENT_STORE] Get client PDF';
export const requestClientPDF = (client) => ({
  type: GET_CLIENT_PDF,
  client
});
