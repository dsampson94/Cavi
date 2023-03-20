import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import {
  COMPLETE_PROGRESS,
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SUCCESSFULLY_CALIBRATED_PROBE,
  SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST,
  SUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST,
  UNSUCCESSFULLY_CALIBRATED_PROBE,
  UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST
} from '../../tools/general/system-variables.util';
import { generateId, getProgress } from '../../tools/general/helpers.util';

import { responseStatus } from '../endpoints/index';

import { getChartProbeCalibrationRequest, getExtendedChartList, getFieldChartListRequest, getFieldSetupList, getSetFieldSetup } from '../endpoints/field.endpoints';

import { addSystemNotice, setProgressBar, setSpinnerText } from '../actions/system.action';
import {
  REQUEST_EXTENDED_FIELD_CHART_LIST,
  REQUEST_FIELD_CHART_LIST,
  REQUEST_FIELD_SETUP_LIST,
  REQUEST_PROBE_CALIBRATION,
  REQUEST_SET_FIELD_SETUP,
  SET_FIELD_CHART_LIST,
  SET_FIELD_EC_CHART_LIST,
  SET_FIELD_FLOW_METER_DAILY_CHART_LIST,
  SET_FIELD_FLOW_METER_HOURLY_CHART_LIST,
  SET_FIELD_MOTTECH_CHART_LIST,
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

export function* performRetrieveFieldChartListRequest({ field }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getFieldChartListRequest(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_FIELD_CHART_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_FIELD_CHART_LIST, chartList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_FIELD_CHART_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveFieldChartListRequest() {
  yield takeLatest(REQUEST_FIELD_CHART_LIST, performRetrieveFieldChartListRequest);
}

export function* performChartCalibrateProbeRequest({ field }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getChartProbeCalibrationRequest(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put(addSystemNotice(UNSUCCESSFULLY_CALIBRATED_PROBE, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put(addSystemNotice(SUCCESSFULLY_CALIBRATED_PROBE, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put(addSystemNotice(UNSUCCESSFULLY_CALIBRATED_PROBE, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForChartCalibrateProbeRequest() {
  yield takeLatest(REQUEST_PROBE_CALIBRATION, performChartCalibrateProbeRequest);
}

export function* performRetrieveExtendedFieldChartListRequest({ field, use }) {

  const getUseType = () => {
    switch (use) {
      case SET_FIELD_VOLT_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_VOLT_CHART_LIST,
          stateObject: 'voltChartList'
        };
      case SET_FIELD_FLOW_METER_DAILY_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
          stateObject: 'flowMeterDailyList'
        };
      case SET_FIELD_FLOW_METER_HOURLY_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_FLOW_METER_CHART_LIST,
          stateObject: 'flowMeterHourlyList'
        };
      case SET_FIELD_EC_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_EC_CHART_LIST,
          stateObject: 'ECList'
        };
      case SET_FIELD_VPD_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_VPD_CHART_LIST,
          stateObject: 'VPDList'
        };
      case SET_FIELD_MOTTECH_CHART_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_MOTTECH_CHART_LIST,
          stateObject: 'mottechList'
        };
      case SET_SOIL_TEMP_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SOIL_TEMP_CHART_LIST,
          stateObject: 'soilTempList'
        };
    }
  };

  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getExtendedChartList(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: getUseType().type, undefined });
        yield put(addSystemNotice(getUseType().errorNotice, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: getUseType().type, [getUseType().stateObject]: data });
        yield put(addSystemNotice(getUseType().successNotice, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: getUseType().type, undefined });
    yield put(addSystemNotice(getUseType().errorNotice, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveExtendedFieldChartListRequest() {
  yield takeLatest(REQUEST_EXTENDED_FIELD_CHART_LIST, performRetrieveExtendedFieldChartListRequest);
}

export function* performRetrieveFieldSetupListRequest({ field, use }) {

  const getUseType = () => {
    switch (use) {
      case SET_FIELD_SETUP_GENERAL_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupGeneralList'
        };
      case SET_FIELD_SETUP_PROBES_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupProbesList'
        };
      case SET_FIELD_SETUP_PROBES_DETAILED_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupProbesDetailedList'
        };
      case SET_FIELD_SETUP_SENSORS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupSensorsList'
        };
      case SET_FIELD_SETUP_ROOTS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupRootsList'
        };
      case SET_FIELD_SETUP_CROP_FACTORS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupCropFactorsList'
        };
      case SET_FIELD_SETUP_CROP_DETAILS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupCropDetailsList'
        };
      case SET_FIELD_SETUP_WEATHER_STATION_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupWeatherStationList'
        };
      case SET_FIELD_SETUP_IRRIGATION_SYSTEM_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupIrrigationSystemList'
        };
      case SET_FIELD_SETUP_IRRIGATION_DAYS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupIrrigationDaysList'
        };
      case SET_FIELD_SETUP_PUSH_WARNING_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupPushWarningList'
        };
      case SET_FIELD_SETUP_SMS_WARNING_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupSMSWarningList'
        };
      case SET_FIELD_SETUP_SPLIT_VALVES_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupSplitValvesList'
        };
      case SET_FIELD_SETUP_BILLING_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupBillingList'
        };
      case SET_FIELD_SETUP_CLIENT_DETAILS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupClientDetailsList'
        };
      case SET_FIELD_SETUP_USERS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupUsersList'
        };
      case SET_FIELD_SETUP_SMS_RECOMMENDATION_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupSMSRecommendationList'
        };
      case SET_FIELD_SETUP_ML_FORECASTS_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupMLForecastList'
        };
      case SET_FIELD_SETUP_SASRI_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupSASRIList'
        };
      case SET_FIELD_SETUP_PHENOLOGICAL_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupPhenologicalList'
        };
      case SET_FIELD_SETUP_MAP_LIST:
        return {
          type: use,
          successNotice: SUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          errorNotice: UNSUCCESSFULLY_RETRIEVED_FIELD_SETUP_LIST,
          stateObject: 'fieldSetupMapList'
        };
    }
  };

  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getFieldSetupList(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: getUseType().type, undefined });
        yield put(addSystemNotice(getUseType().errorNotice, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: getUseType().type, [getUseType().stateObject]: data });
        yield put(addSystemNotice(getUseType().successNotice, SNACK_SUCCESS));
    }

    yield put(setSpinnerText(null));

  } catch ({ response }) {
    yield put({ type: getUseType().type, undefined });
    yield put(addSystemNotice(getUseType().errorNotice, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveFieldSetupListRequest() {
  yield takeLatest(REQUEST_FIELD_SETUP_LIST, performRetrieveFieldSetupListRequest);
}

export function* performSetFieldSetupRequest({ field }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getSetFieldSetup(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_FIELD_CHART_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_FIELD_CHART_LIST, chartList: { data, id: generateId() } });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_FIELD_CHART_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForSetFieldSetupRequest() {
  yield takeLatest(REQUEST_SET_FIELD_SETUP, performSetFieldSetupRequest);
}

export default function* fieldSaga() {
  yield all([
    watchForRetrieveFieldChartListRequest(),
    watchForChartCalibrateProbeRequest(),
    watchForRetrieveExtendedFieldChartListRequest(),
    watchForRetrieveFieldSetupListRequest(),
    watchForSetFieldSetupRequest()
  ]);
}
