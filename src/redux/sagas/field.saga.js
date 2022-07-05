import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import {
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SPINNER_TEXT,
  SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST,
  UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST
} from '../../tools/general/system-variables.util';
import { saveChartDepthsToLocalStorage } from '../../tools/storage/localStorage';

import { responseStatus } from '../endpoints/index';

import { getFieldChartListRequest } from '../endpoints/field.endpoints';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import { GET_FIELD_CHART_LIST, SET_FIELD_CHART_LIST } from '../actions/field.action';

export function* performRetrieveFieldChartListRequest({ field, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));
    const [endpoint, requestOptions] = getFieldChartListRequest(field);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_FIELD_CHART_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
        if (onError) yield call(onError);
        yield put(setSpinnerText(null));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_FIELD_CHART_LIST, chartList: data });
        saveChartDepthsToLocalStorage(data.dieptes);
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_SUCCESS));
        if (onSuccess) yield call(onSuccess, data);
        yield put(setSpinnerText(null));
    }

  } catch ({ response }) {
    yield put({ type: SET_FIELD_CHART_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_CHART_LIST, SNACK_CRITICAL));
    if (onError) yield call(onError);
    yield put(setSpinnerText(null));
  }
}

export function* watchForRetrieveFieldChartListRequest() {
  yield takeLatest(GET_FIELD_CHART_LIST, performRetrieveFieldChartListRequest);
}

export default function* fieldSaga() {
  yield all([
    watchForRetrieveFieldChartListRequest()
  ]);
}
