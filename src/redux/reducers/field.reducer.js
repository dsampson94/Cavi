import { SET_FIELD_CHART_LIST } from '../actions/field.action';

export const initialState = {
  chartList: undefined
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
    default:
      return state;
  }
};
