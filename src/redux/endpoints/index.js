import { retrieveUserLoginFromLocalStorage } from '../../tools/storage/localStorage';

export const API_HOST = process.env.REACT_APP_API_ENDPOINT; // api endpoint provided in .env
export const SERVER_HOST = process.env.REACT_APP_HOST; // host provided in .env

export const responseStatus = (data) => Object.freeze({
  SUCCESS: (data),
  ERROR: (!data)
});

export function getResponseMetaData(data) {
  return {
    responseMessage: data?.snackbartext
  };
}

const POST = 'POST';
export const getHttpPostOptions = (params = null, data, headers = null) => ({
  method: POST,
  params,
  data,
  headers
});

const GET = 'GET';
export const getHttpGetOptions = (params = null, headers = null) => ({
  method: GET,
  params,
  headers
});

export const getHttpGetPDFOptions = (params = null, headers = null) => ({
  method: GET,
  responseType: 'blob',
  params,
  headers
});

export const getRequestParams = ({
                                   groupName,
                                   clientName,
                                   activeFieldName,
                                   activeLoadPeriod,
                                   activeProbeFactor,
                                   overviewOptionSelected,
                                   activeObject
                                 }) => {

  const user = retrieveUserLoginFromLocalStorage();

  const clientParams = {
    username: user?.username,
    password: user?.password,
    groupname: groupName,
    clientname: clientName
  };

  return {
    overviewParams: {
      username: user?.username,
      password: user?.password,
      getwhat: overviewOptionSelected
    },
    clientParams: {
      ...clientParams
    },
    loadParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      load: activeLoadPeriod ? activeLoadPeriod : null
    },
    recommendationModalParams: {
      ...clientParams,
      sensor: activeObject?.sensor,
      day: activeObject?.day,
      fieldname: activeObject?.fieldName?.locationName
    },
    calibrationParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      f: activeProbeFactor ? activeProbeFactor : null
    },
    voltParams: {
      ...clientParams,
      field: activeFieldName ? activeFieldName : null,
      get: 'volts'
    }
  };
};
