import axios from 'axios';
import { all, call, takeLatest } from '@redux-saga/core/effects';

import { saveGraphicOneToLocalStorage } from '../../tools/storage/localStorage';

import { responseStatus } from '../endpoints';
import { getRetrieveGraphicOneRequest } from '../endpoints/graphic.endpoints';

import { GET_GRAPHIC_ONE } from '../actions/graphic.action';
import { toBase64String } from '../../tools/general/helpers.util';

export function* performGetGraphicOneRequest({ onError }) {
  try {
    const [endpoint, requestOptions] = getRetrieveGraphicOneRequest();

    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data.success) {
      case responseStatus.ERROR: {
        return;
      }
      default: {
        toBase64String(endpoint, (dataUrl) => {
          saveGraphicOneToLocalStorage(dataUrl);
        });
      }
    }
  } catch ({ response }) {
    if (onError) {
      yield call(onError);
    }
  }
}

export function* watchForGetGraphicOneRequest() {
  yield takeLatest(GET_GRAPHIC_ONE, performGetGraphicOneRequest);
}

export default function* graphicSaga() {
  yield all([
    watchForGetGraphicOneRequest()
  ]);
}
