export const SET_LOGGED_IN_USER = '[AUTH_STORE] Set logged in user';

export const USER_LOGIN = '[AUTH_STORE] Login';
export const requestLogin = (user, onSuccess, onError) => ({
  type: USER_LOGIN,
  user,
  onSuccess,
  onError
});

export const USER_LOGOUT = '[AUTH_STORE] Logout';
export const requestLogout = (onSuccess, onError) => ({
  type: USER_LOGOUT,
  onSuccess,
  onError
});
