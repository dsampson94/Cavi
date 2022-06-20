import { API_HOST, getHttpGetOptions, getHttpGetPDFOptions } from './index';

const getClientOverviewEndpoint = () => `${ API_HOST }/getOneView.php `;
export const getClientOverviewRequest = (client) => [
  getClientOverviewEndpoint(),
  getHttpGetOptions(client)
];

const getClientFieldListEndpoint = () => `${ API_HOST }/getRecommendations.php`;
export const getClientFieldListRequest = (client) => [
  getClientFieldListEndpoint(),
  getHttpGetOptions(client)
];

const getClientFieldRainDataEndpoint = () => `${ API_HOST }/getRain.php`;
export const getClientFieldRainDataRequest = (client) => [
  getClientFieldRainDataEndpoint(),
  getHttpGetOptions(client)
];

const getClientFieldsPDFEndpoint = () => `${ API_HOST }/pdfRecommendations.php `;
export const getClientFieldListPDFRequest = (client) => [
  getClientFieldsPDFEndpoint(),
  getHttpGetPDFOptions(client)
];
