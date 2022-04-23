export const ADD_SYSTEM_NOTICE = '[SYSTEM_STORE] Add system notice';
export const addSystemNotice = (message, color, alertType) => ({
  type: ADD_SYSTEM_NOTICE,
  message,
  color,
  alertType
});

export const REMOVE_SYSTEM_NOTICE = '[SYSTEM_STORE] Remove system notice';
export const removeSystemNotice = (id) => ({
  type: REMOVE_SYSTEM_NOTICE,
  id
});

export const SET_SPINNER_TEXT = '[SYSTEM_STORE] Set spinner text';
export const setSpinnerText = (spinnerText) => ({
  type: SET_SPINNER_TEXT,
  spinnerText
});

export const SET_THEME = '[SYSTEM_STORE] Set theme';
export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
});

export const GET_THEME = '[SYSTEM_STORE] Get theme';
export const getTheme = (onSuccess, onError) => ({
  type: GET_THEME,
  onSuccess,
  onError
});
