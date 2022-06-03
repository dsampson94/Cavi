import React from 'react';
import { useParams } from 'react-router';

import { arrayOf, shape, string } from 'prop-types';

import { CAMERA, CHARTS, DROPDOWN, PENCIL, WARNING } from '../../../../tools/general/system-variables.util';
import { getClassNames, isEmpty, noOp, removeCamelCase } from '../../../../tools/general/helpers.util';

import { hideColumnHeader } from './TableFunctions.util';
import {
  DeficitColumn,
  DropDown,
  FieldNameColumn,
  ForecastTimeIconsColumn,
  PrimaryForecastColumn,
  RainDataColumn,
  SecondaryForecastColumn
} from './TableComponents.util';

import SVGIcon from '../../../../tools/icons/SVGIcon';
import ToolTip from '../../tool-tip/ToolTip';

const Table = ({ tableName, activeTableData, hiddenColumns, setSelectedIndex, setSelectedDropdownObject, setActiveTableData }) => {

  const { groupName, clientName } = useParams();

  const buildTableHeader = () => {
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key, index) => (
        <th key={ index }
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
            case 0: {
              return <FieldNameColumn dataIndex={ dataIndex }
                                      value={ value } />;
            }
            case 1: {
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
            }
            case 2: {
              if (value)
                return <td key={ dataIndex }>
                  { (value?.tooltip) &&
                    <div className={ 'table__body__row__td-container' }
                         onClick={ () => {
                           setSelectedIndex(rowIndex);
                           setSelectedDropdownObject(object);
                         } }>
                      <ToolTip text={ value?.tooltip } />
                      <SVGIcon name={ DROPDOWN } />
                    </div> }
                  <DropDown value={ value }
                            columnNumber={ 2 } />
                </td>;
              else
                return <td key={ dataIndex } />;
            }
            case 3: {
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
            }
            case 4: {
              if (value)
                return <td onClick={ noOp() }
                           key={ dataIndex }>
                  <div className={ 'table__body__row__td-container--centered-last' }>
                    <ToolTip text={ value?.tooltip } />
                    { (value?.lastReading.includes('1970/')) ? '---' : value?.lastReading }
                  </div>
                </td>;
              else
                return <td key={ dataIndex } />;
            }
            case 5: {
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
            }
            case 6: {
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
            }
            case 7: {
              return <DeficitColumn dataIndex={ dataIndex }
                                    value={ value }
                                    isDropdownRow={ isDropdownRow }
                                    isHeaderRow={ isHeaderRow } />;
            }
            case 8: {
              return <td onClick={ noOp() }
                         key={ dataIndex }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { value?.slice(0, 2) }
                </div>
              </td>;
            }
            case 9: {
              if (!isHeaderRow)
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 9 }
                                              value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 10: {
              if (!isHeaderRow)
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 10 }
                                                value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 11: {
              if (!isHeaderRow)
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 11 }
                                              value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 12: {
              if (!isHeaderRow)
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 12 }
                                                value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 13: {
              if (!isHeaderRow)
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 13 }
                                              value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 14: {
              if (!isHeaderRow)
                return <SecondaryForecastColumn dataIndex={ dataIndex }
                                                columnNumber={ 14 }
                                                value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 15: {
              if (!isHeaderRow)
                return <PrimaryForecastColumn dataIndex={ dataIndex }
                                              columnNumber={ 15 }
                                              value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 16: {
              if (!isHeaderRow)
                return <ForecastTimeIconsColumn dataIndex={ dataIndex }
                                                value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 17:
            case 18:
            case 19:
            case 20:
            case 21: {
              if (!isHeaderRow)
                return <RainDataColumn dataIndex={ dataIndex }
                                       value={ value }
                                       columnNumber={ 21 } />;
              else
                return <td key={ dataIndex } />;
            }
            case 22: {
              if (!isHeaderRow)
                return <RainDataColumn dataIndex={ dataIndex }
                                       value={ value }
                                       columnNumber={ 22 } />;
              else
                return <td key={ dataIndex } />;
            }
            case 23:
            case 24:
            case 25: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ dataIndex }>
                  <div className={ 'table__body__row__td-container--centered' }>
                    { value }
                  </div>
                </td>;
              else
                return <td key={ dataIndex } />;
            }
            default: {
              return <td onClick={ noOp() }
                         key={ dataIndex }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { (value === 0) ? '' : value }
                </div>
              </td>;
            }
          }
        });
      }

      return (
        <>
          { !isDropdownRow &&
            <tr className={ getClassNames('table__body__row',
              { header: isHeaderRow, hidden: !(object?.fieldName?.locationName) }) }
                key={ rowIndex }>
              { tableDataElements }
            </tr> }

          { object.expanded && isDropdownRow &&
            <tr className={ 'table__body__row' }
                key={ rowIndex }>
              { tableDataElements }
            </tr> }
        </>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr>
          { `No active fields currently set up on ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }
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

Table.defaultProps = {};

Table.propTypes = {
  tableName: string.isRequired,
  activeTableData: arrayOf(shape({})).isRequired,
  hiddenColumns: arrayOf(string).isRequired
};

export default Table;
