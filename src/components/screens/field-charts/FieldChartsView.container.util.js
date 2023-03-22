import { getDaysPastDate } from '../../../tools/general/helpers.util';

import {
  FOUR_WEEKS_DAYS,
  FOUR_WEEKS_LABEL,
  FULL_VIEW_DAYS,
  FULL_VIEW_LABEL,
  SIX_MONTHS_DAYS,
  SIX_MONTHS_LABEL,
  THREE_MONTHS_DAYS,
  THREE_MONTHS_LABEL,
  TWELVE_MONTHS_DAYS,
  TWELVE_MONTHS_LABEL,
  TWO_MONTHS_DAYS,
  TWO_MONTHS_LABEL,
  TWO_WEEKS_DAYS,
  TWO_WEEKS_LABEL
} from '../../../tools/general/system-variables.util';

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
  if (!fieldVoltChartList?.grafieke) return [];
  const mappedVoltChartList = [];

  Object.entries(fieldVoltChartList?.grafieke)?.forEach(([key, value], i) => {
    mappedVoltChartList.push({ x: key, y: value });
  });

  for (let i = 1; i > 0; i--)
    mappedVoltChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedVoltChartList, activeLoadPeriod);
};

export const mapFlowMeterDailyChartLists = (fieldFlowMeterChartList, fieldVoltChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldFlowMeterChartList?.grafieke) return [];
  const mappedFlowMeterChartList = [];

  Object.entries(fieldFlowMeterChartList?.grafieke)?.forEach(([key, value]) => {
    mappedFlowMeterChartList.push({ x: key, barY: value });
  });

  for (let i = 1; i > 0; i--)
    mappedFlowMeterChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      barY: undefined
    });

  return filterLoadPeriod(mappedFlowMeterChartList, activeLoadPeriod);
};

export const mapFlowMeterHourlyChartLists = (fieldFlowMeterChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldFlowMeterChartList?.grafieke) return [];
  const mappedFlowMeterChartList = [];

  Object.entries(fieldFlowMeterChartList?.grafieke)?.forEach(([key, value]) => {
    mappedFlowMeterChartList.push({ x: key, barY: value });
  });

  for (let i = 1; i > 0; i--)
    mappedFlowMeterChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      barY: undefined
    });

  return filterLoadPeriod(mappedFlowMeterChartList, activeLoadPeriod);
};

export const mapECChartLists = (fieldECChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldECChartList?.data) return [];
  const mappedECChartList = [];

  Object.entries(fieldECChartList?.data)?.forEach(([key, value]) => {
    mappedECChartList.push({ x: key, y: value?.ec });
  });

  for (let i = 1; i > 0; i--)
    mappedECChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedECChartList, activeLoadPeriod);
};

export const mapVPDChartLists = (fieldVPDChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldVPDChartList?.data) return [];
  const mappedVPDChartList = [];

  Object.entries(fieldVPDChartList?.data)?.forEach(([key, value], i) => {
    mappedVPDChartList.push({ x: key, y: value.vpd });
  });

  for (let i = 1; i > 0; i--)
    mappedVPDChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedVPDChartList, activeLoadPeriod);
};

export const mapActualMottechChartLists = (fieldActualChartList, fieldChartList, activeLoadPeriod) => {
  if (!fieldActualChartList?.grafieke) return [];
  const mappedActualChartList = [];

  Object.entries(fieldActualChartList?.grafieke)?.forEach(([key, value], i) => {
    mappedActualChartList.push({ x: key, y: value });
  });

  for (let i = 1; i > 0; i--)
    mappedActualChartList.push({
      x: Object.keys(fieldChartList?.Grafieke)[(Object.keys(fieldChartList?.Grafieke).length) - i],
      y: undefined
    });

  return filterLoadPeriod(mappedActualChartList, activeLoadPeriod);
};

//*******************************************************************************

export const filterLoadPeriod = (mappedListToFilter, activeLoadPeriod) => {

  switch (activeLoadPeriod) {
    case TWO_WEEKS_LABEL:
      return getDateFilteredList(mappedListToFilter, TWO_WEEKS_DAYS);
    case FOUR_WEEKS_LABEL:
      return getDateFilteredList(mappedListToFilter, FOUR_WEEKS_DAYS);
    case TWO_MONTHS_LABEL:
      return getDateFilteredList(mappedListToFilter, TWO_MONTHS_DAYS);
    case THREE_MONTHS_LABEL:
      return getDateFilteredList(mappedListToFilter, THREE_MONTHS_DAYS);
    case SIX_MONTHS_LABEL:
      return getDateFilteredList(mappedListToFilter, SIX_MONTHS_DAYS);
    case TWELVE_MONTHS_LABEL:
      return getDateFilteredList(mappedListToFilter, TWELVE_MONTHS_DAYS);
    case FULL_VIEW_LABEL:
      return getDateFilteredList(mappedListToFilter, FULL_VIEW_DAYS);
    default:
      return getDateFilteredList(mappedListToFilter, TWO_WEEKS_DAYS);
  }
};

const getDateFilteredList = (mappedListToFilter, activeLoadPeriod) => {
  return mappedListToFilter?.filter(item => getDaysPastDate(activeLoadPeriod) < new Date(item?.x));
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
      initialLineY = value?.f;
    }
  });

  Object.entries(fieldChartList?.eto)?.forEach(([key, value]) => {
    if (value?.f) dailyETOForecastList.push({ x: key, y: value?.f });
    if (value?.r) dailyETORealList.push({ x: key, y: value?.r });
  });

  dailyETOList.push(dailyETOForecastList);

  if (dailyETORealList.length > 12)
    dailyETOList.push(dailyETORealList);

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
