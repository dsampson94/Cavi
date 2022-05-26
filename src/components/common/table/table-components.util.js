import React from 'react';

import { HARVEST, HARVEST_ICON } from '../../../tools/general/system-variables.util';
import { getClassNames, noOp } from '../../../tools/general/helpers.util';

import SVGIcon from '../../../tools/icons/SVGIcon';
import ToolTip from '../tool-tip/ToolTip';

import './table.scss';

export const DarkenedColumn = ({ dataIndex, value, columnNumber }) => {

  return (
    <td onClick={ noOp() }
        key={ dataIndex }
        className={ 'table__body__row__td--dark' }>

      { (!value?.harvest) &&
        <div className={ 'table__body__row__td-container' }>
          <div> { (value?.data === 0) ? '' : value?.data }</div>
        </div> }

      { (value?.harvest && (value?.data === 0)) &&
        <div className={ 'table__body__row__td-container__icon-right' }>
          <ToolTip text={ HARVEST } />
          <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
        </div> }

      { (value?.harvest && value?.data !== 0) &&
        <div className={ 'table__body__row__td-container' }>
          { (value?.data === 0) ? '' : value?.data }
          <div className={ 'table__body__row__td-container__icon' }>
            <ToolTip text={ HARVEST } />
            <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
          </div>
        </div> }
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>
  );
};

export const LightenedColumn = ({ dataIndex, value, columnNumber }) => {

  return (
    <td onClick={ noOp() }
        key={ dataIndex }
        className={ 'table__body__row__td--light' }>

      { (!value?.harvest) &&
        <div className={ 'table__body__row__td-container' }>
          <div> { (value?.data === 0) ? '' : value?.data }</div>
        </div> }

      { (value?.harvest && (value?.data === 0)) &&
        <div className={ 'table__body__row__td-container__icon-right' }>
          <ToolTip text={ HARVEST } />
          <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
        </div> }

      { (value?.harvest && value?.data !== 0) &&
        <div className={ 'table__body__row__td-container' }>
          { (value?.data === 0) ? '' : value?.data }
          <div className={ 'table__body__row__td-container__icon' }>
            <ToolTip text={ HARVEST } />
            <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
          </div>
        </div> }
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>
  );
};

export const DropDown = ({ value, columnNumber, onClick }) => {

  return (
    <div className="table__body__row--dropdown">
      { value?.sublande?.map((item) => {
        return (
          <div className={ getClassNames('table__body__row--dropdown__icon', { left: (columnNumber === 0) }) }
               onClick={ onClick }>
            { (() => {
              switch (columnNumber) {
                case 0: {
                  return item?.name;
                }
                case 2: {
                  return item?.pers;
                }
                case 9: {
                  return (item?.['aanb 1'] !== 0) ? item?.['aanb 1'] : '';
                }
                case 10: {
                  return (item?.['aanb 2'] !== 0) ? item?.['aanb 2'] : '';
                }
                case 11: {
                  return (item?.['aanb 3'] !== 0) ? item?.['aanb 3'] : '';
                }
                case 12: {
                  return (item?.['aanb 4'] !== 0) ? item?.['aanb 4'] : '';
                }
                case 13: {
                  return (item?.['aanb 5'] !== 0) ? item?.['aanb 5'] : '';
                }
                case 14: {
                  return (item?.['aanb 6'] !== 0) ? item?.['aanb 6'] : '';
                }
                case 15: {
                  return (item?.['aanb 7'] !== 0) ? item?.['aanb 7'] : '';
                }
              }
            })() }
          </div>);
      }) }
    </div>
  );
};
