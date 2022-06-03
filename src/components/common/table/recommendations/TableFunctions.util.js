import { noOp } from '../../../../tools/general/helpers.util';

export const hideColumnHeader = (tableName, key) => {
  switch (key) {
    case 'w':
      return 'transparent';
    case 'b':
      return 'transparent';
    case 'p':
      return 'transparent';
    case 'l':
      return 'transparent';
    case 'c':
      return 'transparent';
    case 'q':
      return 'transparent';
    default:
      return noOp();
  }
};

export const sort = (data, key) => {
  return data.sort((objectOne, objectTwo) => {
    let valueOne = objectOne[key];
    let valueTwo = objectTwo[key];
    if (typeof valueOne === 'string') {
      valueOne = valueOne.toLowerCase();
      valueTwo = valueTwo.toLowerCase();
    }
    if (valueOne < valueTwo) {
      return -1;
    }
    if (valueOne > valueTwo) {
      return 1;
    }
    return 0;
  });
};

export const pushEmptyRow = (filteredData, weatherDataKeys, rainDataKeys, tableList, i ) => {
  filteredData.push({
    fieldName: { locationName: undefined },
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
    ...(tableList[i]?.showtransp === '1' ? { trans: undefined } : undefined),
    ...(tableList[i]?.showtransp === '1' ? { evap: undefined } : undefined),
    ...(tableList[i]?.showtransp === '1' ? { total: undefined } : undefined)
  });
};

export const tableTemplateData = [
  {
    fieldName: '', deficit: '', unit: '',
    mon11: '', tues12: '', wed13: '', thur14: '', fri15: '', sat16: '', sun17: '',
    '': '', fri8: '', sat9: '', sun10: '', mon10: '', d30: '', total1: '',
    trans: '', evap: '', total2: ''
  }];

export const mockTableData = [
  {
    id: '1', fieldName: '2', deficit: '0', unit: '0',
    mon11: '', tues12: '3', wed13: '9', thur14: '0', fri15: '3', sat16: '', sun17: '1',
    '8': '6', fri8: '5', sat9: '8', sun10: '9', mon10: '5', d30: '4', total1: '3',
    trans: '7', evap: '4', total2: 'f'
  }];
