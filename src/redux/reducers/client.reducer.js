import {
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  SET_CLIENT_PDF
} from '../actions/client.action';

export const initialState = {
  fieldList: undefined,
  fieldRainData: undefined,
  fieldRainDataForChart: undefined,
  clientPDF: undefined
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_FIELD_LIST: {
      const { fieldList } = action;
      return {
        ...state,
        fieldList
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
    default:
      return state;
  }
};
