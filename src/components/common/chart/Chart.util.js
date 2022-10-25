import React from 'react';
import {
  ACTUAL_IRRIGATION,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CANOPY_OUTSIDE_TEMPERATURE,
  DAILY_ETO,
  DEFICIT_100MM,
  DEFICIT_200MM,
  DEFICIT_300MM,
  DEFICIT_400MM,
  DEFICIT_600MM,
  DEFICIT_800MM,
  DEFICIT_ETO,
  EC,
  FLOW_DAILY,
  FLOW_HOURLY,
  RAIN_HUMIDITY,
  SOIL_TEMPERATURE,
  VOLT_READINGS,
  VPD
} from '../../../tools/general/system-variables.util';

export const chartByName = (chartName, isDarkMode) => {

  switch (chartName) {
    case DEFICIT_100MM:
      return { height: '15.8%' };
    case DEFICIT_200MM:
      return { height: '15.8%' };
    case DEFICIT_300MM:
      return { height: '15.8%' };
    case DEFICIT_400MM :
      return { height: '15.8%' };
    case DEFICIT_600MM :
      return { height: '16%' };
    case DEFICIT_800MM :
      return { height: '16%' };
    case AGGREGATE_TOP_SOIL :
      return { header: 'Topsoil', height: '40%', backgroundColor: isDarkMode ? '#607CB1' : '#ABD4EF' };
    case AGGREGATE_BOTTOM_SOIL :
      return { header: 'Bottomsoil', height: '40%', marginTop: '2.5%', backgroundColor: isDarkMode ? '#0C6921' : '#C1EAC7' };
    case DEFICIT_ETO:
    case VOLT_READINGS:
    case FLOW_HOURLY:
    case FLOW_DAILY:
    case EC:
    case VPD:
    case ACTUAL_IRRIGATION:
    case DAILY_ETO:
      return { header: chartName, height: '35%' };
    case SOIL_TEMPERATURE :
    case CANOPY_OUTSIDE_TEMPERATURE :
    case RAIN_HUMIDITY :
      return { height: '33.3%' };
    default:
      return { height: '33.3%' };
  }
};
