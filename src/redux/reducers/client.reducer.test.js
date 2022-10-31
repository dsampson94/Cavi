import { mockTableData } from '../../components/common/table/TableFunctions.util';

import { clientReducer, initialState } from './client.reducer';

import { SET_CLIENT_FIELD_LIST } from '../actions/client.action';

describe('Client Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID ACTION' };
    expect(clientReducer(undefined, action)).toEqual(initialState);
  });

  describe('Client Actions', () => {
    test('SET_CLIENT_FIELD_LIST', () => {
      const action = { type: SET_CLIENT_FIELD_LIST, fieldList: mockTableData };

      const expected = {
        ...initialState,
        fieldList: mockTableData
      };

      expect(clientReducer(undefined, action)).toEqual(expected);
    });
  });
});
