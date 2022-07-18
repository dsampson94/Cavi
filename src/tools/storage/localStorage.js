import { base64ToObject, objectToBase64 } from '../general/helpers.util';

const USER_ACCOUNT = 'U';
const USER_LOGIN = 'UL';
const THEME = 'theme';
const DEPTHS = 'D';

export const saveUserLoginToLocalStorage = (account) => {
  localStorage.setItem(USER_LOGIN, objectToBase64(account));
};

export const retrieveUserLoginFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(USER_LOGIN));
};

export const saveUserClientListToLocalStorage = (account) => {
  localStorage.setItem(USER_ACCOUNT, objectToBase64(account));
};

export const retrieveUserClientListFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(USER_ACCOUNT));
};

export const retrieveActiveThemeFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(THEME));
};

export const saveActiveThemeToLocalStorage = (theme) => {
  localStorage.setItem(THEME, objectToBase64(theme));
};
