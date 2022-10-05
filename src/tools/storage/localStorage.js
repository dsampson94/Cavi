import { base64ToObject, isEmpty, objectToBase64 } from '../general/helpers.util';

const USER_ACCOUNT = 'U';
const USER_LOGIN = 'UL';
const THEME = 'T';
const FAVORITES = 'F';

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
