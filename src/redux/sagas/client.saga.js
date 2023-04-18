import axios from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';

import { responseStatus } from '../endpoints/index';
import {
  getAdminUserListRequest,
  getClientFieldListPDFRequest,
  getClientFieldListRequest,
  getClientFieldRainDataRequest,
  getClientFieldWeatherListRequest,
  getClientLastReadingsListRequest,
  getClientMonitorProbesListRequest,
  getClientOverviewListRequest,
  getClientRawReadingsChartRequest,
  getClientRawReadingsRequest
} from '../endpoints/client.endpoint';

import { getProgress } from '../../tools/general/helpers.util';

import { addSystemNotice, setProgressBar } from '../actions/system.action';
import {
  GET_ADMIN_USER_LIST,
  GET_CLIENT_FIELD_LIST,
  GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  GET_CLIENT_FIELD_WEATHER_LIST,
  GET_CLIENT_LAST_READINGS_LIST,
  GET_CLIENT_MONITOR_PROBES_LIST,
  GET_CLIENT_OVERVIEW_LIST,
  GET_CLIENT_PDF,
  GET_CLIENT_RAW_READINGS,
  GET_CLIENT_RAW_READINGS_CHART,
  GET_FULL_CLIENT_FIELD_LIST,
  SET_ADMIN_USER_LIST,
  SET_CLIENT_FIELD_LIST,
  SET_CLIENT_FIELD_RAIN_DATA,
  SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
  SET_CLIENT_FIELD_WEATHER_LIST_1,
  SET_CLIENT_FIELD_WEATHER_LIST_2,
  SET_CLIENT_FIELD_WEATHER_LIST_3,
  SET_CLIENT_FIELD_WEATHER_LIST_4,
  SET_CLIENT_LAST_READINGS_LIST,
  SET_CLIENT_MONITOR_PROBES_LIST,
  SET_CLIENT_OVERVIEW_LIST,
  SET_CLIENT_PDF,
  SET_CLIENT_RAW_READINGS,
  SET_CLIENT_RAW_READINGS_CHART
} from '../actions/client.action';

import {
  COMPLETE_PROGRESS,
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SUCCESSFULLY_EMAILED_PDF,
  SUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  SUCCESSFULLY_RETRIEVED_FIELDS,
  SUCCESSFULLY_RETRIEVED_OVERVIEW,
  UNSUCCESSFULLY_RETRIEVED_FIELD_RAIN_DATA,
  UNSUCCESSFULLY_RETRIEVED_FIELDS,
  UNSUCCESSFULLY_RETRIEVED_OVERVIEW,
  UNSUCCESSFULLY_RETRIEVED_PDF
} from '../../tools/general/system-variables.util';

export function* performRetrieveClientOverviewRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientOverviewListRequest(client);
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

export function* performRetrieveClientMonitorProbesListRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientMonitorProbesListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_MONITOR_PROBES_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_MONITOR_PROBES_LIST, monitorProbesList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_MONITOR_PROBES_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientMonitorProbesListRequest() {
  yield takeLatest(GET_CLIENT_MONITOR_PROBES_LIST, performRetrieveClientMonitorProbesListRequest);
}

export function* performRetrieveClientLastReadingsListRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientLastReadingsListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_LAST_READINGS_LIST, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_LAST_READINGS_LIST, lastReadingsList: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_LAST_READINGS_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientLastReadingsListRequest() {
  yield takeLatest(GET_CLIENT_LAST_READINGS_LIST, performRetrieveClientLastReadingsListRequest);
}

export function* performRetrieveClientRawReadingsRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientRawReadingsRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_RAW_READINGS, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_RAW_READINGS, rawReadings: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_RAW_READINGS, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientRawReadingsRequest() {
  yield takeLatest(GET_CLIENT_RAW_READINGS, performRetrieveClientRawReadingsRequest);
}

export function* performRetrieveClientRawReadingsChartRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientRawReadingsChartRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_RAW_READINGS_CHART, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_CLIENT_RAW_READINGS_CHART, rawReadingsChart: data });
        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_SUCCESS));
    }

  } catch ({ response }) {
    yield put({ type: SET_CLIENT_RAW_READINGS_CHART, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientRawReadingsChartRequest() {
  yield takeLatest(GET_CLIENT_RAW_READINGS_CHART, performRetrieveClientRawReadingsChartRequest);
}

export function* performRetrieveFullClientFieldListRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

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
    yield put(setProgressBar(getProgress()));

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

export function* performRetrieveClientFieldWeatherListRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getClientFieldWeatherListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_1, undefined });
        yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_2, undefined });
        yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_3, undefined });
        yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
        return;

      case responseStatus(data).SUCCESS:
        if (client.dash === 1) {
          yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_1, weatherList1: data });
        } else if (client.requestOption === 2) {
          yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_2, weatherList2: data });
        } else if (client.requestOption === 3) {
          yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_3, weatherList3: data });
        } else if (client.requestOption === 4) {
          yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_4, weatherList4: data });
        }

        yield put(addSystemNotice(SUCCESSFULLY_RETRIEVED_FIELDS, SNACK_SUCCESS));
    }

  } catch (response) {
    yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_1, undefined });
    yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_2, undefined });
    yield put({ type: SET_CLIENT_FIELD_WEATHER_LIST_3, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_FIELDS, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForRetrieveClientFieldWeatherListRequest() {
  yield takeLatest(GET_CLIENT_FIELD_WEATHER_LIST, performRetrieveClientFieldWeatherListRequest);
}

export function* performRetrieveRainDataForChartRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

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
    yield put(setProgressBar(getProgress()));

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

export function* performGetAdminUserListRequest({ client }) {
  try {
    yield put(setProgressBar(getProgress()));

    const [endpoint, requestOptions] = getAdminUserListRequest(client);
    const { data } = yield call(axios, endpoint, requestOptions);

    switch (data) {
      case responseStatus(data).ERROR:
        yield put({ type: SET_ADMIN_USER_LIST, undefined });
        return;

      case responseStatus(data).SUCCESS:
        yield put({ type: SET_ADMIN_USER_LIST, adminUserList: data });
    }

  } catch ({ response }) {
    yield put({ type: SET_ADMIN_USER_LIST, undefined });
    yield put(addSystemNotice(UNSUCCESSFULLY_RETRIEVED_OVERVIEW, SNACK_CRITICAL));
  } finally {
    yield put(setProgressBar(COMPLETE_PROGRESS));
  }
}

export function* watchForGetAdminUserListRequest() {
  yield takeLatest(GET_ADMIN_USER_LIST, performGetAdminUserListRequest);
}

export default function* clientSaga() {
  yield all([
    watchForRetrieveClientOverviewRequest(),
    watchForRetrieveClientMonitorProbesListRequest(),
    watchForRetrieveClientLastReadingsListRequest(),
    watchForRetrieveClientRawReadingsRequest(),
    watchForRetrieveClientRawReadingsChartRequest(),
    watchForRetrieveFullClientFieldListRequest(),
    watchForRetrieveClientFieldListRequest(),
    watchForRetrieveClientFieldWeatherListRequest(),
    watchForRetrieveRainDataForChartRequest(),
    watchForRetrieveClientPDFRequest(),
    watchForGetAdminUserListRequest()
  ]);
}
