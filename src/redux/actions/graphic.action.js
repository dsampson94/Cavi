export const SET_GRAPHIC_ONE = '[GRAPHIC_STORE] Set graphic one';

export const GET_GRAPHIC_ONE = '[GRAPHIC_STORE] Get graphic one';
export const requestRetrieveGraphicOne = (onSuccess, onError) => ({
  type: GET_GRAPHIC_ONE,
  onSuccess,
  onError
});
