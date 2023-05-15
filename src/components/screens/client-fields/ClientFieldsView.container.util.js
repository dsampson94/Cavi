import { CAPTURE, QUICK_VIEW } from '../../../tools/general/system-variables.util';

//*******************************************************************************

export const mapFieldTableList1 = (fieldList, fieldRainData, subGroupList) => {
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
      c: CAPTURE,
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
      ...(listItem?.showtransp === '1' ? { total: undefined } : undefined),
      captureExpanded: false
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
      ...(listItem?.showtransp === '1' ? { total: undefined } : undefined),
      captureExpanded: false
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
    ...(listItem?.showtransp === '1' ? { total: listItem?.tw } : {}),
    captureExpanded: false
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

//*******************************************************************************

export const mapWeatherList2 = (apiResponse) => {
  const list = [];
  const latestData = [];
  const temperatureLineList = [];
  const radiationLineList = [];
  const humidityLineList = [];
  const dewLineList = [];

  const now = new Date();
  const hours48Ago = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  for (const key in apiResponse) {
    const obj = apiResponse[key];
    const row = {
      key,
      h: obj.h,
      t: obj.t,
      deltat: obj.deltat,
      w: obj.w,
      w1: obj.w1,
      w2: obj.w2,
      radiation: obj.radiation,
      wg: obj.wg,
      tdew: obj.tdew,
      wDisplay: obj.wDisplay,
      wUnit: obj.wUnit,
      eto: obj.eto,
      tempmaks: obj.tempmaks,
      tempmin: obj.tempmin,
      hummaks: obj.hummaks,
      hummin: obj.hummin,
      windmaks: obj.windmaks,
      gustmaks: obj.gustmaks,
      radmaks: obj.radmaks,
      rainmaks: obj.rainmaks,
      etow: obj.etow,
      etov: obj.etov,
      dtr: obj.dtr,
      fct: obj.fct,
      r: obj.r
    };
    list.push(row);

    if (key === 'latestdata') {
      latestData.push(apiResponse[key]);
    }

    const dateKey = new Date(key);
    if (dateKey > hours48Ago) {
      if (obj.t) {
        const temperatureLineItem = { name: key, Temperature: obj.t };
        temperatureLineList.push(temperatureLineItem);
      }

      if (obj.radiation) {
        const radiationLineItem = {
          name: key,
          Radiation: obj.radiation ? obj.radiation : undefined
        };
        radiationLineList.push(radiationLineItem);
      }

      if (obj.h) {
        const humidityLineItem = { name: key, Humidity: obj.h };
        humidityLineList.push(humidityLineItem);
      }

      if (obj.tdew) {
        const dewLineItem = { name: key, dew: obj.tdew };
        dewLineList.push(dewLineItem);
      }
    }
  }

  return { list, temperatureLineList, radiationLineList, humidityLineList, dewLineList, latestData };
};

//*******************************************************************************

export function mappedCurrentDashboardData(rawData) {
  if (!rawData) return null;

  const objectWithTemp24 = Object.entries(rawData)?.find(([, data]) => {
    return data.hasOwnProperty('temp24');
  });

  if (!objectWithTemp24) return null;

  const [dateString, data] = objectWithTemp24;

  return {
    date: dateString,
    temp24: data.temp24,
    temperature: data.t,
    radiation: data.radiation,
    humidity: data.h,
    rain1: data.rain1,
    rain24: data.rain24,
    rain7: data.rain7,
    wind: data.w,
    windDirection: data.w2
  };
}


//*******************************************************************************

export function mapRainfallList(rawData) {
  if (!rawData) return null;

  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;

  const condensedList = Object.entries(rawData)
    ?.filter(([, value]) => value.hasOwnProperty('reenmaand'))
    ?.reduce((acc, [key, value]) => {
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(key).getMonth()];
      const lastYear = new Date(key).getFullYear() === prevYear ? parseInt(value?.reenmaand) : 0;
      const thisYear = new Date(key).getFullYear() === currentYear ? parseInt(value?.reenmaand) : 0;
      const existingObj = acc.find(item => item.name === monthName);
      if (existingObj) {
        existingObj[prevYear] += lastYear;
        existingObj[currentYear] += thisYear;
      } else {
        const newObj = { name: monthName, [prevYear]: lastYear, [currentYear]: thisYear };
        acc.push(newObj);
      }
      return acc;
    }, []);

  return condensedList;
}


//*******************************************************************************

