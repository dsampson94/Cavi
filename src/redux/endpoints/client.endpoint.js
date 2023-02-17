import { API_HOST, getHttpGetOptions, getHttpGetPDFOptions } from './index';

const getClientOverviewListEndpoint = () => `${ API_HOST }/getOneView.php `;
export const getClientOverviewListRequest = (client) => [
  getClientOverviewListEndpoint(),
  getHttpGetOptions(client)
];

const getClientMonitorProbesListEndpoint = () => `${ API_HOST }/getstatus.php `;
export const getClientMonitorProbesListRequest = (client) => [
  getClientMonitorProbesListEndpoint(),
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

const getAdminUserListEndpoint = () => `${ API_HOST }/getstatus.php`;
export const getAdminUserListRequest = (client) => [
  getAdminUserListEndpoint(),
  getHttpGetOptions(client)
];
