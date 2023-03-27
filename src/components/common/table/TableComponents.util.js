import React from 'react';

import { arrayOf, func, shape } from 'prop-types';

import { TABLE_SEARCH_PLACEHOLDER } from '../../../tools/general/system-variables.util';
import InputSearch from '../input-search/InputSearch';

import './table.scss';

export const TableSearchBar = ({ mappedFieldList, setFilteredTableData }) => {
  return <div className="client-fields__search">
    { (mappedFieldList?.length > 10) &&
    <InputSearch placeholder={ TABLE_SEARCH_PLACEHOLDER }
                 dataToFilter={ mappedFieldList }
                 setFilteredData={ setFilteredTableData }
                 table /> }
  </div>;
};

TableSearchBar.propTypes = {
  mappedFieldList: arrayOf(shape({})) || shape({}),
  setFilteredTableData: func.isRequired
};
