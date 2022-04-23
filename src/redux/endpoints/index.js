export const API_HOST = process.env.REACT_APP_API_ENDPOINT; // api endpoint provided in .env
export const SERVER_HOST = process.env.REACT_APP_HOST; // host provided in .env

export const responseStatus = Object.freeze({
  SUCCESS: 1,
  ERROR: 0
});

export function getResponseMetaData(data) {
  return {
    responseMessage: data.snackbartext,
    responseColor: data.snackbarcolor
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

export const getHttpGetPNGOptions = (params = null, headers = null) => ({
  method: GET,
  responseType: 'arraybuffer',
  params,
  headers
});

