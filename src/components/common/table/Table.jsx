import React, { useEffect, useState } from 'react';

import { arrayOf, shape, string } from 'prop-types';

import {
  CAMERA,
  CHARTS,
  DROPDOWN,
  HARVEST,
  HARVEST_ICON,
  PENCIL,
  RAIN_CLOUDS,
  UNIT,
  WARNING,
  WATCH
} from '../../../tools/general/system-variables.util';
import { getClassNames, isEmpty, noOp, removeCamelCase } from '../../../tools/general/helpers.util';
import { handleColumnHeaderClick, hideColumnHeader } from './table-functions.util';

import { retrieveLastSelectedUserFromLocalStorage } from '../../../tools/storage/localStorage';

import SVGIcon from '../../../tools/icons/SVGIcon';
import ToolTip from '../tool-tip/ToolTip';

import './table.scss';

const Table = ({ tableName, tableData, hiddenColumns }) => {

  const activeUser = retrieveLastSelectedUserFromLocalStorage();

  const [filteredTableData, setFilteredTableData] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
      setFilteredTableData([...tableData]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData]);

  const buildTableHeader = () => {
    let headers;
    if (filteredTableData?.length !== 0) {
      const objectKeys = Object.keys(filteredTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key, index) => (
        <th style={ {
          color: hideColumnHeader(tableName, key)
        } }
            key={ index }
            onClick={ () => {
              handleColumnHeaderClick(key, ascendingSort, setAscendingSort, filteredTableData, setFilteredTableData);
            } }>
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
    const rows = filteredTableData?.map((object, index) => {
      let objectLocationName = object?.fieldName?.locationName;
      let isHeaderRow = (objectLocationName?.includes('-forecast') || objectLocationName?.includes('-landGroup'));

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (filteredTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, index) => {
          switch (index) {
            case 0: {
              if (value?.locationName?.includes('-forecast')) {
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container-forecast' }>
                    <div className={ 'table__body__row__td-container-forecast-upper' }>{ value?.locationName?.slice(0, -9) }</div>
                    <div className={ 'table__body__row__td-container-forecast-lower' }>{ 'mock climate text' }</div>
                  </div>
                </td>;
              } else if (value?.locationName?.includes('-landGroup')) {
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container-landgroup' }>
                    { value?.locationName?.slice(0, -10) }
                  </div>
                </td>;
              } else {
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }>
                    <div className={ 'table__body__row__td-upper' }>{ value?.locationName }</div>
                    <div className={ 'table__body__row__td-lower' }>{ value?.type }</div>
                  </div>
                </td>;
              }
            }
            case 1: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }>
                    <ToolTip text={ value } />
                    <SVGIcon name={ WARNING }
                             fill={ '#EE9A94' } />
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 2: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }
                       onClick={ () => setShowDropdown(!showDropdown) }>
                    <ToolTip text={ value } />
                    <SVGIcon name={ DROPDOWN } />
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 3: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }>
                    <ToolTip text={ value } />
                    <SVGIcon name={ CAMERA }
                             fill={ '#043b6e' } />
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 4: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container--centered-last' }>
                    <ToolTip text={ value?.tooltip } />
                    { (value?.lastReading.includes('1970/')) ? '---' : value?.lastReading }
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 5: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }>
                    <ToolTip text={ value } />
                    <SVGIcon name={ PENCIL } />
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 6: {
              if (value)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container' }>
                    <ToolTip text={ value } />
                    <SVGIcon name={ CHARTS } />
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 7: {
              return <td onClick={ noOp() }
                         key={ index }>
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
                </div>
              </td>;
            }
            case 8: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { value?.slice(0, 2) }
                </div>
              </td>;
            }
            case 9:
            case 11:
            case 13:
            case 15: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ index }
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
                </td>;
              else
                return <td key={ index } />;
            }
            case 10:
            case 12:
            case 14: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ index }
                           className={ 'table__body__row__td--light' }>
                  <div className={ 'table__body__row__td-container' }>
                    <p> { (value?.data === 0) ? '' : value?.data }</p>
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 16: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ index }
                           className={ 'table__body__row__td--fade' }>
                  <ToolTip text={ UNIT } />
                  <SVGIcon name={ RAIN_CLOUDS }
                           fill={ '#043b6e' } />
                  <SVGIcon name={ WATCH }
                           fill={ '#043b6e' } />
                </td>;
              else
                return <td key={ index } />;
            }
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ index }
                           className={ 'table__body__row__td--fade' }>
                  <div className={ 'table__body__row__td-container' }>
                    <p> { (value === 0) ? '' : value }</p>
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            case 23:
            case 24:
            case 25: {
              if (!isHeaderRow)
                return <td onClick={ noOp() }
                           key={ index }>
                  <div className={ 'table__body__row__td-container--centered' }>
                    { (value === 0) ? '' : value }
                  </div>
                </td>;
              else
                return <td key={ index } />;
            }
            default: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { (value === 0) ? '' : value }
                </div>
              </td>;
            }
          }
        });
      }

      return (
        <tr className={ getClassNames('table__body__row', { header: isHeaderRow }) }
            key={ index }>
          { tableDataElements }
        </tr>
      );
    });

    return (
      <tbody className="table__body">
      { (!isEmpty(rows)) ? rows :
        <tr>{ `No active fields currently set up on ${ activeUser?.groupName?.toUpperCase() } -
            ${ activeUser?.clientName?.toUpperCase() }` }</tr> }
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
