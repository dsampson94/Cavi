export const SET_CLIENT_OVERVIEW_LIST = '[CLIENT_STORE] Set overview list';
export const SET_CLIENT_MONITOR_PROBES_LIST = '[CLIENT_STORE] Set monitor probes list';
export const SET_CLIENT_LAST_READINGS_LIST = '[CLIENT_STORE] Set last readings list';
export const SET_CLIENT_RAW_READINGS = '[CLIENT_STORE] Set raw readings';
export const SET_CLIENT_RAW_READINGS_CHART = '[CLIENT_STORE] Set raw readings chart';

export const SET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set field list';
export const SET_FULL_CLIENT_FIELD_LIST = '[CLIENT_STORE] Set full field list (fields & rain)';
export const SET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Set field rain data';
export const SET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Set field rain data for chart';
export const SET_CLIENT_PDF = '[CLIENT_STORE] Set client PDF';
export const SET_ADMIN_USER_LIST = '[CLIENT_STORE] Set admin user list';

export const GET_CLIENT_OVERVIEW_LIST = '[CLIENT_STORE] Get overview list';
export const requestClientOverviewList = (client) => ({
    type: GET_CLIENT_OVERVIEW_LIST,
    client
});

export const GET_CLIENT_MONITOR_PROBES_LIST = '[CLIENT_STORE] Get monitor probes list';
export const requestClientMonitorProbesList = (client) => ({
    type: GET_CLIENT_MONITOR_PROBES_LIST,
    client
});

export const GET_CLIENT_LAST_READINGS_LIST = '[CLIENT_STORE] Get last readings list';
export const requestClientLastReadingsList = (client) => ({
    type: GET_CLIENT_LAST_READINGS_LIST,
    client
});

export const GET_CLIENT_RAW_READINGS = '[CLIENT_STORE] Get raw readings';
export const requestClientRawReadings = (client) => ({
    type: GET_CLIENT_RAW_READINGS,
    client
});

export const GET_CLIENT_RAW_READINGS_CHART = '[CLIENT_STORE] Get raw readings chart';
export const requestClientRawReadingsChart = (client) => ({
    type: GET_CLIENT_RAW_READINGS_CHART,
    client
});

export const setClientMonitorProbesList = (client) => ({
    type: SET_CLIENT_MONITOR_PROBES_LIST,
    client
});

export const GET_FULL_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get full field list (fields & rain)';
export const requestFullClientFieldList = (client) => ({
    type: GET_FULL_CLIENT_FIELD_LIST,
    client
});

export const GET_CLIENT_FIELD_LIST = '[CLIENT_STORE] Get field list';
export const requestClientFieldList = (client) => ({
    type: GET_CLIENT_FIELD_LIST,
    client
});

export const GET_CLIENT_FIELD_RAIN_DATA = '[CLIENT_STORE] Get field rain data';
export const requestClientFieldRainData = (client) => ({
    type: GET_CLIENT_FIELD_RAIN_DATA,
    client
});

export const GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART = '[CLIENT_STORE] Get field rain data for chart';
export const requestClientFieldRainDataForChart = (client) => ({
    type: GET_CLIENT_FIELD_RAIN_DATA_FOR_CHART,
    client
});

export const GET_CLIENT_PDF = '[CLIENT_STORE] Get client PDF';
export const requestClientPDF = (client) => ({
    type: GET_CLIENT_PDF,
    client
});

export const GET_ADMIN_USER_LIST = '[CLIENT_STORE] Get admin user list';
export const requestAdminUserList = (client) => ({
    type: GET_ADMIN_USER_LIST,
    client
});
