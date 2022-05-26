import React, { useState } from 'react';

import { array } from 'prop-types';
import { SEARCH } from '../../../tools/general/system-variables.util';
import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';

import SVGIcon from '../../../tools/icons/SVGIcon';

import './table-search.scss';

const TableSearch = ({
                       name,
                       value,
                       type,
                       dataToFilter,
                       setFilteredData,
                       placeholder,
                       disabled,
                       sidebar,
                       table
                     }) => {

  const [searchString, setSearchString] = useState('');

  const filter = () => {
    const filteredData = [];
    if (table) {
      dataToFilter.forEach((object) => {
        if (object?.fieldName?.locationName?.toLowerCase()?.includes(searchString?.toLowerCase())) {
          filteredData.push(object);
        } else if (object?.fieldName?.type?.toLowerCase()?.includes(searchString?.toLowerCase())) {
          filteredData.push(object);
        }
      });
    }

    if (isEmpty(filteredData)) {
      setFilteredData(dataToFilter);
    } else {
      setFilteredData(filteredData);
    }
  };

  return (
    <div className={ 'search' }>
      <div className={ 'search__icon' }>
        <SVGIcon name={ SEARCH } />
      </div>
      <input name={ name }
             value={ value }
             type={ type }
             placeholder={ placeholder }
             onChange={ ({ target }) => setSearchString(target.value) }
             onKeyPress={ event => {
               if (event.key === 'Enter') {
                 filter();
               }
             } }
             autoFocus
             disabled={ disabled }
             className={ getClassNames('search__input', { sidebar, table }) } />
    </div>
  );
};

TableSearch.defaultProps = {};

TableSearch.propTypes = {
  dataToFilter: array.isRequired
};

export default TableSearch;
