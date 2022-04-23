import React, { useEffect, useState } from 'react';

import { arrayOf, shape, string } from 'prop-types';

import { noOp, removeCamelCase } from '../../../tools/general/helpers.util';
import { handleColumnHeaderClick, hideColumnHeader } from './table-functions.util';

import SVGIcon from '../../../tools/icons/SVGIcon';

import './table.scss';

const Table = ({ tableName, tableData, hiddenColumns }) => {

  const [filteredTableData, setFilteredTableData] = useState([]);
  const [ascendingSort, setAscendingSort] = useState(true);

  useEffect(() => {
      const copyOfTableData = [...tableData];
      setFilteredTableData(copyOfTableData);
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
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <div className={ 'table__body__row__td-upper' }>{ value?.field }</div>
                  <div className={ 'table__body__row__td-lower' }>{ value?.type }</div>
                </div>
              </td>;
            }
            case 1: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <SVGIcon name={ 'warning' }
                           hoverEnabled />
                </div>
              </td>;
            }
            case 2: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <SVGIcon name={ 'dropdown' }
                           hoverEnabled />
                </div>
              </td>;
            }
            case 3: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <SVGIcon name={ 'camera' }
                           hoverEnabled />
                </div>
              </td>;
            }
            case 4: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { value }
                </div>
              </td>;
            }
            case 5: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <SVGIcon name={ 'pencil' }
                           hoverEnabled />
                </div>
              </td>;
            }
            case 6: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <SVGIcon name={ 'charts' }
                           hoverEnabled />
                </div>
              </td>;
            }
            case 7: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <div className={ 'table__body__row__td-upper--deficit' }
                       style={ {
                         backgroundColor: value?.colorTop
                       } }>
                    { value?.top }
                  </div>
                  <div className={ 'table__body__row__td-lower--deficit' }
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
                  { value }
                </div>
              </td>;
            }
            case [9, 10, 11, 12, 13, 14, 15]: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container--centered' }>
                  { (value === 0) ? '' : value }
                </div>
              </td>;
            }
            case [16, 17, 18, 19, 20, 21, 22]: {
              return <td onClick={ noOp() }
                         key={ index }>
                <div className={ 'table__body__row__td-container' }>
                  <div className={ 'table__body__row__td-upper--deficit' }
                       style={ {
                         backgroundColor: value?.colorTop
                       } }>
                    { value?.top }
                  </div>
                  <div className={ 'table__body__row__td-lower--deficit' }
                       style={ {
                         backgroundColor: value?.colorBot
                       } }>
                    { value?.bottom }
                  </div>
                </div>
              </td>;
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
        <tr className="table__body__row"
            key={ index }>
          { tableDataElements }
        </tr>
      );
    });

    return (
      <tbody className="table__body">
      { rows }
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
