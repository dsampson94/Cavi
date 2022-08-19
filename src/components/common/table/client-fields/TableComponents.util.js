import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { arrayOf, bool, func, number, shape, string } from 'prop-types';

import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  CAMERA,
  CHARTS,
  CLOUDED,
  DROPDOWN,
  DROPDOWN_ALL,
  HARVEST,
  HARVEST_ICON,
  PARTLY_CLOUDED,
  PENCIL,
  PREVIOUS,
  PREVIOUS_RECOMMENDATIONS,
  RAIN,
  RAIN_CLOUDS,
  SUNNY,
  TABLE_SEARCH_PLACEHOLDER,
  UNIT,
  WARNING,
  WATCH
} from '../../../../tools/general/system-variables.util';

import { getClassNames, noOp } from '../../../../tools/general/helpers.util';

import { requestClientFieldList } from '../../../../redux/actions/client.action';

import SVGIcon from '../../icon/SVGIcon';
import ToolTip from '../../tool-tip/ToolTip';
import Button from '../../button/Button';
import InputSearch from '../../input-search/InputSearch';

export const TableTopBar = ({
                              filteredTableData,
                              hasSubGroups,
                              setFilteredTableData,
                              setActiveTableData,
                              clientRequestFields,
                              toggleDropdowns,
                              showClientsSideBar
                            }) => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  return (
    <div className={ getClassNames('client-fields__top-bar', { show: showClientsSideBar }) }>
      <div className="client-fields__top-bar-left">
        { hasSubGroups &&
          <>
            { !filteredTableData &&
              <div className="client-fields__top-bar-left-button">
                <Button icon={ DROPDOWN_ALL }
                        onClick={ toggleDropdowns } />
              </div> }
            { filteredTableData &&
              <div className="client-fields__top-bar-left-no-button" /> }
          </> }
        { !hasSubGroups &&
          <div className="client-fields__top-bar-left-no-button" /> }
        <p>{ `Recommendations: ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</p>
      </div>
      <div className="client-fields__top-bar-right">
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
                spaced
                onClick={ () => {
                  setFilteredTableData(undefined);
                  setActiveTableData([]);
                  dispatch(requestClientFieldList(clientRequestFields));
                } } />
      </div>
    </div>
  );
};

TableTopBar.propTypes = {
  filteredTableData: arrayOf(shape({})),
  hasSubGroups: bool,
  setFilteredTableData: func,
  setActiveTableData: func,
  clientRequestFields: shape({}),
  toggleDropdowns: func
};

export const TableSearchBar = ({ mappedFieldList, setFilteredTableData }) => {
  return <div className="client-fields__search">
    { (mappedFieldList?.length > 10) &&
      <InputSearch placeholder={ TABLE_SEARCH_PLACEHOLDER }
                   dataToFilter={ mappedFieldList }
                   setFilteredData={ setFilteredTableData }
                   table /> }
  </div>;
};

TableSearchBar.propTypes = {
  mappedFieldList: arrayOf(shape({})) || shape({}),
  setFilteredTableData: func.isRequired
};

export const FieldNameColumn = ({ dataIndex, value }) => {

  const getColor = (color) => {
    switch (color) {
      case '4278190080':
        return undefined;
      case '4294901760':
        return '#FF0000';
      case '4278190335':
        return '#0081ff';
    }
  };

  if (value?.locationName?.includes('-forecast')) {
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container-forecast' }>
        <div className={ 'table__body__row__td-container-forecast-upper' }>{ value?.locationName?.slice(0, -9) }</div>
        <div className={ 'table__body__row__td-container-forecast-lower' }>{ value?.summary }</div>
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
        <div className={ 'table__body__row__td-upper' }
             style={ { color: getColor(value?.color) } }>
          { value?.locationName }</div>
        <div className={ 'table__body__row__td-lower' }>{ value?.type }</div>
      </div>
      <DropDown value={ value }
                columnNumber={ 0 } />
    </td>;
  }
};

FieldNameColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

export const WarningIconColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        <ToolTip text={ value } />
        <SVGIcon name={ WARNING }
                 fill={ '#EE9A94' } />
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

WarningIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string
};

export const DropdownIconColumn = ({ dataIndex, value, setSelectedIndex, setSelectedDropdownObject, rowIndex, object }) => {
  if (value)
    return <td key={ dataIndex }>
      { (value?.tooltip) &&
        <div className={ 'table__body__row__td-container' }
             onClick={ () => {
               setSelectedIndex(rowIndex);
               setSelectedDropdownObject(object);
             } }>
          <ToolTip text={ value?.tooltip } />
          <SVGIcon name={ DROPDOWN }
                   fill={ '#53A5DF' } />
        </div> }
      <DropDown value={ value }
                columnNumber={ 2 } />
    </td>;
  else
    return <td key={ dataIndex } />;
};

DropdownIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({}),
  setSelectedIndex: func.isRequired,
  setSelectedDropdownObject: func.isRequired,
  rowIndex: number.isRequired,
  object: shape({}).isRequired
};

export const PhotoIconColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        <ToolTip text={ value } />
        <SVGIcon name={ CAMERA }
                 fill={ '#043b6e' } />
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

PhotoIconColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

export const LastReadingColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }
           style={ { color: '#0090ff' } }>
        <ToolTip text={ value?.tooltip } />
        { (value?.lastReading.includes('1970/')) ? '---' : value?.lastReading }
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

LastReadingColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

export const CaptureNoteColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        <ToolTip text={ value } />
        <SVGIcon name={ PENCIL } />
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

CaptureNoteColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

export const ChartColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        <ToolTip text={ value } />
        <SVGIcon name={ CHARTS } />
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

ChartColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

export const DeficitColumn = ({ dataIndex, value, isDropdownRow, isHeaderRow }) => {
  return <td onClick={ noOp() }
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
  </td>;
};

DeficitColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  isDropdownRow: bool,
  isHeaderRow: bool
};

export const UnitColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>
      <div className={ 'table__body__row__td-container' }>
        { value?.slice(0, 2) }
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

UnitColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string || shape({})
};

export const PrimaryForecastColumn = ({ dataIndex, value, columnNumber }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }
               className={ 'table__body__row__td--dark' }>

      { (value?.comment) &&
        <div className={ 'table__body__row__td-container' }>
          <div> { (value?.data === 0) ? '' : value?.data }</div>
          <div> { value?.comment ? value?.comment : '' }</div>
        </div> }

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
    </td>;
  else
    return <td key={ dataIndex } />;
};

PrimaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

export const SecondaryForecastColumn = ({ dataIndex, value, columnNumber }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }
               className={ 'table__body__row__td--light' }>

      { (value?.comment) &&
        <div className={ 'table__body__row__td-container' }>
          <div> { (value?.data === 0) ? '' : value?.data }</div>
          <div> { value?.comment ? value?.comment : '' }</div>
        </div> }

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
    </td>;
  else
    return <td key={ dataIndex } />;
};

SecondaryForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  columnNumber: number.isRequired
};

export const LandGroupForecastColumn = ({ dataIndex, value }) => {
  if (value)
    return <td onClick={ noOp() }
               key={ dataIndex }>

      <div className={ 'table__body__row__td-weather' }>
        <div className={ 'table__body__row__td-weather-left' }>
          <div className={ 'table__body__row__td-weather-left--icon' }>
            <div className={ 'table__body__row__td-weather-left--icon-container' }>
              { (() => {
                switch (value?.sid) {
                  case 1:
                    return <SVGIcon name={ SUNNY } fill={ '#FDC633' } />;
                  case 9:
                  case 10:
                  case 41:
                  case 46:
                    return <SVGIcon name={ RAIN } fill={ '#6495ED' } />;
                  case 2:
                    return <SVGIcon name={ PARTLY_CLOUDED } fill={ '#C2C2C1' } />;
                  case 3:
                  case 4:
                    return <SVGIcon name={ CLOUDED } fill={ '#C2C2C1' } />;
                }
              })() }
            </div>
          </div>
          <div className={ 'table__body__row__td-weather-left--wind' }>
            { value?.wind }
          </div>
        </div>
        <div className={ 'table__body__row__td-weather-right' }>
          <div className={ 'table__body__row__td-weather-right--max' }>
            { `${ value?.maks }°C` }
          </div>
          <div className={ 'table__body__row__td-weather-right--min' }>
            { `${ value?.min }°C` }
          </div>
          <div className={ 'table__body__row__td-weather-right--weer' }>
            { value?.weer }
          </div>
        </div>
      </div>
    </td>;
  else
    return <td key={ dataIndex } />;
};

LandGroupForecastColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({})
};

export const ForecastTimeIconsColumn = ({ dataIndex, value, isHeaderRow }) => {
  if (value && !isHeaderRow)
    return <td onClick={ noOp() }
               key={ dataIndex }
               className={ 'table__body__row__td--fade--thin' }>
      { !value?.dropdown &&
        <>
          <ToolTip text={ UNIT } />
          <SVGIcon name={ RAIN_CLOUDS } fill={ '#043b6e' } tiny />
          <SVGIcon name={ WATCH } fill={ '#043b6e' } tiny />
        </>
      }
    </td>;
  else
    return <td key={ dataIndex } />;
};

ForecastTimeIconsColumn.propTypes = {
  dataIndex: number.isRequired,
  value: string,
  isHeaderRow: bool
};

export const RainDataColumn = ({ dataIndex, value, object, setHoveredRowObject, columnNumber, setShowModal, isHeaderRow }) => {

  const openModal = (sensor) => {
    setHoveredRowObject({
      ...object,
      sensor: sensor,
      day: (() => {
        switch (columnNumber) {
          case 20:
            return 6;
          case 21:
            return 5;
          default:
            return (columnNumber - 15);
        }
      })()
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setHoveredRowObject(undefined);
    setShowModal(false);
  };

  if (!isHeaderRow)
    return <td onClick={ noOp() }
               key={ dataIndex }
               className={ 'table__body__row__td--fade' }>
      <div className={ 'table__body__row__td-container' }>
        <div onMouseEnter={ () => openModal(1) }
             onMouseLeave={ () => closeModal() }>
          { (value?.upper === 0) ? '' : value?.upper }
        </div>
        <div style={ { height: '2px' } } />
        <div onMouseEnter={ () => openModal(2) }
             onMouseLeave={ () => closeModal() }>
          { (value?.lower === 0) ? '' : value?.lower }
        </div>
      </div>
      <DropDown value={ value }
                columnNumber={ columnNumber } />
    </td>;
  else
    return <td key={ dataIndex } />;
};

RainDataColumn.propTypes = {
  dataIndex: number.isRequired,
  value: shape({}),
  object: shape({}),
  setHoveredRowObject: func.isRequired,
  columnNumber: number,
  setShowModal: func.isRequired
};

export const TransEvapTotalsColumn = ({ dataIndex, value }) => {
  return <td onClick={ noOp() }
             key={ dataIndex }>
    <div className={ 'table__body__row__td-container--centered' }>
      { value }
    </div>
  </td>;
};

TransEvapTotalsColumn.propTypes = {
  dataIndex: number.isRequired,
  value: number
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
                case 0:
                  return item?.name;
                case 2:
                  return item?.pers;
                case 9:
                  return (item?.['aanb 1'] !== 0) ? item?.['aanb 1'] : '';
                case 10:
                  return (item?.['aanb 2'] !== 0) ? item?.['aanb 2'] : '';
                case 11:
                  return (item?.['aanb 3'] !== 0) ? item?.['aanb 3'] : '';
                case 12:
                  return (item?.['aanb 4'] !== 0) ? item?.['aanb 4'] : '';
                case 13:
                  return (item?.['aanb 5'] !== 0) ? item?.['aanb 5'] : '';
                case 14:
                  return (item?.['aanb 6'] !== 0) ? item?.['aanb 6'] : '';
                case 15:
                  return (item?.['aanb 7'] !== 0) ? item?.['aanb 7'] : '';
                case 21:
                  return (item?.['30d'] !== 0) ? item?.['30d'] : '';
                case 22:
                  return (item?.['Total'] !== 0) ? item?.['Total'] : '';
              }
            })() }
          </div>);
      }) }
    </div>
  );
};

DropDown.propTypes = {
  value: shape({}),
  columnNumber: number,
  onClick: func
};