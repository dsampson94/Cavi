const graphicOne = 'graphicOne';

export const saveGraphicOneToLocalStorage = (base64String) => {
  return localStorage.setItem(graphicOne, base64String);
};

export const retrieveGraphicOneFromLocalStorage = () => {
  const graphicOne = localStorage.getItem('graphicOne');
  if (!graphicOne) {
    return null;
  }

  return graphicOne;
};
