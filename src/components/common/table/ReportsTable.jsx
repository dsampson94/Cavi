import React, { useState } from 'react';

import { arrayOf, shape, string } from 'prop-types';

import { generateId, getClassNames, isEmpty, removeCamelCase } from '../../../tools/general/helpers.util';
import { hideColumnHeader } from './TableFunctions.util';

import './table.scss';

export const ReportsTable = ({
                               tableName,
                               activeTableData,
                               hiddenColumns,
                               handleDownloadReportClick
                             }) => {

  const [selectedRow, setSelectedRow] = useState(undefined);

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
            case 3:
              return <td key={ generateId() }
                         className="w-24">
                <div className="flex text-xs z-50 text-left underline font-bold text-blue-400 hover:text-blue-500"
                     onClick={ () => {
                       handleDownloadReportClick(objectValues[3]);
                     } }>
                  { value }
                </div>
              </td>;
            default:
              return <td key={ generateId() }
                         className="w-24">
                <div className="flex text-sm min-w-fit">
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
              onMouseOver={ () => setSelectedRow(object) }
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

ReportsTable.propTypes = {
  tableName: string,
  activeTableData: arrayOf(shape({})),
  hiddenColumns: arrayOf(string)
};
