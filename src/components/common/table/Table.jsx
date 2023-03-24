import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { arrayOf, shape, string } from 'prop-types';

import {
  ADD_PROBE,
  ARCHIVE_FIELD,
  CHARTS,
  CLIENT_RECOMMENDATION_VIEW,
  COPY_FIELD,
  DELETE_FIELD,
  FIELD_CHARTS_MODAL_VIEW,
  FIELD_REPORTS_VIEW,
  FIELD_SETUP_VIEW,
  FIX_READINGS,
  GENERAL_ROUTE,
  LAST_READINGS_VIEW,
  MONITOR_PROBES_VIEW,
  NONE,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  REMOVE_PROBE,
  RENAME_FIELD,
  REPLACE_PROBE_WITH_NEW,
  ROOTS_ROUTE,
  SENSORS_ROUTE,
  TOGGLE_OFF,
  TOGGLE_ON,
  VIEW_CHARTS
} from '../../../tools/general/system-variables.util';

import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

import {
  CaptureNoteColumn,
  ChartColumn,
  DeficitColumn,
  DropdownIconColumn,
  FieldNameColumn,
  FieldSetupChartButton,
  FieldSetupComboBoxColumn,
  FieldSetupDatePickerColumn,
  FieldSetupInputColumn,
  FieldSetupNameColumn,
  ForecastTimeIconsColumn,
  LandGroupForecastColumn,
  LastReadingColumn,
  PhotoIconColumn,
  PrimaryForecastColumn,
  RainDataColumn,
  SecondaryForecastColumn,
  TransEvapTotalsColumn,
  UnitColumn,
  WarningIconColumn
} from './TableComponents.util';

import { generateId, getClassNames, isEmpty, removeCamelCase } from '../../../tools/general/helpers.util';
import { handleRowDoubleClick, hideColumnHeader } from './TableFunctions.util';

import RecommendationModal from '../modal/RecommendationModal';

import './table.scss';

const Table = ({
                 tableName,
                 activeTableData,
                 setActiveTableData,
                 mappedDropdownList,
                 hiddenColumns,
                 selectedIndex,
                 setSelectedIndex,
                 setSelectedDropdownObject,
                 updateFieldDetails,
                 setUpdatedFieldList,
                 valueToUpdate,
                 setValueToUpdate,
                 toggleDropdowns,
                 setSelectedFieldName,
                 setSelectedProbeNumber
               }) => {

  switch (tableName) {
    case CLIENT_RECOMMENDATION_VIEW:
      return <ClientFieldsTable tableName={ tableName }
                                activeTableData={ activeTableData }
                                hiddenColumns={ hiddenColumns }
                                setSelectedIndex={ setSelectedIndex }
                                setSelectedDropdownObject={ setSelectedDropdownObject }
                                toggleDropdowns={ toggleDropdowns } />;
    case MONITOR_PROBES_VIEW:
      return <MonitorProbesTable tableName={ tableName }
                                 activeTableData={ activeTableData }
                                 hiddenColumns={ hiddenColumns }
                                 setSelectedIndex={ setSelectedIndex }
                                 setSelectedDropdownObject={ setSelectedDropdownObject } />;
    case LAST_READINGS_VIEW:
      return <LastReadingsTable tableName={ tableName }
                                activeTableData={ activeTableData }
                                hiddenColumns={ hiddenColumns }
                                setSelectedIndex={ setSelectedIndex }
                                setSelectedDropdownObject={ setSelectedDropdownObject } />;
    case FIELD_CHARTS_MODAL_VIEW:
    case FIELD_SETUP_VIEW:
    case FIELD_REPORTS_VIEW:
      return <FieldSetupTable tableName={ tableName }
                              activeTableData={ activeTableData }
                              mappedDropdownList={ mappedDropdownList }
                              hiddenColumns={ hiddenColumns }
                              selectedIndex={ selectedIndex }
                              setSelectedIndex={ setSelectedIndex }
                              setSelectedDropdownObject={ setSelectedDropdownObject }
                              updateFieldDetails={ updateFieldDetails }
                              setActiveTableData={ setActiveTableData }
                              setUpdatedFieldList={ setUpdatedFieldList }
                              valueToUpdate={ valueToUpdate }
                              setSelectedFieldName={ setSelectedFieldName }
                              setSelectedProbeNumber={ setSelectedProbeNumber }
                              setValueToUpdate={ setValueToUpdate } />;
  }
};

