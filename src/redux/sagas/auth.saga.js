import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import { SNACK_CRITICAL, SNACK_SUCCESS, SPINNER_TEXT } from '../../tools/general/system-variables.util';
import { saveUserClientListToLocalStorage } from '../../tools/storage/localStorage';

import { getResponseMetaData, requestResponse } from '../endpoints/index';
import { getLoginRequest } from '../endpoints/auth.endpoints';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import { USER_LOGIN } from '../actions/auth.action';

export function* performLoginRequest({ user, onSuccess }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));
    const [endpoint, requestOptions] = getLoginRequest(user);
    const { data } = yield call(axios, endpoint, requestOptions);
    const { responseMessage } = getResponseMetaData(data);

    switch (data.success) {
      case requestResponse().ERROR:
        yield put(addSystemNotice(data?.snackbartext, SNACK_CRITICAL));
        return;

      case requestResponse().SUCCESS:
        delete data.success;delete data.snackbartext;delete data.snackbarcolor;
        yield call(saveUserClientListToLocalStorage, data);
        yield put(addSystemNotice(responseMessage, SNACK_SUCCESS));
        if (onSuccess) yield call(onSuccess, data);
    }

  } catch ({ response }) {
    yield put(addSystemNotice(getResponseMetaData(response), SNACK_CRITICAL));
  } finally {
    yield put(setSpinnerText(null));
  }
}

export function* watchForLoginRequest() {
  yield takeLatest(USER_LOGIN, performLoginRequest);
}

export default function* authSaga() {
  yield all([
    watchForLoginRequest()
  ]);
}
