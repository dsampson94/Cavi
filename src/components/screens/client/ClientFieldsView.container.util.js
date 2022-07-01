import { CAPTURE, QUICK_VIEW } from '../../../tools/general/system-variables.util';

export const getRainDataList = (fieldList, fieldRainData) => {
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

export const getRainDataUpperList = (rainDataList) => {
  let rainDataUpper = [];
  for (let index in rainDataList) {
    if (Object.keys(rainDataList[index])[0].includes('upper')) {
      rainDataUpper.push(rainDataList[index]);
    }
  }
  return rainDataUpper;
};

export const getRainDataLowerList = (rainDataList) => {
  let rainDataLower = [];
  for (let index in rainDataList) {
    if (Object.keys(rainDataList[index])[0].includes('lower')) {
      rainDataLower.push(rainDataList[index]);
    }
  }
  return rainDataLower;
};

export const pushForecastRegionRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys) => {
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

export const pushLandGroupRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys) => {
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

export const pushFieldRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, rainDataUpper, rainDataLower) => {
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
      tooltip: (listItem?.last_reading) ?
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

export const pushDropdownRow = (tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, fieldRainData) => {
  const subGroupData = getSubGroupDataForDropdown(listItem, fieldRainData);
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

const getSubGroupDataForDropdown = (listItem, fieldRainData) => {
  return {
    ...(listItem?.sublande ? {
      sublande: Object.keys(listItem?.sublande).map(function(key) {
        if (!fieldRainData?.split) return;
        const subFieldKeys = Object.keys(fieldRainData?.split);
        if (subFieldKeys.includes(key)) {
          return {
            ...listItem?.sublande[key],
            name: key,
            '30d': fieldRainData?.split[key][6],
            Total: fieldRainData?.split[key][5]
          };
        } else {
          return { ...listItem?.sublande[key], name: key };
        }
      })
    } : {})
  };
};

export const setHasSubGroups = (listItem, subGroupSplitList) => {
  subGroupSplitList.push(listItem?.split);
  return subGroupSplitList.includes(1);
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
