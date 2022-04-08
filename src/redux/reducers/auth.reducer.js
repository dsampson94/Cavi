import { SET_LOGGED_IN_USER } from '../actions/auth.action';

export const initialState = {
  undefined
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER: {
      const { user } = action;
      return {
        ...state,
        loggedInUser: user
      };
    }
    default:
      return state;
  }
};
