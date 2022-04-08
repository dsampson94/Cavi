import { ADD_SYSTEM_NOTICE, REMOVE_SYSTEM_NOTICE, SET_SPINNER_TEXT } from '../actions/system.action';
import { generateId } from '../../tools/general/helpers.util';

export const initialState = {
  notices: [],
  spinnerText: null
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SYSTEM_NOTICE:
      const { message, color, alertType } = action;
      return {
        ...state,
        notices: [
          ...state.notices,
          { id: generateId(), message, color, alertType }
        ]
      };
    case REMOVE_SYSTEM_NOTICE:
      const { id } = action;
      return {
        ...state,
        notices: state.notices.filter((notice) => notice.id !== id)
      };
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
