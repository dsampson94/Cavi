import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import {
  COMPLETE_PROGRESS,
  HALF_PROGRESS,
  INITIAL_PROGRESS,
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SUCCESSFULLY_EMAILED_PDF,
  SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  SUCCESSFULLY_RETRIEVED_FIELDS,
  SUCCESSFULLY_RETRIEVED_OVERVIEW,
  THREE_QUARTER_PROGRESS,
  UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  UNSUCCESSFULLY_RETRIEVED_FIELDS,
  UNSUCCESSFULLY_RETRIEVED_OVERVIEW,
  UNSUCCESSFULLY_RETRIEVED_PDF
} from '../../tools/general/system-variables.util';

import { responseStatus } from '../endpoints/index';
import {
  getClientFieldListPDFRequest,
  getClientFieldListRequest,
  getClientFieldRainDataRequest,
  getClientOverviewRequest
} from '../endpoints/client.endpoint';

import { addSystemNotice, setProgressBar } from '../actions/system.action';
import {
  GET_CLIENT_FIELD_LIST,
  GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  GET_CLIENT_OVERVIEW_LIST,
  GET_CLIENT_PDF,
  GET_FULL_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  SET_CLIENT_OVERVIEW_LIST,
  SET_CLIENT_PDF
} from '../actions/client.action';

export function* performRetrieveClientOverviewRequest({ client }) {
  try {
    yield put(setProgressBar(INITIAL_PROGRESS));

    const [endpoint, requestOptions] = getClientOverviewRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_OVERVIEW_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_OVERVIEW_LIST, overviewList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_OVERVIEW_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientOverviewRequest() {
  yield takeLatest(GET_CLIENT_OVERVIEW_LIST, performRetrieveClientOverviewRequest);
}

export function* performRetrieveFullClientFieldListRequest({ client }) {
  try {
    yield put(setProgressBar(INITIAL_PROGRESS));

    const [endpoint, requestOptions] = getClientFieldListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_FIELD_LIST, fieldList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELDS, SNACK_SUCCESS));

        try {
          const [endpoint, requestOptions] = getClientFieldRainDataRequest(client);
          const { data } = yield call(axios, endpoint, requestOptions);

          switch (data) {
            case responseStatus(data).ERROR:
              yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
              yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
              return;

            case responseStatus(data).SUCCESS:
              yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, fieldRainData: data });
              yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_SUCCESS));
          }

        } catch ({ response }) {
          yield put({ type: SET_CLIENT_FIELD_RAIN_DATA, undefined });
          yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
        } finally {
          yield put(setProgressBar(COMPLETE_PROGRESS));
        }

    }

  } catch (response) {
    yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveFullClientFieldListRequest() {
  yield takeLatest(GET_FULL_CLIENT_FIELD_LIST, performRetrieveFullClientFieldListRequest);
}

export function* performRetrieveClientFieldListRequest({ client }) {
  try {
    yield put(setProgressBar(INITIAL_PROGRESS));

    const [endpoint, requestOptions] = getClientFieldListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_FIELD_LIST, fieldList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELDS, SNACK_SUCCESS));
    }

  } catch (response) {
    yield put({ type: SET_CLIENT_FIELD_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientFieldListRequest() {
  yield takeLatest(GET_CLIENT_FIELD_LIST, performRetrieveClientFieldListRequest);
}

export function* performRetrieveRainDataForChartRequest({ client }) {
  try {
    yield put(setProgressBar(INITIAL_PROGRESS));

    const [endpoint, requestOptions] = getClientFieldRainDataRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, fieldRainDataForChart: data });
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveRainDataForChartRequest() {
  yield takeLatest(GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART, performRetrieveRainDataForChartRequest);
}

export function* performRetrieveClientPDFRequest({ client }) {
  try {
    yield put(setProgressBar(INITIAL_PROGRESS));

    const [endpoint, requestOptions] = getClientFieldListPDFRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_PDF, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_PDF, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        if (client.mail) {
          yield put(addSystemNotice(SUCCESSFULLY_EMAILED_PDF, SNACK_SUCCESS));
        }

        yield put({ type: SET_CLIENT_PDF, clientPDF: data });
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_PDF, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_PDF, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientPDFRequest() {
  yield takeLatest(GET_CLIENT_PDF, performRetrieveClientPDFRequest);
}

export default function* clientSaga() {
  yield all([
    watchForRetrieveClientOverviewRequest(),
    watchForRetrieveFullClientFieldListRequest(),
    watchForRetrieveClientFieldListRequest(),
    watchForRetrieveRainDataForChartRequest(),
    watchForRetrieveClientPDFRequest()
  ]);
}
