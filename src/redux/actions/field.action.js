export const SET_FIELD_CHART_LIST = '[FIELD_STORE] Set field chart list';

export const GET_FIELD_CHART_LIST = '[FIELD_STORE] Get field chart list';
export const requestFieldChartList = (field, onSuccess, onError) => ({
  type: GET_FIELD_CHART_LIST,
  field,
  onSuccess,
  onError
});
