import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import { SNACK_CRITICAL, SNACK_SUCCESS, SPINNER_TEXT } from '../../tools/general/system-variables.util';

import { saveUserToLocalStorage } from '../../tools/storage/localStorage';
import { getResponseMetaData, responseStatus } from '../endpoints/index';
import { getLoginRequest } from '../endpoints/auth.endpoints';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import { LOGIN, SET_LOGGED_IN_USER } from '../actions/auth.action';

export function* performLoginRequest({ user, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));

    const [endpoint, requestOptions] = getLoginRequest(user);

    const { data } = yield call(axios, endpoint, requestOptions);

    const { responseMessage, responseColor } = getResponseMetaData(data);

    switch (data.success) {
      case responseStatus.ERROR:
        yield put({ type: SET_LOGGED_IN_USER, user: undefined });
        yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));

        if (onError) {
          yield call(onError);
        }

        yield put(setSpinnerText(null));

        return;
      case responseStatus.SUCCESS:
        yield put(addSystemNotice(responseMessage, responseColor, SNACK_SUCCESS));
        delete data.success; delete data.snackbartext; delete data.snackbarcolor;
        yield put({ type: SET_LOGGED_IN_USER, user: data });
        yield call(saveUserToLocalStorage, data);

        if (onSuccess) {
          yield call(onSuccess, data);
        }

        yield put(setSpinnerText(null));
    }
  } catch ({ response }) {
    yield put({ type: SET_LOGGED_IN_USER, user: undefined });
    const { responseMessage, responseColor } = getResponseMetaData(response);
    yield put(addSystemNotice(responseMessage, responseColor, SNACK_CRITICAL));
    yield put(setSpinnerText(null));

    if (onError) {
      yield call(onError);
    }
  }
}

export function* watchForLoginRequest() {
  yield takeLatest(LOGIN, performLoginRequest);
}

export default function* authSaga() {
  yield all([
    watchForLoginRequest()
  ]);
}
