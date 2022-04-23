import { mockTableData } from '../../components/common/table/table-functions.util';

import { initialState } from './client.reducer';
import { clientReducer } from './client.reducer';

import { SET_CLIENT_FIELD_LIST, SET_CLIENT_NAME } from '../actions/client.action';

describe('Client Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID ACTION' };
    expect(clientReducer(undefined, action)).toEqual(initialState);
  });

  describe('Client Actions', () => {
    test('SET_CLIENT_NAME', () => {
      const action = { type: SET_CLIENT_NAME, groupName: 'test1', clientName: 'test2' };

      const expected = {
        ...initialState,
        selectedClient: { groupName: 'test1', clientName: 'test2' }
      };

      expect(clientReducer(undefined, action)).toEqual(expected);
    });

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
