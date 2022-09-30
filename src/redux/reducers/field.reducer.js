import { SET_FIELD_CHART_LIST, SET_FIELD_VOLT_CHART_LIST } from '../actions/field.action';

export const initialState = {
  chartList: undefined,
  voltChartList: undefined
};

export const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_CHART_LIST: {
      const { chartList } = action;
      return {
        ...state,
        chartList
      };
    }
    case SET_FIELD_VOLT_CHART_LIST: {
      const { voltChartList } = action;
      return {
        ...state,
        voltChartList
      };
    }
    default:
      return state;
  }
};
