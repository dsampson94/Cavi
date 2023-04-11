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
  ETO_WEATHER,
  FLOW_DAILY,
  FLOW_HOURLY,
  HUMIDITY_WEATHER,
  RAIN_HUMIDITY,
  RAIN_WEATHER,
  SOIL_TEMPERATURE,
  TEMP_WEATHER,
  VOLT_READINGS,
  VPD,
  WIND_WEATHER
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
      return { height: '25%', backgroundColor: isDarkMode ? '#607CB1' : '#ABD4EF' };
    case AGGREGATE_BOTTOM_SOIL :
      return { height: '24.5%', backgroundColor: isDarkMode ? '#0C6921' : '#C1EAC7' };
    case DEFICIT_ETO:
      return { height: '22.5%' };
    case DAILY_ETO:
      return { height: '23%' };
    case VOLT_READINGS:
    case FLOW_HOURLY:
    case FLOW_DAILY:
    case EC:
    case VPD:
    case ACTUAL_IRRIGATION:
      return { header: chartName, height: '35%' };
    case SOIL_TEMPERATURE :
    case CANOPY_OUTSIDE_TEMPERATURE :
    case RAIN_HUMIDITY :
      return { height: '33.3%' };
    case ETO_WEATHER :
    case TEMP_WEATHER :
    case HUMIDITY_WEATHER :
    case WIND_WEATHER :
    case RAIN_WEATHER :
      return { height: '15%' };
    default:
      return { height: '33.3%' };
  }
};
