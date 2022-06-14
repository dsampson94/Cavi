export const SET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set field list';
export const SET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Set field rain data';
export const SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Set field rain data for chart';
export const SET_CLIENT_PDF = '[CLIENT_STORE] Set client PDF';

export const GET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get field list';
export const requestClientFieldList = (client, onSuccess, onError) => ({
  type: GET_CLIENT_FIELD_LIST,
  client,
  onSuccess,
  onError
});

export const GET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Get field rain data';
export const requestClientFieldRainData = (client, onSuccess, onError) => ({
  type: GET_CLIENT_FIELD_RAIN_DATA,
  client,
  onSuccess,
  onError
});

export const GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Get field rain data for chart';
export const requestClientFieldRainDataForChart = (client, onSuccess, onError) => ({
  type: GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  client,
  onSuccess,
  onError
});

export const GET_CLIENT_PDF = '[CLIENT_STORE] Get client PDF';
export const requestClientPDF = (client, onSuccess, onError) => ({
  type: GET_CLIENT_PDF,
  client,
  onSuccess,
  onError
});
