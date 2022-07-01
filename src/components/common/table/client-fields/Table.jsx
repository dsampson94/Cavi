import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { arrayOf, shape, string } from 'prop-types';
import { generateId, getClassNames, isEmpty, removeCamelCase } from '../../../../tools/general/helpers.util';
import { handleRowDoubleClick, hideColumnHeader } from './TableFunctions.util';

import {
  CaptureNoteColumn,
  ChartColumn,
  DeficitColumn,
  DropdownIconColumn,
  FieldNameColumn,
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

import RecommendationModal from '../../modal/RecommendationModal';

import './table.scss';

const Table = ({ tableName, activeTableData, hiddenColumns, setSelectedIndex, setSelectedDropdownObject, clientRequestFields }) => {

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
                                         object={ object } />;
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
                             clientRequestFields={ clientRequestFields }
                             showModal={ showModal } /> }
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

Table.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string).isRequired
};

export default Table;
