import { initialState, systemReducer } from './system.reducer';
import { ADD_SYSTEM_NOTICE, REMOVE_SYSTEM_NOTICE } from '../actions/system.action';
import { SNACK_SUCCESS } from '../../tools/general/system-variables.util';

describe('System Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(systemReducer(undefined, action)).toEqual(initialState);
  });

  describe('System actions', () => {
    test('ADD_SYSTEM_NOTICE returns the correct state', () => {
      const action = { type: ADD_SYSTEM_NOTICE, message: 'alert title', alertType: SNACK_SUCCESS };

      const state = systemReducer(undefined, action);

      expect(state.notices[0].message).toEqual('alert title');
      expect(state.notices[0].alertType).toEqual('snack--success');
    });

    test('REMOVE_SYSTEM_NOTICE returns the correct state', () => {
      const action = {
        type: REMOVE_SYSTEM_NOTICE,
        id: 1
      };

      const setupState = {
        ...initialState,
        notices: [
          {
            id: 1,
            title: 'This alert will be removed',
            alertType: 'snack--success'
          }]
      };

      const expectedState = { ...initialState };
      expect(systemReducer(setupState, action)).toEqual(expectedState);
    });
  });
});
