export const SET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set field list';
export const SET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Set field rain data';
export const SET_CLIENT_NAME = '[CLIENT_STORE] Set selected client';

export const GET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get field list';
export const requestClientFieldList = (client, onSuccess, onError) => ({
  type: GET_CLIENT_FIELD_LIST,
  client,
  onSuccess,
  onError
});

export const GET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Get field list';
export const requestClientFieldRainData = (client, onSuccess, onError) => ({
  type: GET_CLIENT_FIELD_RAIN_DATA,
  client,
  onSuccess,
  onError
});

export const GET_CLIENT_NAME = '[CLIENT_STORE] Get selected client';
export const requestSelectedClient = (onSuccess, onError) => ({
  type: GET_CLIENT_NAME,
  onSuccess,
  onError
});
