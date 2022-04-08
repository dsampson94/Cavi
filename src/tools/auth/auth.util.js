const USER_ACCOUNT = 'user';

export const saveUserAccountToLocalStorage = (account) => {
  localStorage.setItem(USER_ACCOUNT, JSON.stringify(account));
};

export const retrieveUserAccountFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(USER_ACCOUNT));
};
