import React, { useEffect, useState } from 'react';

import { array } from 'prop-types';
import { isEmpty } from '../../../tools/general/helpers.util';

import TextInput from '../input/text/TextInput';

const TableSearch = ({ dataToFilter, setFilteredData }) => {

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
    <TextInput onChange={ handleChange }
               table />
  );
};

TableSearch.defaultProps = {};

TableSearch.propTypes = {
  dataToFilter: array.isRequired
};

export default TableSearch;
