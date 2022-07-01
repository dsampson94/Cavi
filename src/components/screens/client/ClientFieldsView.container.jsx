import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import {
  getRainDataList,
  getRainDataLowerList,
  getRainDataUpperList,
  pushDropdownRow,
  pushFieldRow,
  pushForecastRegionRow,
  pushLandGroupRow,
  setHasSubGroups
} from './ClientFieldsView.container.util.js';

import { retrieveUserLoginFromLocalStorage } from '../../../tools/storage/localStorage';
import { requestFullClientFieldList } from '../../../redux/actions/client.action';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const user = retrieveUserLoginFromLocalStorage();
  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  let hasSubGroups = false;

  useEffect(() => {
    dispatch(requestFullClientFieldList(clientRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName, clientName]);

  const clientRequestFields = {
    username: user?.username,
    password: user?.password,
    groupname: groupName,
    clientname: clientName
  };

  const mappedFieldList = () => {
    if (!fieldList) return;
    if (!fieldRainData) return;
    const tableList = [];
    const mappedList = [];
    const subGroupSplitList = [];

    const rainData = getRainDataList(fieldList, fieldRainData);
    let rainDataUpper = getRainDataUpperList(rainData);
    let rainDataLower = getRainDataLowerList(rainData);
    const rainDataKeys = Object.keys(fieldRainData['days'] ?? []);

    for (let field in fieldList) tableList?.push(fieldList[field]);

    tableList.forEach((listItem, index) => {
      const weatherDataKeys = Object.keys(listItem?.weervoorspelling);
      hasSubGroups = setHasSubGroups(listItem, subGroupSplitList);
      pushForecastRegionRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys);
      pushLandGroupRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys);
      pushFieldRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, rainDataUpper, rainDataLower);
      if (hasSubGroups) {
        pushDropdownRow(tableList, listItem, index, mappedList, weatherDataKeys, rainDataKeys, fieldRainData);
      }
    });
    return mappedList;
  };

  return <ClientFieldsView mappedFieldList={ mappedFieldList() }
                           clientRequestFields={ clientRequestFields }
                           hasSubGroups={ hasSubGroups } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
