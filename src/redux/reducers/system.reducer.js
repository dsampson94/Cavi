import {
  ADD_SYSTEM_NOTICE,
  CANCEL_REQUEST,
  REMOVE_SYSTEM_NOTICE,
  SET_PROGRESS_BAR,
  SET_SHOW_SHIMMER,
  SET_SPINNER_TEXT,
  SET_THEME
} from '../actions/system.action';

import { generateId } from '../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../tools/storage/localStorage';

export const initialState = {
  notices: [],
  spinnerText: null,
  showShimmer: false,
  progressBar: null,
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
    case SET_SHOW_SHIMMER: {
      const { showShimmer } = action;

      return {
        ...state,
        showShimmer
      };
    }
    case SET_PROGRESS_BAR: {
      const { progressBar } = action;

      return {
        ...state,
        progressBar
      };
    }
    case SET_THEME: {
      const { theme } = action;

      return {
        ...state,
        theme
      };
    }
    case CANCEL_REQUEST: {
      return {
        ...state,
        spinnerText: undefined
      };
    }
    default:
      return state;
  }
}
