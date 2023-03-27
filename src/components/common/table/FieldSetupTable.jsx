import { useHistory, useParams } from 'react-router';
import { generateId, isEmpty, noOp, removeCamelCase } from '../../../tools/general/helpers.util';
import { handleRowDoubleClick, hideColumnHeader } from './TableFunctions.util';
import {
  ADD_PROBE,
  ARCHIVE_FIELD,
  CHARTS,
  COPY_FIELD,
  DELETE_FIELD,
  FIELD_CHARTS,
  FIX_READINGS,
  FORECAST,
  GENERAL_ROUTE,
  GROUP,
  HA,
  HARVEST_DATE_,
  MAXMM,
  navigateTo,
  NONE,
  ORDER,
  PLANT_DATE_,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  REMOVE_PROBE,
  RENAME_FIELD,
  REPLACE_PROBE_WITH_NEW,
  ROOTS_ROUTE,
  SENSORS_ROUTE,
  TOGGLE_OFF,
  TOGGLE_ON,
  UNIT_,
  VIEW_CHARTS
} from '../../../tools/general/system-variables.util';
import { arrayOf, number, shape, string } from 'prop-types';
import React, { useRef, useState } from 'react';
import TextInput from '../input/text/TextInput';
import Select from '../select/Select';
import DatePick from '../date-picker/DatePick';
import ComboBox from '../combo-box/ComboBox';
import SVGIcon from '../SVGIcon/SVGIcon';

import './table.scss';

