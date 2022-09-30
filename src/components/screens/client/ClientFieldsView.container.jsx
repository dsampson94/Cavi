import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import { mapFieldTableList } from './ClientFieldsView.container.util.js';
import { requestFullClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import ClientFieldsView from './ClientFieldsView';

const ClientFieldsViewContainer = () => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));
  const fieldRainData = useSelector(createSelector([state => state.client], client => client?.fieldRainData));

  const [reloadToggleActive, setReloadToggleActive] = useState(false);

  const request = getRequestParams({ groupName, clientName });

  let hasSubGroups = false;

  useEffect(() => {
    dispatch(requestFullClientFieldList(request.clientParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName, clientName, reloadToggleActive]);

  const mappedFieldTableList = () => {
    return mapFieldTableList(fieldList, fieldRainData, hasSubGroups);
  };

  return <ClientFieldsView mappedFieldList={ mappedFieldTableList() }
                           clientRequestParams={ request.clientParams }
                           reloadToggleActive={ reloadToggleActive }
                           setReloadToggleActive={ setReloadToggleActive }
                           hasSubGroups={ hasSubGroups } />;
};

ClientFieldsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default ClientFieldsViewContainer;
