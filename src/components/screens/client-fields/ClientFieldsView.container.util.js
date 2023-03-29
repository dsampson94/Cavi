import { CAPTURE, QUICK_VIEW } from '../../../tools/general/system-variables.util';

//*******************************************************************************

export const mapFieldTableList = (fieldList, fieldRainData, subGroupList) => {
  if (!fieldList) return;
  if (!fieldRainData) return;
  const tableList = [];
  const mappedList = [];
  let rowHasSubGroups;

  const rainData = getRainDataList(fieldList, fieldRainData);
  let rainDataUpper = getRainDataUpperList(rainData);
  let rainDataLower = getRainDataLowerList(rainData);
  const rainDataKeys = Object.keys(fieldRainData['days'] ?? []);

  for (let field in fieldList) tableList?.push(fieldList[field]);

  tableList.forEach((listItem, index) => {
    const weatherDataKeys = Object.keys(listItem?.weervoorspelling);
    rowHasSubGroups = setHasSubGroups(listItem, subGroupList);
    pushForecastRegionRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys);
    pushLandGroupRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys);
    pushFieldRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, rainDataUpper, rainDataLower);

    if (rowHasSubGroups) {
      pushDropdownRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, fieldRainData);
    }
  });

  return mappedList;
};

//*******************************************************************************

const getRainDataList = (fieldList, fieldRainData) => {
  const rainData = [];

  const fieldListIndexList = Object.keys(Object.keys(fieldList));
  for (const index of fieldListIndexList) rainData.push({ upper: { index } });
  for (const index of fieldListIndexList) rainData.push({ lower: { index } });

  if (fieldRainData[1]) {
    for (let field in fieldRainData[1]) {
      rainData.splice((Object.keys(fieldList).indexOf(field)),
        1, { upper: fieldRainData[1][field] });
    }
  }

  if (fieldRainData[2]) {
    for (let field in fieldRainData[2]) {
      rainData.splice((Object.keys(fieldList).indexOf(field) + 1),
        0, { lower: fieldRainData[2][field] });
    }
  }
  return rainData;
};

const getRainDataUpperList = (rainDataList) => {
  return rainDataList.filter(item => Object.keys(item)[0].includes('upper'));
};

const getRainDataLowerList = (rainDataList) => {
  return rainDataList.filter(item => Object.keys(item)[0].includes('lower'));
};

const pushForecastRegionRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys) => {
  if (checkForecastArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.forecastArea.toUpperCase() }-forecast`,
        summary: listItem?.weervoorspelling?.[weatherDataKeys[0]].opsomming
      },
      w: undefined,
      b: undefined,
      p: undefined,
      l: undefined,
      c: undefined,
      q: undefined,
      deficit: undefined,
      unit: undefined,
      [weatherDataKeys[0]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[0]] },
      [weatherDataKeys[1]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[1]] },
      [weatherDataKeys[2]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[2]] },
      [weatherDataKeys[3]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[3]] },
      [weatherDataKeys[4]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[4]] },
      [weatherDataKeys[5]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[5]] },
      [weatherDataKeys[6]]: { weather: listItem?.weervoorspelling?.[weatherDataKeys[6]] },
      ' ': ' ',
      [rainDataKeys[0]]: undefined,
      [rainDataKeys[1]]: undefined,
      [rainDataKeys[2]]: undefined,
      [`${ rainDataKeys[3] } `]: undefined,
      '30d': undefined,
      Total: undefined,
      ...(listItem?.showtransp === '1' ? { trans: undefined } : undefined),
      ...(listItem?.showtransp === '1' ? { evap: undefined } : undefined),
      ...(listItem?.showtransp === '1' ? { total: undefined } : undefined)
    });
  }
};

const pushLandGroupRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys) => {
  if (checkLandGroupArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.landgroep.toUpperCase() }-landGroup`
      },
      w: undefined,
      b: undefined,
      p: undefined,
      l: undefined,
      c: undefined,
      q: undefined,
      deficit: undefined,
      unit: undefined,
      [weatherDataKeys[0]]: undefined,
      [weatherDataKeys[1]]: undefined,
      [weatherDataKeys[2]]: undefined,
      [weatherDataKeys[3]]: undefined,
      [weatherDataKeys[4]]: undefined,
      [weatherDataKeys[5]]: undefined,
      [weatherDataKeys[6]]: undefined,
      ' ': ' ',
      [rainDataKeys[0]]: undefined,
      [rainDataKeys[1]]: undefined,
      [rainDataKeys[2]]: undefined,
      [`${ rainDataKeys[3] } `]: undefined,
      '30d': undefined,
      Total: undefined,
      ...(listItem?.showtransp === '1' ? { trans: undefined } : undefined),
      ...(listItem?.showtransp === '1' ? { evap: undefined } : undefined),
      ...(listItem?.showtransp === '1' ? { total: undefined } : undefined)
    });
  }
};

const pushFieldRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, rainDataUpper, rainDataLower) => {
  mappedList.push({
    fieldName: {
      locationName: listItem?.fieldname,
      type: listItem?.gewas,
      probeNumber: listItem?.p1,
      color: listItem?.kleurland
    },
    w: (listItem?.warning === '0') ? undefined : listItem?.warning,
    b: (listItem?.split === 1) ? {
      tooltip: `Click to view seperate blocks for ${ listItem?.fieldname }`,
      expanded: false
    } : undefined,
    p: listItem?.fotots,
    l: {
      lastReading: listItem?.last_reading,
      hasBattery: !!listItem?.foutiefbattery,
      tooltip: (listItem?.foutiefbattery) ? listItem?.foutiefbattery : (listItem?.last_reading) ?
        `Probe Number: ${ listItem?.p1 } (Double click to search last readings)` : undefined
    },
    c: CAPTURE,
    q: QUICK_VIEW,
    deficit: {
      tooltip: listItem?.kleurhint,
      top: listItem?.tekbo,
      colorTop: (listItem?.colorTopHex === '#FFFFFFFF')
        ? '#000000' : `#${ listItem?.colorTopHex?.slice(3) }`,
      bottom: listItem?.tekonder,
      colorBot: (listItem?.colorBotHex === '#FFFFFFFF')
        ? '#000000' : `#${ listItem?.colorBotHex?.slice(3) }`
    },
    unit: listItem?.eenheid,
    [weatherDataKeys[0]]: {
      data: listItem?.recommend1,
      harvest: !!(listItem?.oes?.includes('1')),
      comment: listItem?.['aanb 1 comment'] ? listItem?.['aanb 1 comment'] : undefined
    },
    [weatherDataKeys[1]]: {
      data: listItem?.recommend2,
      harvest: !!(listItem?.oes?.includes('2')),
      comment: listItem?.['aanb 2 comment'] ? listItem?.['aanb 2 comment'] : undefined
    },
    [weatherDataKeys[2]]: {
      data: listItem?.recommend3,
      harvest: !!(listItem?.oes?.includes('3')),
      comment: listItem?.['aanb 3 comment'] ? listItem?.['aanb 3 comment'] : undefined
    },
    [weatherDataKeys[3]]: {
      data: listItem?.recommend4,
      harvest: !!(listItem?.oes?.includes('4')),
      comment: listItem?.['aanb 4 comment'] ? listItem?.['aanb 4 comment'] : undefined
    },
    [weatherDataKeys[4]]: {
      data: listItem?.recommend5,
      harvest: !!(listItem?.oes?.includes('5')),
      comment: listItem?.['aanb 5 comment'] ? listItem?.['aanb 5 comment'] : undefined
    },
    [weatherDataKeys[5]]: {
      data: listItem?.recommend6,
      harvest: !!(listItem?.oes?.includes('6')),
      comment: listItem?.['aanb 6 comment'] ? listItem?.['aanb 6 comment'] : undefined
    },
    [weatherDataKeys[6]]: {
      data: listItem?.recommend7,
      harvest: !!(listItem?.oes?.includes('7')),
      comment: listItem?.['aanb 7 comment'] ? listItem?.['aanb 7 comment'] : undefined
    },
    ' ': ' ',
    [rainDataKeys[0]]: {
      upper: rainDataUpper[index]?.upper[1],
      lower: rainDataLower[index]?.lower[1]
    },
    [rainDataKeys[1]]: {
      upper: rainDataUpper[index]?.upper[2],
      lower: rainDataLower[index]?.lower[2]
    },
    [rainDataKeys[2]]: {
      upper: rainDataUpper[index]?.upper[3],
      lower: rainDataLower[index]?.lower[3]
    },
    [`${ rainDataKeys[3] } `]: {
      upper: rainDataUpper[index]?.upper[4],
      lower: rainDataLower[index]?.lower[4]
    },
    '30d': {
      upper: rainDataUpper[index]?.upper[6],
      lower: rainDataLower[index]?.lower[6]
    },
    Total: {
      upper: rainDataUpper[index]?.upper[5],
      lower: rainDataLower[index]?.lower[5]
    },
    ...(listItem?.showtransp === '1' ? { trans: listItem?.gw } : {}),
    ...(listItem?.showtransp === '1' ? { evap: listItem?.vw } : {}),
    ...(listItem?.showtransp === '1' ? { total: listItem?.tw } : {})
  });
};

const pushDropdownRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, fieldRainData) => {
  const subGroupData = getSubGroupObjectForDropdown(listItem, fieldRainData);

  mappedList.push({
    fieldName: subGroupData,
    w: undefined,
    b: subGroupData,
    p: undefined,
    l: undefined,
    c: undefined,
    q: undefined,
    deficit: undefined,
    unit: undefined,
    [weatherDataKeys[0]]: subGroupData,
    [weatherDataKeys[1]]: subGroupData,
    [weatherDataKeys[2]]: subGroupData,
    [weatherDataKeys[3]]: subGroupData,
    [weatherDataKeys[4]]: subGroupData,
    [weatherDataKeys[5]]: subGroupData,
    [weatherDataKeys[6]]: subGroupData,
    ' ': { dropdown: true },
    [rainDataKeys[0]]: undefined,
    [rainDataKeys[1]]: undefined,
    [rainDataKeys[2]]: undefined,
    [`${ rainDataKeys[3] } `]: undefined,
    '30d': subGroupData,
    Total: subGroupData,
    ...(listItem?.showtransp === '1' ? { trans: undefined } : undefined),
    ...(listItem?.showtransp === '1' ? { evap: undefined } : undefined),
    ...(listItem?.showtransp === '1' ? { total: undefined } : undefined),
    expanded: false
  });
};

const getSubGroupObjectForDropdown = (listItem, fieldRainData) => {
  if (!listItem?.sublande) return null;
  else return {
    sublande: Object.keys(listItem?.sublande).map(key => {
      return {
        ...listItem?.sublande[key],
        name: key,
        '30d': fieldRainData?.split?.[key]?.[6],
        Total: fieldRainData?.split?.[key]?.[5]
      };
    })
  };
};

const setHasSubGroups = (listItem, subGroupList) => {
  if (listItem?.sublande) subGroupList.push(1);
  return !!(subGroupList.includes(1));
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
