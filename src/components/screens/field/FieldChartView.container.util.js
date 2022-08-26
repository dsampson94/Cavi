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
        ? '#000000' : `#${ listItem?.colorBotHex?.slice(3) }`,
      recommend1: listItem?.recommend1,
      recommend2: listItem?.recommend2,
      recommend3: listItem?.recommend3,
      recommend4: listItem?.recommend4,
      recommend5: listItem?.recommend5,
      recommend6: listItem?.recommend6,
      recommend7: listItem?.recommend7,
      recommend8: listItem?.recommend8
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
          oneHundredMmList.push({ x: key, y: value.D1, percent: value.P1, temp: value.T1 });
          return;
        case 'D2':
          twoHundredMmList.push({ x: key, y: value.D2, percent: value.P2, temp: value.T2 });
          return;
        case 'D3':
          threeHundredMmList.push({ x: key, y: value.D3, percent: value.P3, temp: value.T3 });
          return;
        case 'D4':
          fourHundredMmList.push({ x: key, y: value.D4, percent: value.P4, temp: value.T4 });
          return;
        case 'D5':
          sixHundredMmList.push({ x: key, y: value.D5, percent: value.P5, temp: value.T5 });
          return;
        case 'D6':
          eightHundredMmList.push({ x: key, y: value.D6, percent: value.P6, temp: value.T6 });
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
  const idealTop = fieldChartList?.Grafieke[Object.keys(fieldChartList?.Grafieke)[0]].BB;
  const idealBottom = fieldChartList?.Grafieke[Object.keys(fieldChartList?.Grafieke)[0]].BO;
  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'TB':
          topSoilMmList.push({
            x: key, y: value.TB,
            ideal: parseInt(idealTop),
            stress: parseInt(value?.stress),
            wither: parseInt(value?.verwelp)
          });
          recommendationsSizeList.push({ x: key, y: value.TB });
          return;
        case 'TBSim':
          topSoilMmList.push({
            x: key, y: value.TBSim,
            ideal: parseInt(idealTop),
            stress: parseInt(value?.stress),
            wither: parseInt(value?.verwelp)
          });
          return;
        case 'TO':
          bottomSoilMmList.push({
            x: key, y: value?.TO,
            ideal: parseInt(idealBottom),
            stress: parseInt(value?.stressonder),
            wither: parseInt(value?.verwelponder)
          });
          return;
        case 'TOSim':
          bottomSoilMmList.push({
            x: key, y: value?.TOSim,
            ideal: parseInt(idealBottom),
            stress: parseInt(value?.stressonder),
            wither: parseInt(value?.verwelponder)
          });
          return;
      }
    });
  });
};

export const mapUsageETCList = (usageETCList, fieldChartList) => {
  let initialLineY;
  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey, index) => {
      if (index === 0) {
        switch (innerKey) {
          case 'GF':
            initialLineY = value.GF;
        }
      }
    });
  });

  for (let i = 0; i < 12; i++) usageETCList.push({ x: Object.keys(fieldChartList?.Grafieke)[i], lineY: initialLineY, barY: -0.1 });

  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'U':
          usageETCList.push({
            x: key,
            y: 1,
            barY: parseFloat(value?.U),
            lineY: parseFloat(value?.GF),
            geb: parseFloat(value.Geb),
            gef: parseFloat(value?.Gef),
            bla: parseFloat(value?.Bla)
          });
          return;
      }
    });
  });
  for (let i = 10; i > 0; i--)
    usageETCList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      barY: -0.1,
      lineY: initialLineY
    });
};

export const mappedDailyETOList = (fieldChartList) => {
  const dailyETOList = [];

  let initialLineY;
  Object.entries(fieldChartList?.eto)?.forEach(([key, value], index) => {
    if (index === 0) {
      initialLineY = value.f;
    }
  });

  for (let i = 0; i < 12; i++) dailyETOList.push({ x: Object.keys(fieldChartList?.Grafieke)[i], y: initialLineY });

  Object.entries(fieldChartList?.eto)?.forEach(([key, value]) => {
    dailyETOList.push({ x: key, y: value.f });
  });

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
  usageETCList,
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
  mappedChartList.push(usageETCList);
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
