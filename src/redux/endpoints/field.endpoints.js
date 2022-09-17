import { API_HOST, getHttpGetOptions } from './index';

const getFieldChartListEndpoint = () => `${ API_HOST }/getGraphs.php`;
export const getFieldChartListRequest = (field) => [
  getFieldChartListEndpoint(),
  getHttpGetOptions(field)
];

const getChartProbeCalibrationEndpoint = () => `${ API_HOST }/calibrateprobe.php`;
export const getChartProbeCalibrationRequest = (field) => [
  getChartProbeCalibrationEndpoint(),
  getHttpGetOptions(field)
];
