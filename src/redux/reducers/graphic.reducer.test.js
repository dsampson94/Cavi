import { initialState, graphicReducer } from './graphic.reducer';
import { SET_GRAPHIC_ONE } from '../actions/graphic.action';

describe('Graphic Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID ACTION' };

    expect(graphicReducer(undefined, action)).toEqual(initialState);
  });

  describe('Graphic Actions', () => {
    test('SET_GRAPHIC_ONE', () => {
      const action = { type: SET_GRAPHIC_ONE, graphicOne: 'graphicOne' };

      const expected = {
        ...initialState,
        graphicOne: 'graphicOne'
      };

      expect(graphicReducer(undefined, action)).toEqual(expected);
    });
  });
});
