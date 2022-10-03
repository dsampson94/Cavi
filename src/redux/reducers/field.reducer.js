import {
  SET_FIELD_CHART_LIST, SET_FIELD_EC_CHART_LIST,
  SET_FIELD_FLOW_METER_DAILY_CHART_LIST,
  SET_FIELD_FLOW_METER_HOURLY_CHART_LIST, SET_FIELD_MOTTECH_CHART_LIST,
  SET_FIELD_VOLT_CHART_LIST, SET_FIELD_VPD_CHART_LIST
} from '../actions/field.action';

export const initialState = {
  chartList: undefined,
  voltChartList: undefined,
  flowMeterDailyList: undefined,
  flowMeterHourlyList: undefined,
  ECList: undefined,
  VPDList: undefined,
  mottechList: undefined
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
    case SET_FIELD_FLOW_METER_DAILY_CHART_LIST: {
      const { flowMeterDailyList } = action;
      return {
        ...state,
        flowMeterDailyList
      };
    }
    case SET_FIELD_FLOW_METER_HOURLY_CHART_LIST: {
      const { flowMeterHourlyList } = action;
      return {
        ...state,
        flowMeterHourlyList
      };
    }
    case SET_FIELD_EC_CHART_LIST: {
      const { ECList } = action;
      return {
        ...state,
        ECList
      };
    }
    case SET_FIELD_VPD_CHART_LIST: {
      const { VPDList } = action;
      return {
        ...state,
        VPDList
      };
    }
    case SET_FIELD_MOTTECH_CHART_LIST: {
      const { mottechList } = action;
      return {
        ...state,
        mottechList
      };
    }
    default:
      return state;
  }
};
