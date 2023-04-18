import {
  SET_FIELD_CHART_LIST,
  SET_FIELD_EC_CHART_LIST,
  SET_FIELD_FLOW_METER_DAILY_CHART_LIST,
  SET_FIELD_FLOW_METER_HOURLY_CHART_LIST,
  SET_FIELD_MOTTECH_CHART_LIST,
  SET_FIELD_REPORTS_LIST,
  SET_FIELD_SETUP_BILLING_LIST,
  SET_FIELD_SETUP_CLIENT_DETAILS_LIST,
  SET_FIELD_SETUP_CROP_DETAILS_LIST,
  SET_FIELD_SETUP_CROP_FACTORS_LIST,
  SET_FIELD_SETUP_GENERAL_LIST,
  SET_FIELD_SETUP_IRRIGATION_DAYS_LIST,
  SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST,
  SET_FIELD_SETUP_MAP_LIST,
  SET_FIELD_SETUP_ML_FORECASTS_LIST,
  SET_FIELD_SETUP_PHENOLOGICAL_LIST,
  SET_FIELD_SETUP_PROBES_DETAILED_LIST,
  SET_FIELD_SETUP_PROBES_LIST,
  SET_FIELD_SETUP_PUSH_WARNING_LIST,
  SET_FIELD_SETUP_ROOTS_LIST,
  SET_FIELD_SETUP_SASRI_LIST,
  SET_FIELD_SETUP_SENSORS_LIST,
  SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST,
  SET_FIELD_SETUP_SMS_WARNING_LIST,
  SET_FIELD_SETUP_SPLIT_VALVES_LIST,
  SET_FIELD_SETUP_USERS_LIST,
  SET_FIELD_SETUP_WEATHER_STATION_LIST,
  SET_FIELD_VOLT_CHART_LIST,
  SET_FIELD_VPD_CHART_LIST,
  SET_SOIL_TEMP_LIST
} from '../actions/field.action';

export const initialState = {
  chartList: undefined,
  voltChartList: undefined,
  flowMeterDailyList: undefined,
  flowMeterHourlyList: undefined,
  ECList: undefined,
  VPDList: undefined,
  mottechList: undefined,
  soilTempList: undefined,
  fieldSetupGeneralList: undefined,
  fieldSetupProbesList: undefined,
  fieldSetupProbesDetailedList: undefined,
  fieldSetupSensorsList: undefined,
  fieldSetupRootsList: undefined,
  fieldSetupCropFactorsList: undefined,
  fieldSetupCropDetailsList: undefined,
  fieldSetupWeatherStationList: undefined,
  fieldSetupIrrigationSystemList: undefined,
  fieldSetupIrrigationDaysList: undefined,
  fieldSetupPushWarningList: undefined,
  fieldSetupSMSWarningList: undefined,
  fieldSetupSplitValvesList: undefined,
  fieldSetupBillingList: undefined,
  fieldSetupUsersList: undefined,
  fieldSetupClientDetailsList: undefined,
  fieldSetupSMSRecommendationList: undefined,
  fieldSetupMLForecastList: undefined,
  fieldSetupSASRIList: undefined,
  fieldSetupPhenologicalList: undefined,
  fieldSetupMapList: undefined,
  fieldReportsList: undefined
};

