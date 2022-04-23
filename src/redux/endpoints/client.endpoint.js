import { API_HOST, getHttpGetOptions } from './index';

const getClientFieldListEndpoint = () => `${ API_HOST }/getRecommendations.php`;
export const requestClientFieldListRequest = (client) => [
  getClientFieldListEndpoint(),
  getHttpGetOptions(client)
];

const getClientFieldRainDataEndpoint = () => `${ API_HOST }/getRain.php`;
export const requestClientFieldRainDataRequest = (client) => [
  getClientFieldRainDataEndpoint(),
  getHttpGetOptions(client)
];
