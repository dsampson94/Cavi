import { SET_CLIENT_FIELD_LIST, SET_CLIENT_FIELD_RAIN_DATA, SET_CLIENT_NAME } from '../actions/client.action';

export const initialState = {
  fieldList: [],
  fieldRainData: [],
  selectedClient: { groupName: '', clientName: '' }
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
    case SET_CLIENT_NAME: {
      const { clientName, groupName } = action;
      return {
        ...state,
        selectedClient: { groupName, clientName }
      };
    }
    default:
      return state;
  }
};
