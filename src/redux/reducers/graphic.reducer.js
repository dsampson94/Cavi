import { SET_GRAPHIC_ONE } from '../actions/graphic.action';

export const initialState = {
  graphicOne: null
};

export function graphicReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GRAPHIC_ONE:
      const { graphicOne } = action;

      return {
        ...state,
        graphicOne
      };
    default:
      return state;
  }
}
