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

const getExtendedChartListEndpoint = () => `${ API_HOST }/getGraphsMore.php`;
export const getExtendedChartList = (field) => [
  getExtendedChartListEndpoint(),
  getHttpGetOptions(field)
];

const getFieldSetupListEndpoint = () => `${ API_HOST }/getFieldSetup.php`;
export const getFieldSetupList = (field) => [
  getFieldSetupListEndpoint(),
  getHttpGetOptions(field)
];

const getSetFieldSetupEndpoint = () => `${ API_HOST }/setFieldSetup.php`;
export const getSetFieldSetup = (field) => [
  getSetFieldSetupEndpoint(),
  getHttpGetOptions(field)
];