export function mapDailyDataList(rawData) {
  if (!rawData) return null;

  return Object.entries(rawData)?.filter(([, data]) => data.eto != null)?.map(([dateString, data]) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return {
      date: `${ year }/${ month }/${ day } ${ date.toLocaleDateString('en-US', { weekday: 'short' }) }`,
      lowTemp: data.tempmin,
      highTemp: data.tempmaks,
      deltaT: data.deltat,
      lowRH: data.hummin,
      highRN: data.hummaks,
      avgWind: `${ data.wDisplay }-${ data.wUnit }`,
      gust: data.gustmaks,
      radiation: data.radmaks,
      rain: data.rainmaks,
      eto: data.etow,
      [' ']: 'Details'
    };
  });
}

//*******************************************************************************

export function mapDetailsList(rawData) {
  if (!rawData) return null;

  return Object.entries(rawData)?.filter(([, data]) => data.t != null)?.map(([dateString, data]) => {

    return {
      date: `${ dateString }`,
      temperature: data.t,
      RH: data.h,
      wind: data.w,
      windDirection: data.w2,
      rain: data.deltat,
      radiation: data.radiation
    };
  });
}

//*******************************************************************************

export function mapSprayConditionsList(rawData) {
  if (!rawData) return null;

  return Object.entries(rawData)?.map(([dateString, data]) => {

    return {
      date: `${ dateString }`,
      ['Safe to Spray?']: data.sprayspray,
      reason: data.sprayreason,
      deltat: data.deltat,
      temperature: data.temperature,
      humidity: data.humidity,
      wind: data.winddisplay,
      rain: data.reen_mm
    };
  });
}

//*******************************************************************************

export function mapFireIndexList(rawData) {
  if (!rawData) return null;

  return Object.entries(rawData)?.map(([dateString, data]) => {

    return {
      date: `${ dateString }`,
      fireRisk: data.fireicon,
      fireIndex: data.fireidx,
      wind: data.winddisplay,
      maxTemp: data.tempmaks
    };
  });
}

//*******************************************************************************

export function mapReportsList(rawData) {
  if (!rawData) return null;

  return Object.entries(rawData)?.map(([dateString, data]) => {

    return {
      reportDescription: data.displayname,
      tsEnd: data.tsEnd,
      tsStart: data.tsStart,
      ['File Download 📥']: data.filename
    };
  });
}

//*******************************************************************************

export function mapETOWeatherPopupChartList(rawData) {
  if (!rawData) return null;

  const mappedDataForecast = Object.entries(rawData)
    ?.filter(([, data]) => data.etov != null)
    ?.map(([dateString, data]) => {
      return {
        x: dateString,
        y: parseInt(data.etov)
      };
    });

  const mappedDataWeatherStation = Object.entries(rawData)
    ?.filter(([, data]) => data.eto != null)
    ?.map(([dateString, data]) => {
      return {
        x: dateString,
        y: parseInt(data.eto)
      };
    });

  return [mappedDataForecast, mappedDataWeatherStation];

}

//*******************************************************************************

export function mapActualForecastWeatherPopupChartList(rawData) {
  if (!rawData) return null;

  const mappedDataActual = Object.entries(rawData)?.filter(([, data]) => data.t != null)?.map(([dateString, data]) => {
    return {
      x: dateString,
      y: parseInt(data.t)
    };
  });

  const mappedDataForecast = Object.entries(rawData)?.filter(([, data]) => data.fct != null)?.map(([dateString, data]) => {
    return {
      x: dateString,
      y: parseInt(data.fct)
    };
  });

  return [mappedDataActual, mappedDataForecast];
}

//*******************************************************************************

export function mapHumidityWeatherPopupChartList(rawData) {
  if (!rawData) return null;

  const mappedDataHumidity = Object.entries(rawData)?.filter(([, data]) => data.h != null)?.map(([dateString, data]) => {
    return {
      x: dateString,
      y: data.h
    };
  });

  return [mappedDataHumidity, mappedDataHumidity];
}

//*******************************************************************************

export function mapWindWeatherPopupChartList(rawData) {
  if (!rawData) return null;

  const mappedDataWind = Object.entries(rawData)?.filter(([, data]) => data.windmaks != null)?.map(([dateString, data]) => {
    return {
      x: dateString,
      barY: parseInt(data?.windmaks?.slice(0, -3))
    };
  });

  return [mappedDataWind, mappedDataWind];
}

//*******************************************************************************

export function mapRainWeatherPopupChartList(rawData) {
  if (!rawData) return null;

  const mappedDataRain = Object.entries(rawData)?.filter(([, data]) => data.rainmaks != null)?.map(([dateString, data]) => {
    return {
      x: dateString,
      barY: parseInt(data?.rainmaks?.slice(0, -2))
    };
  });

  return [mappedDataRain, mappedDataRain];
}







