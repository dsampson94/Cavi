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

export const mapDeficitLists = (
  oneHundredMmList,
  twoHundredMmList,
  threeHundredMmList,
  fourHundredMmList,
  sixHundredMmList,
  eightHundredMmList,
  fieldChartList,
  probeNumber) => {
  Object.entries(fieldChartList?.[probeNumber])?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'D1':
          oneHundredMmList.push({ x: key, y: value.D1 });
          return;
        case 'D2':
          twoHundredMmList.push({ x: key, y: value.D2 });
          return;
        case 'D3':
          threeHundredMmList.push({ x: key, y: value.D3 });
          return;
        case 'D4':
          fourHundredMmList.push({ x: key, y: value.D4 });
          return;
        case 'D5':
          sixHundredMmList.push({ x: key, y: value.D5 });
          return;
        case 'D6':
          eightHundredMmList.push({ x: key, y: value.D6 });
          return;
      }
    });
  });

  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'TBSim':
          oneHundredMmList.push({ x: key, y: null });
          twoHundredMmList.push({ x: key, y: null });
          threeHundredMmList.push({ x: key, y: null });
          fourHundredMmList.push({ x: key, y: null });
          sixHundredMmList.push({ x: key, y: null });
          eightHundredMmList.push({ x: key, y: null });
          return;
      }
    });
  });
};

export const mapAggregateLists = (topSoilMmList, bottomSoilMmList, fieldChartList, recommendationsSizeList) => {
  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'TB':
          topSoilMmList.push({ x: key, y: value.TB });
          recommendationsSizeList.push({ x: key, y: value.TB });
          return;
        case 'TBSim':
          topSoilMmList.push({ x: key, y: value.TBSim });
          return;
        case 'TO':
          bottomSoilMmList.push({ x: key, y: value.TO });
          return;
        case 'TOSim':
          bottomSoilMmList.push({ x: key, y: value.TOSim });
          return;
      }
    });
  });
};

export const mappedDailyETOList = (fieldChartList, probeNumber) => {
  const dailyETOList = [];

  for (let i = 0; i < 12; i++)
    dailyETOList.push({ x: Object.keys(fieldChartList?.[probeNumber])[i], y: null });

  Object.entries(fieldChartList?.eto)?.forEach(([key, value]) => {
    dailyETOList.push({ x: key, y: value.f });
  });

  for (let i = 4; i > 0; i--)
    dailyETOList.push({ x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i], y: null });

  return dailyETOList;
};

export const pushMappedLists = (
  oneHundredMmList,
  twoHundredMmList,
  threeHundredMmList,
  fourHundredMmList,
  sixHundredMmList,
  eightHundredMmList,
  topSoilMmList,
  recommendationsSizeList,
  bottomSoilMmList,
  mappedDailyETOList,
  mappedChartList,
  fieldChartList) => {

  mappedChartList.push(oneHundredMmList);
  mappedChartList.push(twoHundredMmList);
  mappedChartList.push(threeHundredMmList);
  mappedChartList.push(fourHundredMmList);
  mappedChartList.push(sixHundredMmList);
  mappedChartList.push(eightHundredMmList);
  mappedChartList.push(topSoilMmList);
  mappedChartList.push(bottomSoilMmList);
  mappedChartList.push(recommendationsSizeList);
  mappedChartList.push(mappedDailyETOList);
  mappedChartList.push(fieldChartList?.dieptes);
};

export const mapMenuData = (fieldChartList) => {
  const mappedMenuData = [];
  mappedMenuData.push(fieldChartList.pnrs);
  mappedMenuData.push(fieldChartList.besproeistelsel);
  mappedMenuData.push(fieldChartList.seasontime);
  mappedMenuData.push(fieldChartList.field_hectares);
  return mappedMenuData;
};
