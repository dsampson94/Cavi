import { noOp } from '../../../tools/general/helpers.util';

export const hideColumnHeader = (tableName, key) => {
  switch (key) {
    case 'wa':
      return 'transparent';
    case 'bl':
      return 'transparent';
    case 'ph':
      return 'transparent';
    case 'lr':
      return 'transparent';
    case 'ca':
      return 'transparent';
    case 'qv':
      return 'transparent';
    default:
      return noOp();
  }
};

export const handleColumnHeaderClick = (key, ascendingSort, setAscendingSort, filteredTableData, setFilteredTableData) => {
  const copyOfFilteredTableData = [...filteredTableData];
  let sortedTableData = sort(copyOfFilteredTableData, key);

  if (ascendingSort) {
    setAscendingSort(false);
  } else {
    sortedTableData = sortedTableData.reverse();
    setAscendingSort(true);
  }

  return setFilteredTableData([...sortedTableData]);
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

export const tableTemplateData = [
  {
    id: '', fieldName: '', deficit: '', unit: '',
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
