import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { arrayOf, bool, func, number, shape, string } from 'prop-types';

import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  DROPDOWN_ALL,
  HARVEST,
  HARVEST_ICON,
  PREVIOUS,
  PREVIOUS_RECOMMENDATIONS,
  RAIN_CLOUDS,
  UNIT,
  WATCH
} from '../../../../tools/general/system-variables.util';
import { getClassNames, noOp } from '../../../../tools/general/helpers.util';

import { requestClientFieldList } from '../../../../redux/actions/client.action';

import SVGIcon from '../../../../tools/icons/SVGIcon';
import ToolTip from '../../tool-tip/ToolTip';
import Button from '../../button/Button';
import InputSearch from '../../input-search/InputSearch';

import './table.scss';

export const TableTopBar = ({
                              filteredTableData,
                              hasSubGroups,
                              setFilteredTableData,
                              setActiveTableData,
                              clientRequestFields,
                              toggleDropdowns
                            }) => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  return (
    <div className="recommendation-client-view__topbar">
      <div className="recommendation-client-view__topbar-left">
        { !filteredTableData &&
          <div className="recommendation-client-view__topbar-left-button">
            <Button icon={ DROPDOWN_ALL }
                    onClick={ toggleDropdowns } />
          </div> }
        { filteredTableData &&
          <div className="recommendation-client-view__topbar-left-no-button" /> }
        <p>{ `Recommendations: ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</p>
      </div>
      <div className="recommendation-client-view__topbar-right">
        <Button icon={ BULLSEYE }
                iconFill={ '#C24C41' }
                tooltip={ ACCURACY_ANALYSIS }
                spaced />
        <Button label={ 'Reports' }
                spaced />
        <Button icon={ PREVIOUS }
                tooltip={ PREVIOUS_RECOMMENDATIONS }
                spaced />
        <Button label={ 'Show Archives' }
                spaced />
        <Button label={ 'Reload Recommendations' }
                onClick={ () => {
                  setFilteredTableData(undefined);
                  setActiveTableData([]);
                  dispatch(requestClientFieldList(clientRequestFields));
                } }
                spaced />
      </div>
    </div>
  );
};

TableTopBar.defaultProps = {};

TableTopBar.propTypes = {};

export const TableSearchBar = ({ fieldList, setFilteredTableData }) => {
  return (
    <div className="recommendation-client-view__search">
      { (fieldList.length > 10) &&
        <InputSearch placeholder={ 'Search field or probe number' }
                     dataToFilter={ fieldList }
                     setFilteredData={ setFilteredTableData }
                     table /> }
    </div>
  );
};

TableSearchBar.defaultProps = {};

TableSearchBar.propTypes = {
  fieldList: arrayOf(shape({})).isRequired,
  setFilteredTableData: func.isRequired
};

export const FieldNameColumn = ({ dataIndex, value }) => {

  if (value?.locationName?.includes('-forecast')) {
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container-forecast' }>
        <div className={ 'table__body__row__td-container-forecast-upper' }>{ value?.locationName?.slice(0, -9) }</div>
        <div className={ 'table__body__row__td-container-forecast-lower' }>{ 'mock climate text' }</div>
      </div>
    </td>;
  } else if (value?.locationName?.includes('-landGroup')) {
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container-landgroup' }>
        { value?.locationName?.slice(0, -10) }
      </div>
    </td>;
  } else {
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        <div className={ 'table__body__row__td-upper' }>{ value?.locationName }</div>
        <div className={ 'table__body__row__td-lower' }>{ value?.type }</div>
      </div>
      <DropDown value={ value }
                columnNumber={ 0 } />
    </td>;
  }
};

FieldNameColumn.defaultProps = {
  value: undefined
};

FieldNameColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

export const DeficitColumn = ({ dataIndex, value, isDropdownRow, isHeaderRow }) => {

  return (
    <td onClick={ noOp() }
        key={ dataIndex }>
      { !isDropdownRow &&
        <div className={ 'table__body__row__td-container' }>
          { value?.tooltip && <ToolTip text={ value?.tooltip } /> }
          <div className={ 'table__body__row__td-upper--deficit' }
               style={ {
                 backgroundColor: value?.colorTop
               } }>
            { value?.top }
          </div>
          <div className={ (isHeaderRow) ? 'table__body__row__td-lower' : 'table__body__row__td-lower--deficit' }
               style={ {
                 backgroundColor: value?.colorBot
               } }>
            { value?.bottom }
          </div>
        </div> }
    </td>
  );
};

DeficitColumn.defaultProps = {
  isDropdownRow: undefined,
  isHeaderRow: undefined,
  value: undefined
};

DeficitColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  isDropdownRow: bool,
  isHeaderRow: bool
};

export const PrimaryForecastColumn = ({ dataIndex, value, columnNumber }) => {

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

PrimaryForecastColumn.defaultProps = {
  value: undefined
};

PrimaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

export const SecondaryForecastColumn = ({ dataIndex, value, columnNumber }) => {

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

SecondaryForecastColumn.defaultProps = {
  value: undefined
};

SecondaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

export const ForecastTimeIconsColumn = ({ dataIndex, value }) => {

  return (
    <td onClick={ noOp() }
        key={ dataIndex }
        className={ 'table__body__row__td--fade--thin' }>
      { !value?.dropdown &&
        <>
          <ToolTip text={ UNIT } />
          <SVGIcon name={ RAIN_CLOUDS }
                   fill={ '#043b6e' } />
          <SVGIcon name={ WATCH }
                   fill={ '#043b6e' } />
        </>
      }
    </td>
  );
};

ForecastTimeIconsColumn.defaultProps = {
  value: undefined
};

ForecastTimeIconsColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string
};

export const RainDataColumn = ({ dataIndex, value, columnNumber }) => {

  return (
    <td onClick={ noOp() }
        key={ dataIndex }
        className={ 'table__body__row__td--fade' }>
      <div className={ 'table__body__row__td-container' }>
        <p> { (value?.upper === 0) ? '' : value?.upper }</p>
        <p> { (value?.lower === 0) ? '' : value?.lower }</p>
      </div>
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>
  );
};

RainDataColumn.defaultProps = {
  value: undefined
};

RainDataColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string,
  columnNumber: number.isRequired
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
                case 21: {
                  return (item?.['30d'] !== 0) ? item?.['30d'] : '';
                }
                case 22: {
                  return (item?.['Total'] !== 0) ? item?.['Total'] : '';
                }
              }
            })() }
          </div>);
      }) }
    </div>
  );
};

DropDown.defaultProps = {
  value: undefined
};

DropDown.propTypes = {
  value: shape({}).isRequired,
  columnNumber: number,
  onClick: func
};
