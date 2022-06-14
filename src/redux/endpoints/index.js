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

