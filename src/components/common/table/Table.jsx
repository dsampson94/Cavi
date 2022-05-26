import React, { useEffect, useState } from 'react';

import { arrayOf, shape, string } from 'prop-types';

import { CAMERA, CHARTS, DROPDOWN, PENCIL, RAIN_CLOUDS, UNIT, WARNING, WATCH } from '../../../tools/general/system-variables.util';
import { getClassNames, isEmpty, noOp, removeCamelCase } from '../../../tools/general/helpers.util';

import { retrieveLastSelectedUserFromLocalStorage } from '../../../tools/storage/localStorage';

import { handleColumnHeaderClick, hideColumnHeader } from './table-functions.util';
import { DarkenedColumn, DropDown, LightenedColumn } from './table-components.util';

import SVGIcon from '../../../tools/icons/SVGIcon';
import ToolTip from '../tool-tip/ToolTip';

const Table = ({ tableName, tableData, hiddenColumns }) => {

  const activeUser = retrieveLastSelectedUserFromLocalStorage();

  const [activeTableData, setActiveTableData] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(undefined);

  useEffect(() => {
      setActiveTableData(tableData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData]);

  useEffect(() => {
      if (!selectedRowIndex) return;
      const copyOfActiveList = [...tableData];
      tableData.splice(selectedRowIndex, 1,
        { ...copyOfActiveList[selectedRowIndex], expanded: !tableData[selectedRowIndex].expanded });
      setActiveTableData([...tableData]);
      setSelectedRowIndex(undefined);
    }
  );

  const buildTableHeader = () => {
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key, index) => (
        <th key={ index }
            style={ { color: hideColumnHeader(tableName, key) } }
            onClick={ () => handleColumnHeaderClick(key, ascendingSort, setAscendingSort, activeTableData, setActiveTableData) }>
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
      let isDropdownRow = object?.b?.sublande;

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
                return <td onClick={ () => setSelectedRowIndex(rowIndex + 1) }
                           key={ dataIndex }>
                  { (value?.tooltip) &&
                    <div className={ 'table__body__row__td-container' }>
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
                return <DarkenedColumn dataIndex={ dataIndex }
                                       columnNumber={ 9 }
                                       value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 11: {
              if (!isHeaderRow)
                return <DarkenedColumn dataIndex={ dataIndex }
                                       columnNumber={ 11 }
                                       value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 13: {
              if (!isHeaderRow)
                return <DarkenedColumn dataIndex={ dataIndex }
                                       columnNumber={ 13 }
                                       value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 15: {
              if (!isHeaderRow)
                return <DarkenedColumn dataIndex={ dataIndex }
                                       columnNumber={ 15 }
                                       value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 10: {
              if (!isHeaderRow)
                return <LightenedColumn dataIndex={ dataIndex }
                                        columnNumber={ 10 }
                                        value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 12: {
              if (!isHeaderRow)
                return <LightenedColumn dataIndex={ dataIndex }
                                        columnNumber={ 12 }
                                        value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 14: {
              if (!isHeaderRow)
                return <LightenedColumn dataIndex={ dataIndex }
                                        columnNumber={ 14 }
                                        value={ value } />;
              else
                return <td key={ dataIndex } />;
            }
            case 16: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ dataIndex }
                           className={ 'table__body__row__td--fade' }>
                  { !value?.dropdown &&
                    <>
                      <ToolTip text={ UNIT } />
                      <SVGIcon name={ RAIN_CLOUDS }
                               fill={ '#043b6e' } />
                      <SVGIcon name={ WATCH }
                               fill={ '#043b6e' } />
                    </>
                  }
                </td>;
              else
                return <td key={ dataIndex } />;
            }
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ dataIndex }
                           className={ 'table__body__row__td--fade' }>
                  <div className={ 'table__body__row__td-container' }>
                    <p> { (value?.upper === 0) ? '' : value?.upper }</p>
                    <p> { (value?.lower === 0) ? '' : value?.lower }</p>
                  </div>
                </td>;
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
            <tr className={ getClassNames('table__body__row', { header: isHeaderRow }) }
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
          { `No active fields currently set up on ${ activeUser?.groupName?.toUpperCase() } - ${ activeUser?.clientName?.toUpperCase() }` }
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
  tableData: arrayOf(shape({})).isRequired,
  hiddenColumns: arrayOf(string).isRequired
};

export default Table;
