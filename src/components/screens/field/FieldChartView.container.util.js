export const pushForecastRegionRow = (tableList, listItem, index, mappedList) => {
  if (checkForecastArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.forecastArea.toUpperCase() }-forecast`
      }
    });
  }
};

export const pushLandGroupRow = (tableList, listItem, index, mappedList) => {
  if (checkLandGroupArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.landgroep.toUpperCase() }-landGroup`
      }
    });
  }
};

export const pushFieldRow = (tableList, listItem, index, mappedList) => {
  mappedList.push({
    fieldName: {
      locationName: listItem?.fieldname,
      probeNumber: listItem?.p1,
      colorTop: (listItem?.colorTopHex === '#FFFFFFFF')
        ? '#000000' : `#${ listItem?.colorTopHex?.slice(3) }`,
      colorBot: (listItem?.colorBotHex === '#FFFFFFFF')
        ? '#000000' : `#${ listItem?.colorBotHex?.slice(3) }`
    }
  });
};

const checkForecastArea = (index, tableList) => {
  let currentItem = tableList[index]?.forecastArea.toLowerCase();
  let nextItem = tableList[index - 1]?.forecastArea.toLowerCase();
  return (currentItem !== nextItem);
};

const checkLandGroupArea = (index, tableList) => {
  let currentItem = tableList[index]?.landgroep.toLowerCase();
  let nextItem = tableList[index - 1]?.landgroep.toLowerCase();
  return (currentItem !== nextItem);
};
