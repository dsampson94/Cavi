export const SET_LOGGED_IN_USER = '[AUTH_STORE] Set logged in user';

export const LOGIN = '[AUTH_STORE] Login with user account';
export const requestLogin = (user, onSuccess, onError) => ({
  type: LOGIN,
  user,
  onSuccess,
  onError
});
