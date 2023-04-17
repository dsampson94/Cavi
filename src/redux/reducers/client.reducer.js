import {
  SET_ADMIN_USER_LIST,
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  SET_CLIENT_FIELD_WEATHER_LIST_1,
  SET_CLIENT_FIELD_WEATHER_LIST_2,
  SET_CLIENT_FIELD_WEATHER_LIST_3,
  SET_CLIENT_LAST_READINGS_LIST,
  SET_CLIENT_MONITOR_PROBES_LIST,
  SET_CLIENT_OVERVIEW_LIST,
  SET_CLIENT_PDF,
  SET_CLIENT_RAW_READINGS,
  SET_CLIENT_RAW_READINGS_CHART
} from '../actions/client.action';

export const initialState = {
  overviewList: undefined,
  monitorProbesList: undefined,
  lastReadingsList: undefined,
  rawReadings: undefined,
  rawReadingsChart: undefined,
  fieldList: undefined,
  weatherList1: undefined,
  weatherList2: undefined,
  weatherList3: undefined,
  fieldRainData: undefined,
  fieldRainDataForChart: undefined,
  clientPDF: undefined,
  adminUserList: undefined
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_OVERVIEW_LIST: {
      const { overviewList } = action;
      return {
        ...state,
        overviewList
      };
    }
    case SET_CLIENT_MONITOR_PROBES_LIST: {
      const { monitorProbesList } = action;
      return {
        ...state,
        monitorProbesList
      };
    }
    case SET_CLIENT_LAST_READINGS_LIST: {
      const { lastReadingsList } = action;
      return {
        ...state,
        lastReadingsList
      };
    }
    case SET_CLIENT_RAW_READINGS: {
      const { rawReadings } = action;
      return {
        ...state,
        rawReadings
      };
    }
    case SET_CLIENT_RAW_READINGS_CHART: {
      const { rawReadingsChart } = action;
      return {
        ...state,
        rawReadingsChart
      };
    }
    case SET_CLIENT_FIELD_LIST: {
      const { fieldList } = action;
      return {
        ...state,
        fieldList
      };
    }
    case SET_CLIENT_FIELD_WEATHER_LIST_1: {
      const { weatherList1 } = action;
      return {
        ...state,
        weatherList1
      };
    }
    case SET_CLIENT_FIELD_WEATHER_LIST_2: {
      const { weatherList2 } = action;
      return {
        ...state,
        weatherList2
      };
    }
    case SET_CLIENT_FIELD_WEATHER_LIST_3: {
      const { weatherList3 } = action;
      return {
        ...state,
        weatherList3
      };
    }
    case SET_CLIENT_FIELD_RAIN_DATA: {
      const { fieldRainData } = action;
      return {
        ...state,
        fieldRainData
      };
    }
    case SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART: {
      const { fieldRainDataForChart } = action;
      return {
        ...state,
        fieldRainDataForChart
      };
    }
    case SET_CLIENT_PDF: {
      const { clientPDF } = action;
      return {
        ...state,
        clientPDF
      };
    }
    case SET_ADMIN_USER_LIST: {
      const { adminUserList } = action;
      return {
        ...state,
        adminUserList
      };
    }
    default:
      return state;
  }
};
