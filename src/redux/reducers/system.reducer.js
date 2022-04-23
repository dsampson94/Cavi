import { ADD_SYSTEM_NOTICE, REMOVE_SYSTEM_NOTICE, SET_SPINNER_TEXT, SET_THEME } from '../actions/system.action';
import { generateId } from '../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../tools/storage/localStorage';

export const initialState = {
  notices: [],
  spinnerText: null,
  theme: retrieveActiveThemeFromLocalStorage()
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
    case SET_THEME: {
      const { theme } = action;

      return {
        ...state,
        theme
      };
    }
    default:
      return state;
  }
}
