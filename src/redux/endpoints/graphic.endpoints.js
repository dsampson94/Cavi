import { getHttpGetPNGOptions, SERVER_HOST } from './index';

export const getGraphicOneEndpoint = () => `${ SERVER_HOST }/pulselogo.png`;
export const getRetrieveGraphicOneRequest = () => [
  getGraphicOneEndpoint(),
  getHttpGetPNGOptions()
];
