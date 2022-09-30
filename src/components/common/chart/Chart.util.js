import React from 'react';
import {
  ACTUAL_IRRIGATION,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
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
  FLOW_DETAILED,
  TEMPERATURE_MULTILINE,
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
      return { header: DEFICIT_ETO, height: '35%' };
    case VOLT_READINGS:
      return { header: VOLT_READINGS, height: '35%' };
    case FLOW_DETAILED:
      return { header: FLOW_DETAILED, height: '35%' };
    case FLOW_DAILY:
      return { header: FLOW_DAILY, height: '35%' };
    case EC :
      return { header: EC, height: '35%' };
    case VPD :
      return { header: VPD, height: '35%' };
    case ACTUAL_IRRIGATION:
      return { header: ACTUAL_IRRIGATION, height: '35%' };
    case DAILY_ETO:
      return { header: DAILY_ETO, height: '35%' };
    case TEMPERATURE_MULTILINE :
      return { height: '33.3%' };
  }
};
