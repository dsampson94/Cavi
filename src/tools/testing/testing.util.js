import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

export const getMockStore = (mockState) => {
  const store = mockStore(mockState);
  store.dispatch = jest.fn();

  return store;
};

export const mockLoginSuccessData = Object.freeze({
  'success': 1,
  'snackbartext': 'Login Success',
  'snackbarcolor': '1DAE00',
  'access': { 'agent': 1, 'accounts': 0, 'quotes': 0, 'reportscreate': 1, 'stockcapture': 0, 'sensors': 0 },
  'clientsOwn': {
    'demo': {
      'david test': {
        'color': '000000',
        'logo': 'https:www.irricheck.co.zaactcodeappslogospulselogo.png'
      }
    }
  }
});

export const mockLoginErrorData = Object.freeze({
  'success': 0,
  'snackbartext': 'Username Password invalid',
  'snackbarcolor': 'FF0000',
  'access': { 'agent': 0, 'accounts': 0, 'quotes': 0, 'reportscreate': 0, 'stockcapture': 0, 'sensors': 0 }
});
