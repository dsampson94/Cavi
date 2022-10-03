import {
  FOUR_WEEKS,
  FULL_VIEW,
  SIX_MONTHS,
  THREE_MONTHS,
  TWELVE_MONTHS,
  TWO_MONTHS,
  TWO_WEEKS
} from '../../../tools/general/system-variables.util';

import { hoursBetweenDates } from '../../../tools/general/helpers.util';

//*******************************************************************************

export const mapFieldList = (fieldList) => {
  if (!fieldList) return;
  const tableList = [];
  const mappedList = [];

  for (let field in fieldList) tableList?.push(fieldList[field]);
  tableList.forEach((listItem, index) => {
    pushForecastRegionRow(tableList, listItem, index, mappedList);
    pushLandGroupRow(tableList, listItem, index, mappedList);
    pushFieldRow(tableList, listItem, index, mappedList);
  });
  return mappedList;
};

export const mapMenuData = (fieldChartList) => {
  if (!fieldChartList) return;
  const mappedMenuData = [];
  mappedMenuData.push(fieldChartList.pnrs);
  mappedMenuData.push(fieldChartList.besproeistelsel);
  mappedMenuData.push(fieldChartList.seasontime);
  mappedMenuData.push(fieldChartList.field_hectares);
  return mappedMenuData;
};

export const mapChartList = (fieldChartList, probeNumber) => {
  if (!fieldChartList?.[probeNumber]) return;
  const mappedChartList = [], oneHundredMmList = [], twoHundredMmList = [], threeHundredMmList = [], fourHundredMmList = [],
    sixHundredMmList = [], eightHundredMmList = [], topSoilMmList = [], bottomSoilMmList = [], recommendationsSizeList = [],
    usageETCList = [];

  mapDeficitLists(oneHundredMmList, twoHundredMmList, threeHundredMmList, fourHundredMmList,
    sixHundredMmList, eightHundredMmList, fieldChartList, probeNumber);
  mapAggregateLists(topSoilMmList, bottomSoilMmList, fieldChartList, recommendationsSizeList);
  mapUsageETCList(usageETCList, fieldChartList);
  pushMappedLists(oneHundredMmList, twoHundredMmList, threeHundredMmList, fourHundredMmList, sixHundredMmList, eightHundredMmList,
    topSoilMmList, recommendationsSizeList, bottomSoilMmList, usageETCList, mappedDailyETOList(fieldChartList, probeNumber),
    mappedChartList, fieldChartList);
  return mappedChartList;
};

export const mapVoltChartLists = (fieldVoltChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldVoltChartList) return [];
  const mappedVoltChartList = [];

  Object.entries(fieldVoltChartList?.grafieke)?.forEach(([key, value], i) => {
    mappedVoltChartList.push({ id: i, x: key, y: value });
  });

  for (let i = 10; i > 0; i--)
    mappedVoltChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedVoltChartList, activeLoadPeriod);
};

export const mapFlowMeterDailyChartLists = (fieldFlowMeterChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldFlowMeterChartList?.grafieke) return [];
  const mappedVoltChartList = [];

  Object.entries(fieldFlowMeterChartList?.grafieke)?.forEach(([key, value], i) => {
    mappedVoltChartList.push({ id: i, x: key, y: value });
  });

  for (let i = 10; i > 0; i--)
    mappedVoltChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedVoltChartList, activeLoadPeriod);
};

export const mapVPDChartLists = (fieldVPDChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldVPDChartList?.data) return [];
  const mappedVPDChartList = [];

  Object.entries(fieldVPDChartList?.data)?.forEach(([key, value], i) => {
    mappedVPDChartList.push({ id: i, x: key, y: value.vpd });
  });

  for (let i = 10; i > 0; i--)
    mappedVPDChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedVPDChartList, activeLoadPeriod);
};

//*******************************************************************************

const filterLoadPeriod = (mappedListToFilter, activeLoadPeriod) => {
  console.log(mappedListToFilter);
  const lastElementIndex = mappedListToFilter.length - 1;
  const lastElementDate = new Date(mappedListToFilter[mappedListToFilter.length - 1].x);

  switch (activeLoadPeriod) {
    case TWO_WEEKS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 14), lastElementIndex - 1);
    case FOUR_WEEKS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 28), lastElementIndex - 1);
    case TWO_MONTHS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 60), lastElementIndex - 1);
    case THREE_MONTHS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 91), lastElementIndex - 1);
    case SIX_MONTHS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 182), lastElementIndex - 1);
    case TWELVE_MONTHS:
      return mappedListToFilter.slice(lastElementIndex - hoursBetweenDates(lastElementDate, 365), lastElementIndex - 1);
    case FULL_VIEW:
      return mappedListToFilter;
  }
};

const pushForecastRegionRow = (tableList, listItem, index, mappedList) => {
  if (checkForecastArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.forecastArea.toUpperCase() }-forecast`
      }
    });
  }
};

const pushLandGroupRow = (tableList, listItem, index, mappedList) => {
  if (checkLandGroupArea(index, tableList)) {
    mappedList.push({
      fieldName: {
        locationName: `${ listItem?.landgroep.toUpperCase() }-landGroup`
      }
    });
  }
};

const pushFieldRow = (tableList, listItem, index, mappedList) => {
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

const mapDeficitLists = (
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

const mapAggregateLists = (topSoilMmList, bottomSoilMmList, fieldChartList, recommendationsSizeList) => {
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

const mapUsageETCList = (usageETCList, fieldChartList) => {
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

const mappedDailyETOList = (fieldChartList) => {
  const dailyETOList = [];
  const dailyETOForecastList = [];
  const dailyETORealList = [];

  let initialLineY;
  Object.entries(fieldChartList?.eto)?.forEach(([key, value], index) => {
    if (index === 0) {
      initialLineY = value.f;
    }
  });

  for (let i = 0; i < 12; i++) dailyETOForecastList.push({ x: Object.keys(fieldChartList?.Grafieke)[i], y: initialLineY });
  for (let i = 0; i < 12; i++) dailyETORealList.push({ x: Object.keys(fieldChartList?.Grafieke)[i], y: initialLineY });

  Object.entries(fieldChartList?.eto)?.forEach(([key, value]) => {
    if (value.f) dailyETOForecastList.push({ x: key, y: value.f });
    if (value.r) dailyETORealList.push({ x: key, y: value.r });
  });

  dailyETOList.push(dailyETOForecastList);
  dailyETOList.push(dailyETORealList);

  console.log(dailyETOList);
  return dailyETOList;
};

const pushMappedLists = (
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
