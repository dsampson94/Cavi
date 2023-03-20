import React, { useRef, useState } from 'react';

import { arrayOf, bool, func, number, shape, string } from 'prop-types';

import {
  CAMERA,
  CHARTS,
  CLOUDED,
  DROPDOWN,
  FIELD_CHARTS,
  FORECAST,
  GROUP,
  HA,
  HARVEST,
  HARVEST_DATE_,
  HARVEST_ICON,
  LOW_BATTERY,
  MAXMM,
  navigateTo,
  NONE,
  ORDER,
  PARTLY_CLOUDED,
  PENCIL,
  PLANT_DATE_,
  RAIN_CLOUDS,
  RAINING,
  SUNNY,
  TABLE_SEARCH_PLACEHOLDER,
  UNIT,
  UNIT_,
  VIEW_CHARTS,
  WARNING,
  WATCH
} from '../../../tools/general/system-variables.util';

import { generateId, getClassNames, noOp } from '../../../tools/general/helpers.util';

import SVGIcon from '../SVGIcon/SVGIcon';
import ToolTipRelative from '../tool-tip/ToolTipRelative';
import InputSearch from '../input-search/InputSearch';
import TextInput from '../input/text/TextInput';
import Select from '../select/Select';
import ComboBox from '../combo-box/ComboBox';
import DatePick from '../date-picker/DatePick';

import './table.scss';

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
               key={ dataIndex }
               className="min-w-fit">
      <div className={ 'table__body__row__td-container' }>

        <div className={ 'table__body__row__td-upper' }
             style={ { color: getColor(value?.color) } }>
          { value?.locationName }
        </div>

        <div className={ 'table__body__row__td-lower' }>
          { value?.type }
        </div>

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
        <ToolTipRelative text={ value } />
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