export const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_CHART_LIST: {
      const { chartList } = action;
      return {
        ...state,
        chartList
      };
    }
    case SET_FIELD_VOLT_CHART_LIST: {
      const { voltChartList } = action;
      return {
        ...state,
        voltChartList
      };
    }
    case SET_FIELD_FLOW_METER_DAILY_CHART_LIST: {
      const { flowMeterDailyList } = action;
      return {
        ...state,
        flowMeterDailyList
      };
    }
    case SET_FIELD_FLOW_METER_HOURLY_CHART_LIST: {
      const { flowMeterHourlyList } = action;
      return {
        ...state,
        flowMeterHourlyList
      };
    }
    case SET_FIELD_EC_CHART_LIST: {
      const { ECList } = action;
      return {
        ...state,
        ECList
      };
    }
    case SET_FIELD_VPD_CHART_LIST: {
      const { VPDList } = action;
      return {
        ...state,
        VPDList
      };
    }
    case SET_FIELD_MOTTECH_CHART_LIST: {
      const { mottechList } = action;
      return {
        ...state,
        mottechList
      };
    }
    case SET_SOIL_TEMP_LIST: {
      const { soilTempList } = action;
      return {
        ...state,
        soilTempList
      };
    }
    case SET_FIELD_SETUP_GENERAL_LIST: {
      const { fieldSetupGeneralList } = action;
      return {
        ...state,
        fieldSetupGeneralList
      };
    }
    case SET_FIELD_SETUP_PROBES_LIST: {
      const { fieldSetupProbesList } = action;
      return {
        ...state,
        fieldSetupProbesList
      };
    }
    case SET_FIELD_SETUP_PROBES_DETAILED_LIST: {
      const { fieldSetupProbesDetailedList } = action;
      return {
        ...state,
        fieldSetupProbesDetailedList
      };
    }
    case SET_FIELD_SETUP_SENSORS_LIST: {
      const { fieldSetupSensorsList } = action;
      return {
        ...state,
        fieldSetupSensorsList
      };
    }
    case SET_FIELD_SETUP_ROOTS_LIST: {
      const { fieldSetupRootsList } = action;
      return {
        ...state,
        fieldSetupRootsList
      };
    }
    case SET_FIELD_SETUP_CROP_FACTORS_LIST: {
      const { fieldSetupCropFactorsList } = action;
      return {
        ...state,
        fieldSetupCropFactorsList
      };
    }
    case SET_FIELD_SETUP_CROP_DETAILS_LIST: {
      const { fieldSetupCropDetailsList } = action;
      return {
        ...state,
        fieldSetupCropDetailsList
      };
    }
    case SET_FIELD_SETUP_WEATHER_STATION_LIST: {
      const { fieldSetupWeatherStationList } = action;
      return {
        ...state,
        fieldSetupWeatherStationList
      };
    }
    case SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST: {
      const { fieldSetupIrrigationSystemList } = action;
      return {
        ...state,
        fieldSetupIrrigationSystemList
      };
    }
    case SET_FIELD_SETUP_IRRIGATION_DAYS_LIST: {
      const { fieldSetupIrrigationDaysList } = action;
      return {
        ...state,
        fieldSetupIrrigationDaysList
      };
    }
    case SET_FIELD_SETUP_PUSH_WARNING_LIST: {
      const { fieldSetupPushWarningList } = action;
      return {
        ...state,
        fieldSetupPushWarningList
      };
    }
    case SET_FIELD_SETUP_SMS_WARNING_LIST: {
      const { fieldSetupSMSWarningList } = action;
      return {
        ...state,
        fieldSetupSMSWarningList
      };
    }
    case SET_FIELD_SETUP_SPLIT_VALVES_LIST: {
      const { fieldSetupSplitValvesList } = action;
      return {
        ...state,
        fieldSetupSplitValvesList
      };
    }
    case SET_FIELD_SETUP_BILLING_LIST: {
      const { fieldSetupBillingList } = action;
      return {
        ...state,
        fieldSetupBillingList
      };
    }
    case SET_FIELD_SETUP_CLIENT_DETAILS_LIST: {
      const { fieldSetupClientDetailsList } = action;
      return {
        ...state,
        fieldSetupClientDetailsList
      };
    }
    case SET_FIELD_SETUP_USERS_LIST: {
      const { fieldSetupUsersList } = action;
      return {
        ...state,
        fieldSetupUsersList
      };
    }
    case SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST: {
      const { fieldSetupSMSRecommendationList } = action;
      return {
        ...state,
        fieldSetupSMSRecommendationList
      };
    }
    case SET_FIELD_SETUP_ML_FORECASTS_LIST: {
      const { fieldSetupMLForecastList } = action;
      return {
        ...state,
        fieldSetupMLForecastList
      };
    }
    case SET_FIELD_SETUP_SASRI_LIST: {
      const { fieldSetupSASRIList } = action;
      return {
        ...state,
        fieldSetupSASRIList
      };
    }
    case SET_FIELD_SETUP_PHENOLOGICAL_LIST: {
      const { fieldSetupPhenologicalList } = action;
      return {
        ...state,
        fieldSetupPhenologicalList
      };
    }
    case SET_FIELD_SETUP_MAP_LIST: {
      const { fieldSetupMapList } = action;
      return {
        ...state,
        fieldSetupMapList
      };
    }
    case SET_FIELD_REPORTS_LIST: {
      const { fieldReportsList } = action;
      return {
        ...state,
        fieldReportsList
      };
    }
    default:
      return state;
  }
};
