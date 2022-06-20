import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import { SNACK_CRITICAL, SNACK_SUCCESS, SPINNER_TEXT } from '../../tools/general/system-variables.util';
import { saveUserClientListToLocalStorage } from '../../tools/storage/localStorage';

import { getResponseMetaData, responseStatus } from '../endpoints/index';
import { getLoginRequest } from '../endpoints/auth.endpoints';

import { addSystemNotice, setSpinnerText } from '../actions/system.action';
import { USER_LOGIN } from '../actions/auth.action';

export function* performLoginRequest({ user, onSuccess, onError }) {
  try {
    yield put(setSpinnerText(SPINNER_TEXT));
    const [endpoint, requestOptions] = getLoginRequest(user);
    const { data } = yield call(axios, endpoint, requestOptions);
    const { responseMessage } = getResponseMetaData(data);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put(addSystemNotice(responseMessage, SNACK_CRITICAL));
        if (onError) yield call(onError);
        yield put(setSpinnerText(null));
        return;

      case responseStatus(data).SUCCESS:
        delete data.success; delete data.snackbartext; delete data.snackbarcolor;
        yield call(saveUserClientListToLocalStorage, data);
        yield put(addSystemNotice(responseMessage, SNACK_SUCCESS));
        if (onSuccess) yield call(onSuccess, data);
        yield put(setSpinnerText(null));
    }

  } catch ({ response }) {
    yield put(addSystemNotice(getResponseMetaData(response), SNACK_CRITICAL));
    yield put(setSpinnerText(null));
    if (onError) yield call(onError);
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
