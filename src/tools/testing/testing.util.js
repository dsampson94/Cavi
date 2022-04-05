import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

export const getMockStore = (mockState) => {
  const store = mockStore(mockState);
  store.dispatch = jest.fn();

  return store;
};
