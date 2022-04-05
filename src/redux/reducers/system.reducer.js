import { SET_SPINNER_TEXT } from '../actions/system.action';

export const initialState = {
  spinnerText: null
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER_TEXT: {
      const { spinnerText } = action;

      return {
        ...state,
        spinnerText
      };
    }
    default:
      return state;
  }
}
