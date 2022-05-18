import React, { useEffect, useState } from 'react';

import { array } from 'prop-types';
import { SEARCH } from '../../../tools/general/system-variables.util';
import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';

import SVGIcon from '../../../tools/icons/SVGIcon';

import './table-search.scss';

const TableSearch = ({
                       name,
                       value,
                       type,
                       label,
                       dataToFilter,
                       setFilteredData,
                       onChange,
                       placeholder,
                       disabled,
                       sidebar,
                       table
                     }) => {

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (!isEmpty(dataToFilter)) {
      if (searchString.length > 2) {
        filter();
      } else {
        setFilteredData(dataToFilter);
      }
    }
  });

  const filter = () => {
    const filteredData = [];
    dataToFilter.forEach((object) => {
      let string = '';
      for (const property in object) {
        string = string + object[property];
      }
      if (string.toLowerCase().includes(searchString.toLowerCase())) {
        filteredData.push(object);
      }
    });

    if (isEmpty(filteredData)) {
      setFilteredData(dataToFilter);
    } else {
      setFilteredData(filteredData);
    }
  };

  const handleChange = ({ target }) => setSearchString(target.value);

  return (
    <div className={ 'search' }>
      <div className={ 'search__icon' }>
        <SVGIcon name={ SEARCH } />
      </div>
      <input name={ name }
             value={ value }
             type={ type }
             placeholder={ placeholder }
             onChange={ onChange }
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
