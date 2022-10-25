//******************************************************************************************************************************************

import { filterLoadPeriod } from '../field/FieldChartView.container.util';

export const mapTemperaturesList = (fieldChartList, probeNumber, activeLoadPeriod) => {
  if (!fieldChartList) return;

  const mappedTemperaturesList = [], oneList = [], twoList = [], threeList = [], fourList = [],
    fiveList = [], sixList = [], tempOneList = [], tempTwoList = [], humOneList = [], rainOneList = [], vpdOneList = [], deltaList = [];

  mapTemperatureLists(fieldChartList, probeNumber, oneList, twoList, threeList, fourList, fiveList, sixList,
    tempOneList, tempTwoList, humOneList, rainOneList, vpdOneList, deltaList);

  pushMappedTemperatureLists(mappedTemperaturesList, activeLoadPeriod, oneList, twoList, threeList, fourList, fiveList, sixList,
    tempOneList, tempTwoList, humOneList, rainOneList, vpdOneList, deltaList);

  return mappedTemperaturesList;
};

//******************************************************************************************************************************************

const mapTemperatureLists = (
  fieldChartList,
  probeNumber,
  oneList,
  twoList,
  threeList,
  fourList,
  fiveList,
  sixList,
  tempOneList,
  tempTwoList,
  humOneList,
  rainOneList,
  vpdOneList,
  deltaList) => {

  if (!fieldChartList?.[probeNumber]) return;

  Object.entries(fieldChartList?.[probeNumber])?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'D1':
          oneList?.push({ x: key, y: value?.['D1'] });
          return;
        case 'D2':
          twoList?.push({ x: key, y: value?.['D2'] });
          return;
        case 'D3':
          threeList?.push({ x: key, y: value?.['D3'] });
          return;
        case 'D4':
          fourList?.push({ x: key, y: value?.['D4'] });
          return;
        case 'D5':
          fiveList?.push({ x: key, y: parseInt(value?.['D5']) });
          return;
        case 'D6':
          sixList?.push({ x: key, y: parseInt(value?.['D6']) });
          return;
        case 't1':
          tempOneList?.push({ x: key, y: parseFloat(value?.['t1']) });
          return;
        case 't2':
          tempTwoList?.push({ x: key, y: parseFloat(value?.['t2']) });
          return;
        case 'hum1':
          humOneList?.push({ x: key, y: parseFloat(value?.['hum1']) });
          return;
        case 'reen':
          rainOneList?.push({ x: key, y: parseFloat(value?.['reen']) });
          return;
        case 'vpd':
          vpdOneList?.push({ x: key, y: parseFloat(value?.['vpd']) });
          return;
        case 'deltat':
          deltaList?.push({ x: key, y: parseInt(value?.['deltat']) });
          return;
      }
    });
  });
};

const pushMappedTemperatureLists = (
  mappedTemperaturesList,
  activeLoadPeriod,
  oneList,
  twoList,
  threeList,
  fourList,
  fiveList,
  sixList,
  tempOneList,
  tempTwoList,
  humOneList,
  rainOneList,
  vpdOneList,
  deltaList) => {

  mappedTemperaturesList.push(filterLoadPeriod(oneList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(twoList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(threeList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(fourList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(fiveList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(sixList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(tempOneList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(tempTwoList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(humOneList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(rainOneList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(vpdOneList, activeLoadPeriod));
  mappedTemperaturesList.push(filterLoadPeriod(deltaList, activeLoadPeriod));
};
