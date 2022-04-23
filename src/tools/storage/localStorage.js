import { base64ToObject, objectToBase64 } from '../general/helpers.util';

const USER_ACCOUNT = 'U';
const GRAPHIC_ONE = 'graphicOne';
const USER_LOGIN = 'UL';
const LAST_SELECTED_CLIENT = 'LSC';
const THEME = 'theme';

export const saveUserLoginToLocalStorage = (account) => {
  localStorage.setItem(USER_LOGIN, objectToBase64(account));
};

export const retrieveUserLoginFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(USER_LOGIN));
};

export const saveUserToLocalStorage = (account) => {
  localStorage.setItem(USER_ACCOUNT, objectToBase64(account));
};

export const retrieveUserFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(USER_ACCOUNT));
};

export const saveGraphicOneToLocalStorage = (base64String) => {
  localStorage.setItem(GRAPHIC_ONE, base64String);
};

export const retrieveGraphicOneFromLocalStorage = () => {
  return localStorage.getItem(GRAPHIC_ONE);
};

export const retrieveLastSelectedUserFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(LAST_SELECTED_CLIENT));
};

export const saveLastSelectedUserToLocalStorage = (client) => {
  localStorage.setItem(LAST_SELECTED_CLIENT, objectToBase64(client));
};

export const retrieveActiveThemeFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(THEME));
};

export const saveActiveThemeToLocalStorage = (theme) => {
  localStorage.setItem(THEME, objectToBase64(theme));
};