export const FieldSetupTable = ({
                                  tableName,
                                  activeTableData,
                                  mappedDropdownList,
                                  hiddenColumns,
                                  selectedIndex,
                                  setSelectedIndex,
                                  valueToUpdate,
                                  setValueToUpdate,
                                  updateFieldDetails,
                                  setActiveTableData,
                                  setUpdatedFieldList,
                                  setSelectedProbeNumber,
                                  setSelectedFieldName
                                }) => {

  const history = useHistory();
  const { groupName, clientName, activeScreen } = useParams();

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData?.[0]);
      headers = objectKeys?.filter((key) => !hiddenColumns?.includes(key)).map((key) => (
        <th key={ generateId() }
            style={ { color: hideColumnHeader(tableName, key) } }>
          <div className="table__header-row__text--field-setup">
            { removeCamelCase(key) }
          </div>
        </th>
      ));
    }

    return (
      <thead className="table__header">
      <tr className="table__header-row">
        { headers }
      </tr>
      </thead>
    );
  };

  const buildTableBody = () => {
    if (!activeTableData) return;
    const rows = activeTableData?.map((object, rowIndex) => {

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns?.includes(property)) {
          objectValues?.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 0:
              return <FieldSetupChartButton history={ history }
                                            groupName={ groupName }
                                            clientName={ clientName }
                                            dataIndex={ dataIndex }
                                            value={ value }
                                            particularScreen={ PROBES_DETAILED_ROUTE }
                                            activeScreen={ activeScreen }
                                            icon={ activeScreen === PROBES_DETAILED_ROUTE ? NONE : VIEW_CHARTS } />;
            case 1:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              particularScreen={ ROOTS_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ CHARTS }
                              fill={ '#607CB1' } />;
            case 2:
              return <FieldSetupNameColumn dataIndex={ dataIndex }
                                           name={ value?.name }
                                           probe={ value?.probe }
                                           value={ value } />;
            case 3:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              mappedDropdownList={ mappedDropdownList?.[0] }
                              particularScreen={ PROBES_SUMMARY_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ value === 'Active' ? TOGGLE_ON : TOGGLE_OFF }
                              fill={ value === 'Active' ? '#0090ff' : 'rgba(100, 105, 130, 0.50)' } />;
            case 4:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ PROBES_SUMMARY_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ FIX_READINGS }
                              fill={ '#607CB1' } />;
            case 5:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              particularScreen={ PROBES_SUMMARY_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ REPLACE_PROBE_WITH_NEW }
                              selectedIndex={ selectedIndex }
                              updateFieldDetails={ updateFieldDetails }
                              fieldList={ activeTableData }
                              setActiveTableData={ setActiveTableData }
                              rowIndex={ rowIndex }
                              setUpdatedFieldList={ setUpdatedFieldList } />;
            case 6:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ PROBES_SUMMARY_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ ADD_PROBE }
                              fill={ '#63e016' } />;
            case 7:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ PROBES_SUMMARY_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ REMOVE_PROBE }
                              fill={ 'red' } />;
            case 8:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ SENSORS_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ value === '1' ? TOGGLE_ON : TOGGLE_OFF }
                              fill={ value === '1' ? '#0090ff' : 'rgba(100, 105, 130, 0.50)' } />;
            case 9:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              mappedDropdownList={ mappedDropdownList?.[1] }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ SENSORS_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ value === '1' ? TOGGLE_ON : TOGGLE_OFF }
                              fill={ value === '1' ? '#0090ff' : 'rgba(100, 105, 130, 0.50)' } />;
            case 10:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              valueToUpdate={ valueToUpdate }
                              setValueToUpdate={ setValueToUpdate }
                              updateFieldDetails={ updateFieldDetails }
                              particularScreen={ PROBES_DETAILED_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ value === '1' ? TOGGLE_ON : TOGGLE_OFF }
                              fill={ value === '1' ? '#0090ff' : 'rgba(100, 105, 130, 0.50)' } />;
            case 11:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              particularScreen={ GENERAL_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ RENAME_FIELD }
                              fill={ '#0090ff' } />;
            case 12:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              particularScreen={ GENERAL_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ COPY_FIELD }
                              fill={ 'grey' } />;
            case 13:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              particularScreen={ GENERAL_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ ARCHIVE_FIELD }
                              fill={ '#f37b2c' } />;
            case 14:
              return <RowData history={ history }
                              groupName={ groupName }
                              clientName={ clientName }
                              dataIndex={ dataIndex }
                              value={ value }
                              particularScreen={ GENERAL_ROUTE }
                              activeScreen={ activeScreen }
                              icon={ DELETE_FIELD }
                              fill={ 'red' } />;
            default:
              return <FieldSetupNameColumn dataIndex={ dataIndex }
                                           name={ value?.name }
                                           probe={ value?.probe }
                                           value={ value } />;
          }
        });
      }

      return (
        <tr className={ 'table__body__row' }
            data-id={ object }
            onMouseOver={ () => {
              setSelectedFieldName(object?.['']?.split('*_*')[0]);
              setSelectedProbeNumber(object?.['']?.split('*_*')[1]?.slice(0, -1));
            } }
            onDoubleClick={ () => handleRowDoubleClick(history, groupName, clientName, object?.fieldName) }
            key={ generateId() }>
          { tableDataElements }
        </tr>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr key={ generateId() }>
          <td>{ 'Loading...' }</td>
        </tr> }
      </tbody>
    );
  };

  return (
    <table className="table">
      { buildTableHeader() }
      { buildTableBody() }
    </table>
  );
};