export const DropdownIconColumn = ({
                                     dataIndex,
                                     value,
                                     setSelectedIndex,
                                     setSelectedDropdownObject,
                                     rowIndex,
                                     object,
                                     toggleDropdowns
                                   }) => {
  if (value)
    return <td key={ dataIndex } ondblclick={ toggleDropdowns }>
      { (value?.tooltip) &&
      <div className={ 'table__body__row__td-container' }
        // onClick={ () => {setSelectedIndex(rowIndex);setSelectedDropdownObject(object); } }
           onClick={ toggleDropdowns }>

        <ToolTipRelative text={ value?.tooltip } />
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
        <ToolTipRelative text={ value } />
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
        <ToolTipRelative text={ value?.tooltip } />

        { (value?.hasBattery) && <>
          <p className={ 'table__body__row__td-container__battery-text' }>
            { (value?.lastReading.includes('1970/')) ? '---' : value?.lastReading }
          </p>
          <SVGIcon name={ LOW_BATTERY } fill={ 'orange' } />
        </> }

        { !(value?.hasBattery) && <>
          <p className={ 'table__body__row__td-container__text' }>
            { (value?.lastReading.includes('1970/')) ? '---' : value?.lastReading }
          </p>
        </> }
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
        <ToolTipRelative text={ value } />
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
        <ToolTipRelative text={ value } />
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
    <div className={ 'table__body__row__td-container' }
         style={ { margin: '6px 0 6px 0' } }>
      { value?.tooltip && <ToolTipRelative text={ value?.tooltip } /> }
      <div className={ 'table__body__row__td-upper--deficit' }
           style={ {
             backgroundColor: value?.colorTop === '#F9FFFA' ? 'grey' : value?.colorTop
           } }>
        { value?.top }
      </div>
      <div className={ (isHeaderRow) ? 'table__body__row__td-lower' : 'table__body__row__td-lower--deficit' }
           style={ {
             backgroundColor: value?.colorBot === '#F9FFFA' ? 'grey' : value?.colorBot
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
        <ToolTipRelative text={ HARVEST } />
        <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
      </div> }

      { (value?.harvest && value?.data !== 0) &&
      <div className={ 'table__body__row__td-container' }>
        { (value?.data === 0) ? '' : value?.data }
        <div className={ 'table__body__row__td-container__icon' }>
          <ToolTipRelative text={ HARVEST } />
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
        <ToolTipRelative text={ HARVEST } />
        <SVGIcon name={ HARVEST_ICON } fill={ '#C7DD9D' } />
      </div> }

      { (value?.harvest && value?.data !== 0) &&
      <div className={ 'table__body__row__td-container' }>
        { (value?.data === 0) ? '' : value?.data }
        <div className={ 'table__body__row__td-container__icon' }>
          <ToolTipRelative text={ HARVEST } />
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
                    return <SVGIcon name={ RAINING } fill={ '#6495ED' } />;
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
            { value?.windDisplay }
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
        <ToolTipRelative text={ UNIT } />
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

  const [holdChartOpen, setHoldChartOpen] = useState(false);

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
             style={ { color: holdChartOpen ? '#54a4d9' : null } }
             className={ 'table__body__row__td-container--hoverable' }
             onClick={ () => setHoldChartOpen(!holdChartOpen) }
             onMouseLeave={ holdChartOpen ? null : () => closeModal() }>
          { (value?.upper === 0) ? '' : value?.upper }
        </div>

        <div style={ { height: '2px' } } />

        <div onMouseEnter={ () => openModal(2) }
             className={ 'table__body__row__td-container--hoverable' }
             onClick={ () => setHoldChartOpen(!holdChartOpen) }
             onMouseLeave={ holdChartOpen ? null : () => closeModal() }>
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

export const FieldSetupNameColumn = ({ dataIndex, name, probe, value }) => {

  return <td onClick={ noOp() }
             key={ generateId() }>
    <div className={ 'table__body__row__td-container--field-setup' }>
      {/*<ToolTipRelative text={ value } />*/ }
      { (name) ? name :
        (probe) ? probe :
          (value) ? value.toString() : '' }
    </div>
  </td>;
};

FieldSetupNameColumn.propTypes = {
  value: string || number
};

export const FieldSetupInputColumn = ({
                                        value,
                                        updateFieldDetails,
                                        valueToUpdate,
                                        setValueToUpdate,
                                        rowIndex,
                                        columnIndex
                                      }) => {

  const [inputValue, setInputValue] = useState(value);

  const ref = useRef(null);

  const getFocus = (event) => {
    ref.current = event.target;
    ref.current.focus();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event, columnIndex) => {
    const fieldName = [FORECAST, GROUP, HA, ORDER, PLANT_DATE_, HARVEST_DATE_, UNIT_, MAXMM][columnIndex - 3];
    const newValue = event.target.value;
    updateFieldDetails(fieldName, newValue);
    ref.current = undefined;
  };

  return (
    <td key={ generateId() }>
      <TextInput
        ref={ ref }
        value={ inputValue }
        onMouseOver={ (event) => getFocus(event) }
        onChange={ (event) => handleInputChange(event) }
        onKeyDown={ (event) => {
          getFocus(event);
          if (event.key === 'Enter') handleSubmit(event, columnIndex);
        } }
        table
      />
    </td>
  );
};

export const FieldSetupSelectColumn = ({
                                         value,
                                         updateFieldDetails,
                                         mappedDropdownList,
                                         valueToUpdate,
                                         setValueToUpdate,
                                         rowIndex,
                                         columnIndex,
                                         hasDatePicker
                                       }) => {

  const [inputValue, setInputValue] = useState({ id: 0, name: value });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const ref = useRef(null);

  const getFocus = (event) => {
    ref.current = event.target;
    ref.current.focus();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event, columnIndex) => {
    console.log(event);
    const fieldName = [FORECAST, GROUP, HA, ORDER, PLANT_DATE_, HARVEST_DATE_, UNIT_, MAXMM][columnIndex - 3];
    const newValue = event.target.value;
    setInputValue(newValue);
    updateFieldDetails(fieldName, newValue);
    setValueToUpdate(newValue);
  };

  function findIndexByText(list, searchText) {
    return list?.findIndex((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  return (
    <td key={ generateId() }
        onClick={ (event) => event.stopPropagation() }
        className="relative min-w-fit">
      <Select list={ mappedDropdownList }
              activeItem={ { id: findIndexByText(mappedDropdownList, value), name: value } }
              setActiveItem={ event => handleSubmit(event.target.value, columnIndex) }
              ref={ ref }
              hasDatePicker={ hasDatePicker }
              selectedDate={ selectedDate }
              setSelectedDate={ setSelectedDate }
              table
      />
    </td>
  );
};

export const FieldSetupDatePickerColumn = ({
                                             value,
                                             updateFieldDetails,
                                             mappedDropdownList,
                                             valueToUpdate,
                                             setValueToUpdate,
                                             rowIndex,
                                             columnIndex,
                                             hasDatePicker
                                           }) => {

  const ref = useRef(null);

  const getFocus = (event) => {
    ref.current = event.target;
    ref.current.focus();
  };

  const handleSubmit = (date) => {
    const fieldName = [FORECAST, GROUP, HA, ORDER, PLANT_DATE_, HARVEST_DATE_, UNIT_, MAXMM][columnIndex - 3];
    updateFieldDetails(fieldName, date);
    setValueToUpdate(date);
  };

  function findIndexByText(list, searchText) {
    return list?.findIndex((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  return (
    <td key={ generateId() }
        className="relative min-w-fit">
      <DatePick list={ mappedDropdownList }
                value={ value }
                onMouseOver={ (event) => getFocus(event) }
                ref={ ref }
                activeItem={ { id: findIndexByText(mappedDropdownList, value), name: value } }
                setActiveItem={ handleSubmit }
                columnIndex={ columnIndex }
      />
    </td>
  );
};

FieldSetupInputColumn.propTypes = {
  value: string
};

export const FieldSetupComboBoxColumn = ({
                                           value,
                                           updateFieldDetails,
                                           mappedDropdownList,
                                           valueToUpdate,
                                           setValueToUpdate,
                                           rowIndex,
                                           columnIndex,
                                           shortened
                                         }) => {

  const [inputValue, setInputValue] = useState({ id: findIndexByText(mappedDropdownList, value), name: value });

  const ref = useRef(null);

  const handleSubmit = (event, columnIndex) => {
    const newValue = event.name;
    const fieldName = [FORECAST, GROUP, HA, ORDER, PLANT_DATE_, HARVEST_DATE_, UNIT_][columnIndex - 3];
    updateFieldDetails(fieldName, newValue);
  };

  function findIndexByText(list, searchText) {
    return list?.findIndex((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  return (
    <td key={ generateId() }
        className="relative min-w-fit">
      <ComboBox list={ mappedDropdownList }
                activeItem={ inputValue }
                setActiveItem={ event => handleSubmit(event, columnIndex) }
                ref={ ref }
                shortened={ shortened }
                table
      />
    </td>
  );
};

FieldSetupComboBoxColumn.propTypes = {
  value: string
};

export const FieldSetupChartButton = ({ history, groupName, clientName, icon, value, fill }) => {

  switch (icon) {
    case VIEW_CHARTS:
      return <TableRowChartButton history={ history }
                                  groupName={ groupName }
                                  clientName={ clientName }
                                  value={ value }
                                  icon={ icon } />;
    case NONE:
      return <FieldSetupNameColumn name={ value?.name }
                                   probe={ value?.probe }
                                   value={ value } />;

    default:
      return <TableRowButton history={ history }
                             groupName={ groupName }
                             clientName={ clientName }
                             value={ value }
                             icon={ icon }
                             fill={ fill } />;
  }
};

FieldSetupChartButton.propTypes = {
  value: string
};

const TableRowChartButton = ({ history, groupName, clientName, value, icon }) => {

  const handleRowChartButtonClick = () => {
    const probeNumber = value?.split('*_*')[1]?.slice(0, -1);
    if (probeNumber === 'undefined') return undefined;
    const fieldName = value?.split('*_*')[0];
    navigateTo(FIELD_CHARTS, history, groupName, clientName, probeNumber, fieldName);
  };

  return <td onClick={ noOp() }
             key={ generateId() }>

    <SVGIcon name={ icon }
             onClick={ () => handleRowChartButtonClick() }
             fill={ '#f37b2c' }
             row />

  </td>;
};


TableRowChartButton.propTypes = {
  value: string
};

const TableRowButton = ({ history, groupName, clientName, value, icon, fill }) => {

  const handleRowChartButtonClick = () => {
  };

  return <td onClick={ noOp() }
             key={ generateId() }>
    <SVGIcon name={ icon }
             onClick={ () => handleRowChartButtonClick() }
             fill={ fill }
             left
             row />

  </td>;
};


TableRowButton.propTypes = {
  value: string
};
