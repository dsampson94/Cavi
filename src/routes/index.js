import { Redirect, Route } from 'react-router';
import { retrieveUserLoginFromLocalStorage } from '../tools/storage/localStorage';

export const ProtectedRoute = (props) => {
  const token = retrieveUserLoginFromLocalStorage()?.password;
  if (token) return <Route  { ...props } />;
  else return <Redirect to={ { pathname: '/' } } />;
};
