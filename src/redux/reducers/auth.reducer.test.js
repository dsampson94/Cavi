import { authReducer, initialState } from './auth.reducer';

describe('Authentication Reducer', () => {

  test('initialState is correct', () => {
    const action = { type: 'INVALID ACTION' };
    expect(authReducer(undefined, action)).toEqual(initialState);
  });
});
