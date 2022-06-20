export const SET_USER_LOGIN_DETAILS = '[AUTH_STORE] Set user login details';
export const SET_USER_CLIENT_LIST = '[AUTH_STORE] Set user client list';

export const USER_LOGIN = '[AUTH_STORE] Login';
export const requestLogin = (user, onSuccess, onError) => ({
  type: USER_LOGIN,
  user,
  onSuccess,
  onError
});

export const GET_USER_LOGIN_DETAILS = '[AUTH_STORE] Get user login details';
export const requestUserLoginDetails = (onSuccess, onError) => ({
  type: GET_USER_LOGIN_DETAILS,
  onSuccess,
  onError
});

export const GET_USER_CLIENT_LIST = '[AUTH_STORE] Get user client list';
export const requestUserClientList = (onSuccess, onError) => ({
  type: GET_USER_CLIENT_LIST,
  onSuccess,
  onError
});

export const USER_LOGOUT = '[AUTH_STORE] Logout';
export const requestLogout = (onSuccess, onError) => ({
  type: USER_LOGOUT,
  onSuccess,
  onError
});
