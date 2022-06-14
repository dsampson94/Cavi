import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import {
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SPINNER_TEXT,
  SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  SUCCESSFULLY_RETRIEVED_FIELDS,
  UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  UNSUCCESSFULLY_RETRIEVED_FIELDS,
  UNSUCCESSFULLY_RETRIEVED_PDF
} from '../../tools/general/system-variables.util';

import { responseStatus } from '../endpoints/index';
import {
  requestClientFieldListPDFRequest,
  requestClientFieldListRequest,
  requestClientFieldRainDataRequest
} from '../endpoints/client.endpoint';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import {
  GET_CLIENT_FIELD_LIST,
  GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  GET_CLIENT_PDF,
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  SET_CLIENT_PDF
} from '../actions/client.action';

export function* performRetrieveClientFieldListRequest({ client, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));
    const [endpoint, requestOptions] = requestClientFieldListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
        if (onError) yield call(onError);
        yield put(setSpinnerText(null));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_FIELD_LIST, fieldList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELDS, SNACK_SUCCESS));
        try {
          yield put(setSpinnerText(SPINNER_TEXT));
          const [endpoint, requestOptions] = requestClientFieldRainDataRequest(client);
          const { data } = yield call(axios, endpoint, requestOptions);

          switch (data) {
            case responseStatus(data).ERROR:
              yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
              yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
              if (onError) yield call(onError);
              yield put(setSpinnerText(null));
              return;

            case responseStatus(data).SUCCESS:
              yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, fieldRainData: data });
              yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_SUCCESS));
              if (onSuccess) yield call(onSuccess, data);
              yield put(setSpinnerText(null));
          }

        } catch (response) {
          yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
          yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
          yield put(setSpinnerText(null));
          if (onError) yield call(onError);
        }

        if (onSuccess) yield call(onSuccess, data);
        yield put(setSpinnerText(null));
    }

  } catch (response) {
    yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
    yield put(setSpinnerText(null));
    if (onError) yield call(onError);
  }
}

export function* watchForRetrieveClientFieldListRequest() {
  yield takeLatest(GET_CLIENT_FIELD_LIST, performRetrieveClientFieldListRequest);
}

export function* performRetrieveRainDataForChartRequest({ client, onSuccess, onError }) {
  try {
    const [endpoint, requestOptions] = requestClientFieldRainDataRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
        if (onError) yield call(onError);
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, fieldRainDataForChart: data });
        if (onSuccess) yield call(onSuccess, data);
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
    if (onError) yield call(onError);
  }
}

export function* watchForRetrieveRainDataForChartRequest() {
  yield takeLatest(GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, performRetrieveRainDataForChartRequest);
}

export function* performRetrieveClientPDFRequest({ client, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));
    const [endpoint, requestOptions] = requestClientFieldListPDFRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_PDF, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_PDF, SNACK_CRITICAL));
        if (onError) yield call(onError);
        yield put(setSpinnerText(null));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_PDF, clientPDF: data });
        if (onSuccess) yield call(onSuccess, data);
        yield put(setSpinnerText(null));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_PDF, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_PDF, SNACK_CRITICAL));
    yield put(setSpinnerText(null));
    if (onError) yield call(onError);
  }
}

export function* watchForRetrieveClientPDFRequest() {
  yield takeLatest(GET_CLIENT_PDF, performRetrieveClientPDFRequest);
}

export default function* clientSaga() {
  yield all([
    watchForRetrieveClientFieldListRequest(),
    watchForRetrieveRainDataForChartRequest(),
    watchForRetrieveClientPDFRequest()
  ]);
}
