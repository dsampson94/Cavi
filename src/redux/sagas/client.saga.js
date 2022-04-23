import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import {
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SPINNER_TEXT,
  SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  SUCCESSFULLY_RETRIEVED_FIELDS
} from '../../tools/general/system-variables.util';
import { getResponseMetaData, responseStatus } from '../endpoints/index';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import {
  GET_CLIENT_FIELD_LIST,
  GET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA
} from '../actions/client.action';
import { requestClientFieldListRequest, requestClientFieldRainDataRequest } from '../endpoints/client.endpoint';

export function* performRetrieveClientFieldListRequest({ client, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));

    const [endpoint, requestOptions] = requestClientFieldListRequest(client);

    const { data } = yield call(axios, endpoint, requestOptions);

    const { responseMessage, responseColor } = getResponseMetaData(data);

    switch (data.success) {
      case responseStatus.ERROR:
        yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
        yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));

        if (onError) {
          yield call(onError);
        }

        yield put(setSpinnerText(null));

        return;
      case responseStatus.SUCCESS:
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELDS, responseColor, SNACK_SUCCESS));
        yield put({ type: SET_CLIENT_FIELD_LIST, fieldList: data });

        if (onSuccess) {
          yield call(onSuccess, data);
        }

        yield put(setSpinnerText(null));
    }
  } catch ({ response }) {
    yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
    const { responseMessage, responseColor } = getResponseMetaData(response);
    yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));
    yield put(setSpinnerText(null));

    if (onError) {
      yield call(onError);
    }
  }
}

export function* watchForRetrieveClientFieldListRequest() {
  yield takeLatest(GET_CLIENT_FIELD_LIST, performRetrieveClientFieldListRequest);
}

export function* performRetrieveClientFieldRainDataRequest({ client, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));

    const [endpoint, requestOptions] = requestClientFieldRainDataRequest(client);

    const { data } = yield call(axios, endpoint, requestOptions);

    const { responseMessage, responseColor } = getResponseMetaData(data);

    switch (data.success) {
      case responseStatus.ERROR:
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
        yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));

        if (onError) {
          yield call(onError);
        }

        yield put(setSpinnerText(null));

        return;
      case responseStatus.SUCCESS:
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, responseColor, SNACK_SUCCESS));
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, fieldRainData: data });

        if (onSuccess) {
          yield call(onSuccess, data);
        }

        yield put(setSpinnerText(null));
    }
  } catch ({ response }) {
    yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
    const { responseMessage, responseColor } = getResponseMetaData(response);
    yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));
    yield put(setSpinnerText(null));

    if (onError) {
      yield call(onError);
    }
  }
}

export function* watchForRetrieveClientFieldRainDataRequest() {
  yield takeLatest(GET_CLIENT_FIELD_RAIN_DATA, performRetrieveClientFieldRainDataRequest);
}

export default function* clientSaga() {
  yield all([
    watchForRetrieveClientFieldListRequest(),
    watchForRetrieveClientFieldRainDataRequest()
  ]);
}