export default Table;

const ClientFieldsTable = ({ tableName, activeTableData, hiddenColumns, setSelectedIndex, setSelectedDropdownObject, toggleDropdowns }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [hoveredRowObject, setHoveredRowObject] = useState(undefined);

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key) => (
        <th key={ generateId() }
            style={ { color: hideColumnHeader(tableName, key) } }>
          <div className="table__header-row__text">
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
      let objectLocationName = object?.fieldName?.locationName;
      let isHeaderRow = (objectLocationName?.includes('-forecast') || objectLocationName?.includes('-landGroup'));
      let isDropdownRow = !!(object?.b?.sublande);

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 0:
              return <FieldNameColumn dataIndex={ dataIndex }
                                      value={ value } />;
            case 1:
              return <WarningIconColumn dataIndex={ dataIndex }
                                        value={ value } />;
            case 2:
              return <DropdownIconColumn dataIndex={ dataIndex }
                                         value={ value }
                                         setSelectedIndex={ setSelectedIndex }
                                         setSelectedDropdownObject={ setSelectedDropdownObject }
                                         rowIndex={ rowIndex }
                                         object={ object }
                                         toggleDropdowns={ toggleDropdowns } />;
            case 3:
              return <PhotoIconColumn dataIndex={ dataIndex }
                                      value={ value } />;
            case 4:
              return <LastReadingColumn dataIndex={ dataIndex }
                                        value={ value } />;

            case 5:
              return <CaptureNoteColumn dataIndex={ dataIndex }
                                        value={ value } />;
            case 6:
              return <ChartColumn dataIndex={ dataIndex }
                                  value={ value } />;
            case 7:
              return <DeficitColumn dataIndex={ dataIndex }
                                    value={ value }
                                    isDropdownRow={ isDropdownRow }
                                    isHeaderRow={ isHeaderRow } />;
            case 8:
              return <UnitColumn dataIndex={ dataIndex }
                                 value={ value } />;
            case 9:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 9 }
                                              value={ value } />;
            case 10:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 10 }
                                                value={ value } />;
            case 11:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 11 }
                                              value={ value } />;
            case 12:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 12 }
                                                value={ value } />;
            case 13:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 13 }
                                              value={ value } />;

            case 14:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 14 }
                                                value={ value } />;
            case 15:
              if (value?.weather)
                return <LandGroupForecastColumn dataIndex={ dataIndex }
                                                value={ value?.weather } />;
              else
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 15 }
                                              value={ value } />;
            case 16:
              return <ForecastTimeIconsColumn dataIndex={ dataIndex }
                                              value={ value }
                                              isHeaderRow={ isHeaderRow } />;
            case 17:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 16 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 18:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 17 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 19:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 18 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 20:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 19 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 21:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 20 }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 22:
              return <RainDataColumn dataIndex={ dataIndex }
                                     value={ value }
                                     object={ object }
                                     setHoveredRowObject={ setHoveredRowObject }
                                     columnNumber={ 21 }
                                     showModal={ showModal }
                                     setShowModal={ setShowModal }
                                     isHeaderRow={ isHeaderRow } />;
            case 23:
            case 24:
            case 25:
              return <TransEvapTotalsColumn dataIndex={ dataIndex }
                                            value={ value } />;
            default:
              return <td key={ dataIndex } />;
          }
        });
      }

      return (
        <>
          { !isDropdownRow &&
          <tr className={ getClassNames('table__body__row',
            { header: isHeaderRow, hidden: !(object?.fieldName?.locationName), selected: (object === selectedRow) }) }
              onClick={ () => setSelectedRow(object) }
              onDoubleClick={ () => handleRowDoubleClick(history, groupName, clientName, object?.fieldName) }
              key={ generateId() }>
            { tableDataElements }
          </tr> }

          { object.expanded && isDropdownRow &&
          <tr className={ 'table__body__row' }
              key={ generateId() }>
            { tableDataElements }
          </tr> }
        </>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr key={ generateId() }>
          <td>{ `No active fields currently set up on ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</td>
        </tr> }

      { showModal &&
      <RecommendationModal activeObject={ hoveredRowObject }
                           handleClose={ setShowModal } /> }
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

ClientFieldsTable.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

const FieldSetupTable = ({
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
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

const MonitorProbesTable = ({
                              tableName,
                              activeTableData,
                              hiddenColumns,
                              setSelectedIndex,
                              setSelectedDropdownObject,
                              toggleDropdowns
                            }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  const [selectedRow, setSelectedRow] = useState(undefined);
  const [hoveredRowObject, setHoveredRowObject] = useState(undefined);

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key) => (
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
      let objectLocationName = object?.fieldName?.locationName;
      let isHeaderRow = (objectLocationName?.includes('-forecast') || objectLocationName?.includes('-landGroup'));

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 1:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs underline"
                     onClick={ () => history.push(`/client/${ objectValues[0]?.toLowerCase() }/${ value?.toLowerCase() }`) }>
                  { value }
                </div>
              </td>;
            case 2:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs">
                  { value }
                </div>
              </td>;
            case 4:
            case 5:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs ">
                  { value }
                </div>
              </td>;
            case 11:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div>
                  { value === 'Active' ?
                    <CheckIcon className="h-6 w-6 text-green-500" /> :
                    <XMarkIcon className="h-6 w-6 text-red-500" /> }
                </div>
              </td>;
            default:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs">
                  { value }
                </div>
              </td>;
          }
        });
      }

      return (
        <>
          <tr className={ getClassNames('table__body__row',
            { header: isHeaderRow, selected: (object === selectedRow) }) }
              onClick={ () => setSelectedRow(object) }
              onDoubleClick={ () => handleRowDoubleClick(history, groupName, clientName, object?.fieldName) }
              key={ generateId() }>
            { tableDataElements }
          </tr>
        </>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr key={ generateId() }>
          <td className="text-xs">{ '' }</td>
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

MonitorProbesTable.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

const LastReadingsTable = ({
                             tableName,
                             activeTableData,
                             hiddenColumns,
                             setSelectedIndex,
                             setSelectedDropdownObject,
                             toggleDropdowns
                           }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  const [selectedRow, setSelectedRow] = useState(undefined);
  const [hoveredRowObject, setHoveredRowObject] = useState(undefined);

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key) => (
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
      let objectLocationName = object?.fieldName?.locationName;
      let isHeaderRow = (objectLocationName?.includes('-forecast') || objectLocationName?.includes('-landGroup'));

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 0:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs">
                  { value }
                </div>
              </td>;
            default:
              return <td key={ generateId() }
                         className="whitespace-nowrap min-w-fit px-1">
                <div className="flex text-xs">
                  { value }
                </div>
              </td>;
          }
        });
      }

      return (
        <>
          <tr className={ getClassNames('table__body__row',
            { header: isHeaderRow, selected: (object === selectedRow) }) }
              onMouseDown={ () => setSelectedRow(object) }
              onDoubleClick={ () => handleRowDoubleClick(history, groupName, clientName, object?.fieldName) }
              key={ generateId() }>
            { tableDataElements }
          </tr>
        </>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr key={ generateId() }>
          <td className="text-xs">{ '' }</td>
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

LastReadingsTable.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
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
