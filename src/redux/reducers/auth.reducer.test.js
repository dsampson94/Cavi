import { authReducer, initialState } from './auth.reducer';
import { SET_LOGGED_IN_USER } from '../actions/auth.action';

import { mockLoginSuccessData } from '../../tools/testing/testing.util';

describe('Authentication Reducer', () => {

  test('initialState is correct', () => {
    const action = { type: 'INVALID ACTION' };
    expect(authReducer(undefined, action)).toEqual(initialState);
  });

  describe('Auth actions', () => {
    test('SET_LOGGED_IN_USER', () => {
      const user = mockLoginSuccessData;

      const action = { type: SET_LOGGED_IN_USER, user };

      const expected = {
        ...initialState,
        loggedInUser: user
      };

      expect(authReducer(undefined, action)).toEqual(expected);
    });
  });
});
