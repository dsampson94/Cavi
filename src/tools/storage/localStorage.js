import { base64ToObject, objectToBase64 } from '../general/helpers.util';

const USER_ACCOUNT = 'U';
const USER_LOGIN = 'UL';
const THEME = 'T';
const FAVORITES = 'F';
const MONITOR_PROBES_SETTINGS = 'MPS';
const NEGLECTED_FIELDS_SETTINGS = 'NFS';
const LAST_READINGS_SETTINGS = 'LRS';

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

export const saveActiveThemeToLocalStorage = (theme) => {
  localStorage.setItem(THEME, objectToBase64(theme));
};

export const retrieveActiveThemeFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(THEME));
};

export const addOrRemoveFarmLocalStorageFavorites = (groupName, clientName) => {
  let storedFavoritesList = [];

  if (base64ToObject(localStorage.getItem(FAVORITES))) {
    storedFavoritesList = base64ToObject(localStorage.getItem(FAVORITES));
  }

  let found = false;
  storedFavoritesList?.forEach((item, index) => {
    if (item === `${ groupName }/${ clientName }`) {
      if (storedFavoritesList.length === 1) {
        storedFavoritesList = [];
      } else {
        storedFavoritesList.splice(index, 1);
      }
      found = true;
    }
  });

  if (!found) {
    storedFavoritesList.push(`${ groupName }/${ clientName }`);
    found = false;
  }

  localStorage.setItem(FAVORITES, objectToBase64(storedFavoritesList));
};

export const viewFarmLocalStorageFavorites = () => {
  return base64ToObject(localStorage.getItem(FAVORITES));
};

export const saveMonitorProbeFilterSettingsToLocalStorage = (filterState) => {
  localStorage.setItem(MONITOR_PROBES_SETTINGS, objectToBase64(filterState));
};

export const retrieveMonitorProbeFilterSettingsFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(MONITOR_PROBES_SETTINGS));
};

export const saveNeglectedFieldsFilterSettingsToLocalStorage = (filterState) => {
  localStorage.setItem(NEGLECTED_FIELDS_SETTINGS, objectToBase64(filterState));
};

export const retrieveNeglectedFieldsFilterSettingsFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(NEGLECTED_FIELDS_SETTINGS));
};

export const saveLastReadingsFilterSettingsToLocalStorage = (filterState) => {
  localStorage.setItem(LAST_READINGS_SETTINGS, objectToBase64(filterState));
};

export const retrieveLastReadingsFilterSettingsFromLocalStorage = () => {
  return base64ToObject(localStorage.getItem(LAST_READINGS_SETTINGS));
};
