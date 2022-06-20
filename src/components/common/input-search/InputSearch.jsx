import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { bool, func, shape, string } from 'prop-types';

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
                       type,
                       dataToFilter,
                       setFilteredData,
                       persistSearchString,
                       setPersistSearchString,
                       placeholder,
                       sidebar,
                       table,
                       overview
                     }) => {

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState(persistSearchString ? persistSearchString : '');

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  useEffect(() => {
    filter();
    if (searchString.length === 0) setFilteredData(undefined);
  }, [searchString]);

  const filter = () => {
    if (table)
      filterTable();
    else if (overview)
      filterClientList();
    else if (sidebar) {
      filterClientList();
      setPersistSearchString(searchString);
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

  const filterClientList = () => {
    if (searchString.length < 2) return;

    let mappedClientsInner = [];
    let filteredClientsInner = [];
    let mappedFilteredClientsInner = [];

    dataToFilter.forEach((item) => {
      item.innerObjectValueList.forEach((innerItem) => {
        mappedClientsInner.push({ key: item.objectKey, iok: innerItem.iok, iov: { color: innerItem.iov.color } });
      });
    });

    filteredClientsInner = mappedClientsInner.filter((item) => {
      if (item.iok.toLowerCase()?.includes(searchString?.toLowerCase())) {
        return item !== -1;
      }
    });

    dataToFilter.forEach((outerItem) => {
      outerItem.innerObjectValueList.forEach((innerItem) => {
        for (const item of filteredClientsInner) {
          if (innerItem.iok.toLowerCase().includes(item.iok.toLowerCase())) {
            mappedFilteredClientsInner.push({ objectKey: outerItem?.objectKey, innerObjectValueList: [innerItem] });
          }
        }
      });
    });

    if (isEmpty(mappedFilteredClientsInner)) {
      dispatch(addSystemNotice(UNSUCCESSFUL_CLIENT_SEARCH, SNACK_CRITICAL));
      setFilteredData(undefined);
    } else {
      setFilteredData(mappedFilteredClientsInner.filter((v, i, a) =>
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
             value={ persistSearchString }
             type={ type }
             placeholder={ placeholder }
             className={ getClassNames('search__input', { sidebar, table }) }
             onChange={ ({ target }) => setSearchString(target.value) }
             onKeyDown={ event => {
               if (event.key === 'Enter') searchString ? filter() : setFilteredData(undefined);
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
  dataToFilter: shape({}),
  name: string,
  value: shape({}),
  type: string,
  setFilteredData: func.isRequired,
  placeholder: string,
  sidebar: bool,
  table: bool
};

export default InputSearch;
