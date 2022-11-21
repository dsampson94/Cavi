export const SET_USER_LOGIN_DETAILS = '[AUTH_STORE] Set user login details';
export const SET_USER_CLIENT_LIST = '[AUTH_STORE] Set user client list';

export const USER_LOGIN = '[AUTH_STORE] Login';
export const requestLogin = (user, onSuccess) => ({
  type: USER_LOGIN,
  user,
  onSuccess
});

export const GET_USER_LOGIN_DETAILS = '[AUTH_STORE] Get user login details';
export const requestUserLoginDetails = () => ({
  type: GET_USER_LOGIN_DETAILS
});

export const GET_USER_CLIENT_LIST = '[AUTH_STORE] Get user client list';
export const requestUserClientList = () => ({
  type: GET_USER_CLIENT_LIST
});

export const USER_LOGOUT = '[AUTH_STORE] Logout';
export const requestLogout = () => ({
  type: USER_LOGOUT
});
