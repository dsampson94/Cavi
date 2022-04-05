export const SET_SYSTEM_HEADERS = '[SYSTEM_STORE] Set system headers';
export const setHeaders = (heading, subHeading) => ({
    type: SET_SYSTEM_HEADERS,
    heading,
    subHeading
});

export const SET_SPINNER_TEXT = '[SYSTEM_STORE] Set spinner text';
export const setSpinnerText = (spinnerText) => ({
    type: SET_SPINNER_TEXT,
    spinnerText
});
