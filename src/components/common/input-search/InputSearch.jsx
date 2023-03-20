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
import { pushEmptyRow } from '../table/TableFunctions.util';

import { addSystemNotice } from '../../../redux/actions/system.action';

import SVGIcon from '../SVGIcon/SVGIcon';
import ToolTipRelative from '../tool-tip/ToolTipRelative';

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
  const [searchTypeIsClient, setSearchTypeIsClient] = useState(false);

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  useEffect(() => {
    filter();
    if (searchString.length === 0) setFilteredData(undefined);
  }, [searchString, searchTypeIsClient]);

  const filter = () => {
    if (table)
      filterTable();
    else if (overview)
      searchTypeIsClient ? filterClientSidebarList() : filterClientOverviewList();
    else if (sidebar) {
      searchTypeIsClient ? filterClientSidebarList() : filterClientOverviewList();
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

  const filterClientSidebarList = () => {
    if (searchString.length < 2) return;

    const filteredList = filterList(dataToFilter, searchString);

    if (isEmpty(filteredList)) {
      dispatch(addSystemNotice(UNSUCCESSFUL_CLIENT_SEARCH, SNACK_CRITICAL));
      setFilteredData(undefined);
    } else {
      setFilteredData(filteredList);
    }
  };

  const filterClientOverviewList = () => {
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

  const filterList = (list, searchString) => {
    return list.filter(item => {
      return (
        item.objectKey.toLowerCase().includes(searchString.toLowerCase()) ||
        item.innerObjectValueList.some(innerItem => innerItem.iok.toLowerCase().includes(searchString.toLowerCase()))
      );
    });
  };

  return (
    <div className={ getClassNames('search', { overview }) }>
      <div className={ 'search__icon' } onClick={ () => setSearchTypeIsClient(!searchTypeIsClient) }>
        <ToolTipRelative text={ !searchTypeIsClient ? 'Search by Client' : 'Search by Field' } />
        <SVGIcon name={ SEARCH } fill={ !searchTypeIsClient ? '#0000FF' : '#607CB1' } />
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
