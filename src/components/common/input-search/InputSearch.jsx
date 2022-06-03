import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { arrayOf, bool, func, shape, string } from 'prop-types';

import {
  SEARCH,
  SNACK_CRITICAL,
  UNSUCCESSFUL_CLIENT_SEARCH,
  UNSUCCESSFUL_FIELD_SEARCH
} from '../../../tools/general/system-variables.util';
import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';
import { pushEmptyRow } from '../table/recommendations/TableFunctions.util';

import { addSystemNotice } from '../../../redux/actions/system.action';

import SVGIcon from '../../../tools/icons/SVGIcon';

import './input-search.scss';

const InputSearch = ({
                       name,
                       value,
                       type,
                       dataToFilter,
                       setFilteredData,
                       placeholder,
                       sidebar,
                       table
                     }) => {

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState('');

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  useEffect(() => {
    filter();
    if (searchString.length === 0) setFilteredData(undefined);
  }, [searchString]);

  const filter = () => {
    if (table) {
      filterTable();
    } else if (sidebar) {
      filterSideBar();
    }
  };

  const filterTable = () => {
    const filteredData = [];
    dataToFilter.forEach((object) => {
      if (object?.fieldName?.locationName?.toLowerCase()?.includes(searchString?.toLowerCase())) {
        filteredData.push(object);
      } else if (object?.fieldName?.type?.toLowerCase()?.includes(searchString?.toLowerCase())) {
        filteredData.push(object);
      }
    });

    if (isEmpty(filteredData)) {
      dispatch(addSystemNotice(UNSUCCESSFUL_FIELD_SEARCH, SNACK_CRITICAL));
      setFilteredData(dataToFilter);
    } else {
      const tableList = [];
      for (let field in fieldList) tableList?.push(fieldList[field]);
      for (let i = 0; i < 1; ++i) {
        const rainDataKeys = Object.keys(fieldRainData['days'] ?? []);
        const weatherDataKeys = Object.keys(tableList[i]?.weervoorspelling);
        pushEmptyRow(filteredData, weatherDataKeys, rainDataKeys, tableList, i);
        filteredData.reverse();
        pushEmptyRow(filteredData, weatherDataKeys, rainDataKeys, tableList, i);
        filteredData.reverse();
      }
      setFilteredData(filteredData);
    }
  };

  const filterSideBar = () => {
    let mappedClients = [];
    for (const [{}, listValues] of new Map(Object.entries(dataToFilter)).entries()) {
      for (const [objectKey, objectValue] of new Map(Object.entries(listValues)).entries()) {
        const innerObjectValueList = [];
        const filteredInnerObjectValueList = [];
        for (const [iok, iov] of new Map(Object.entries(objectValue)).entries()) {
          innerObjectValueList.push({ iok, iov });
          if (objectKey?.toLowerCase()?.includes(searchString?.toLowerCase())) {
            mappedClients.push({ objectKey, innerObjectValueList });
          } else if (iok?.toLowerCase()?.includes(searchString?.toLowerCase())) {
            filteredInnerObjectValueList.push({ iok, iov });
            mappedClients.push({ objectKey, filteredInnerObjectValueList });
          }
        }
      }
    }

    if (isEmpty(mappedClients)) {
      dispatch(addSystemNotice(UNSUCCESSFUL_CLIENT_SEARCH, SNACK_CRITICAL));
      setFilteredData(undefined);
    } else {
      setFilteredData(mappedClients.filter((v, i, a) =>
        a.findIndex(v2 => (JSON.stringify(v2) === JSON.stringify(v))) === i));
    }
  };

  return (
    <div className={ 'search' }>
      <div className={ 'search__icon' }>
        <SVGIcon name={ SEARCH } />
      </div>
      <input autoFocus
             name={ name }
             value={ value }
             type={ type }
             placeholder={ placeholder }
             className={ getClassNames('search__input', { sidebar, table }) }
             onChange={ ({ target }) => setSearchString(target.value) }
             onKeyPress={ event => {
               if (event.key === 'Enter') {
                 (searchString) ? filter() : setFilteredData(undefined);
               }
             } } />
    </div>
  );
};

InputSearch.defaultProps = {
  dataToFilter: undefined,
  sidebar: undefined,
  table: undefined,
  name: undefined,
  value: undefined,
  type: undefined,
  placeholder: undefined
};

InputSearch.propTypes = {
  dataToFilter: arrayOf(shape({})),
  name: string,
  value: shape({}),
  type: string,
  setFilteredData: func.isRequired,
  placeholder: string,
  sidebar: bool,
  table: bool
};

export default InputSearch;
