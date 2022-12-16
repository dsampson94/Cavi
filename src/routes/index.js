import { Redirect, Route } from 'react-router';
import { retrieveUserLoginFromLocalStorage } from '../tools/storage/localStorage';

export const ProtectedRoute = (props) => {
  const token = retrieveUserLoginFromLocalStorage()?.password;
  if (token) return <Route  { ...props } />;
  else return <Redirect to={ { pathname: '/' } } />;
};

export const navigateTo = (props, history) => {
  switch (props.screen) {
    case Routes.FIELD_LIST:
      return () => history.push(`/client/${ props.groupName }/${ props.clientName }`);
    case Routes.FIELD_REPORTS:
      return () => history.push(`/client/${ props.groupName }/${ props.clientName }/field-reports`);
    default:
      return () => history.push(Routes.OVERVIEW);
  }
};

export const Routes = {
  LOGIN: '/',
  ASSISTANT: '/dashboard/assistant',
  OVERVIEW: '/dashboard/overview',
  MONITOR: '/dashboard/monitor-probes',
  LAST_READINGS: '/dashboard/last-readings',
  NEGLECTED_FIELDS: '/dashboard/neglected-fields',
  EMAIL_READINGS: '/dashboard/email-readings',
  RAW_READINGS: '/dashboard/raw-readings',
  CHECK_IRRICOMS: '/dashboard/irricoms',
  FIELD_LIST: '/client/:groupName/:clientName',
  FIELD_CHARTS: '/client/:groupName/:clientName/field-charts/:probeNumber/:fieldName+',
  FIELD_TEMPERATURES: '/:groupName/:clientName/field-temperatures/:probeNumber/:fieldName+',
  FIELD_REPORTS: '/:groupName/:clientName/field-reports',
  FIELD_SETUP: '/client/:groupName/:clientName/field-setup/',
  FIELD_SETUP_SCREEN: '/client/:groupName/:clientName/field-setup/:activeScreen'
};
