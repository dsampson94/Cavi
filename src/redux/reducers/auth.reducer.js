import { SET_USER_CLIENT_LIST, SET_USER_LOGIN_DETAILS } from '../actions/auth.action';

export const initialState = {
  userLoginDetails: undefined,
  userClientList: undefined
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN_DETAILS: {
      const { userLoginDetails } = action;
      return {
        ...state,
        userLoginDetails
      };
    }
    case SET_USER_CLIENT_LIST: {
      const { userClientList } = action;
      return {
        ...state,
        userClientList
      };
    }
    default:
      return state;
  }
};