FieldSetupTable.propTypes = {
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

export const FieldSetupNameColumn = ({ dataIndex, name, probe, value }) => {

  return <td onClick={ noOp() }
             key={ generateId() }
             className="min-w-[110px]">
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
    <td key={ generateId() }
        className="min-w-[100px]">
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
        className="min-w-[100px]">
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
        className="min-w-[100px]">
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

  const [inputValue, setInputValue] = useState({ id: findIndexByText(mappedDropdownList, value ), name: value });

  const ref = useRef(null);

  const handleSubmit = (event, columnIndex) => {
    const newValue = event.name;
    const fieldName = [FORECAST, GROUP, HA, ORDER, PLANT_DATE_, HARVEST_DATE_, UNIT_][columnIndex - 3];
    updateFieldDetails(fieldName, newValue);
  };

  function findIndexByText(list, searchText) {
    if (typeof searchText !== 'string') return -1;
    return list?.findIndex((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  return (
    <td key={ generateId() }
        className="min-w-[100px]">
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

const RowData = ({
                   activeScreen,
                   particularScreen,
                   history,
                   groupName,
                   clientName,
                   dataIndex,
                   value,
                   icon,
                   fill,
                   selectedIndex,
                   valueToUpdate,
                   mappedDropdownList,
                   setValueToUpdate,
                   updateFieldDetails,
                   fieldList,
                   setActiveTableData,
                   rowIndex,
                   setUpdatedFieldList
                 }) => {

  if (activeScreen === particularScreen)
    return <FieldSetupChartButton history={ history }
                                  groupName={ groupName }
                                  clientName={ clientName }
                                  dataIndex={ dataIndex }
                                  value={ value }
                                  activeScreen={ activeScreen }
                                  icon={ icon }
                                  fill={ fill } />;
  else if ([3].includes(dataIndex) && activeScreen === GENERAL_ROUTE)
    return <FieldSetupComboBoxColumn value={ value }
                                     valueToUpdate={ valueToUpdate }
                                     setValueToUpdate={ setValueToUpdate }
                                     updateFieldDetails={ updateFieldDetails }
                                     selectedIndex={ selectedIndex }
                                     fieldList={ fieldList }
                                     setActiveTableData={ setActiveTableData }
                                     mappedDropdownList={ mappedDropdownList }
                                     rowIndex={ rowIndex }
                                     columnIndex={ dataIndex }
                                     setUpdatedFieldList={ setUpdatedFieldList } />;
  else if ([9].includes(dataIndex) && activeScreen === GENERAL_ROUTE)
    return <FieldSetupComboBoxColumn value={ value }
                                     valueToUpdate={ valueToUpdate }
                                     setValueToUpdate={ setValueToUpdate }
                                     updateFieldDetails={ updateFieldDetails }
                                     selectedIndex={ selectedIndex }
                                     fieldList={ fieldList }
                                     setActiveTableData={ setActiveTableData }
                                     mappedDropdownList={ mappedDropdownList }
                                     rowIndex={ rowIndex }
                                     columnIndex={ dataIndex }
                                     setUpdatedFieldList={ setUpdatedFieldList }
                                     shortened />;
  else if ([7, 8].includes(dataIndex) && activeScreen === GENERAL_ROUTE)
    return <FieldSetupDatePickerColumn value={ value }
                                       valueToUpdate={ valueToUpdate }
                                       setValueToUpdate={ setValueToUpdate }
                                       updateFieldDetails={ updateFieldDetails }
                                       selectedIndex={ selectedIndex }
                                       fieldList={ fieldList }
                                       setActiveTableData={ setActiveTableData }
                                       rowIndex={ rowIndex }
                                       columnIndex={ dataIndex }
                                       setUpdatedFieldList={ setUpdatedFieldList }
                                       hasDatePicker />;
  else if ([4, 5, 6, 10].includes(dataIndex) && activeScreen === GENERAL_ROUTE)
    return <FieldSetupInputColumn value={ value }
                                  valueToUpdate={ valueToUpdate }
                                  setValueToUpdate={ setValueToUpdate }
                                  updateFieldDetails={ updateFieldDetails }
                                  selectedIndex={ selectedIndex }
                                  fieldList={ fieldList }
                                  setActiveTableData={ setActiveTableData }
                                  rowIndex={ rowIndex }
                                  columnIndex={ dataIndex }
                                  setUpdatedFieldList={ setUpdatedFieldList } />;
  else
    return <FieldSetupNameColumn dataIndex={ dataIndex }
                                 activeScreen={ activeScreen }
                                 name={ value?.name }
                                 probe={ value?.probe }
                                 value={ value } />;
};
