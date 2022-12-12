export const ADD_SYSTEM_NOTICE = '[SYSTEM_STORE] Add system notice';
export const addSystemNotice = (message, alertType) => ({
  type: ADD_SYSTEM_NOTICE,
  message,
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

export const SET_PROGRESS_BAR = '[SYSTEM_STORE] Set progress bar';
export const setProgressBar= (progressBar) => ({
  type: SET_PROGRESS_BAR,
  progressBar
});

export const SET_SHOW_SHIMMER = '[SYSTEM_STORE] Set show shimmer';
export const setShowShimmer = (showShimmer) => ({
  type: SET_SHOW_SHIMMER,
  showShimmer
});

export const SET_THEME = '[SYSTEM_STORE] Set theme';
export const setTheme = (theme) => ({
  type: SET_THEME,
  theme
});

export const GET_THEME = '[SYSTEM_STORE] Get theme';
export const getTheme = () => ({
  type: GET_THEME
});

export const CANCEL_REQUEST = '[SYSTEM_STORE] Cancel Request';
export const cancelRequest = (theme) => ({
  type: CANCEL_REQUEST,
  theme
});
