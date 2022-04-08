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
