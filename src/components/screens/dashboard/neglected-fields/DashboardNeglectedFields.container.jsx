import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { requestAdminUserList, requestClientMonitorProbesList } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';
import DashboardNeglectedFields from './DashboardNeglectedFields';
import {
  retrieveNeglectedFieldsFilterSettingsFromLocalStorage,
  retrieveUserLoginFromLocalStorage,
  saveNeglectedFieldsFilterSettingsToLocalStorage
} from '../../../../tools/storage/localStorage';
import { mappedAdminUserList } from '../monitor-probes/DashboardMonitor.util';
import { mappedNeglectedFieldsList } from './DashboardNeglectedfields.util';

const DashboardNeglectedFieldsContainer = () => {

  const dispatch = useDispatch();

  const [adminUserFilter, setAdminUserFilter] = useState({ id: 0, name: 'admin' });
  const [lastViewed, setLastViewed] = useState('');

  const loggedInUserData = retrieveUserLoginFromLocalStorage();

  const adminUserList = useSelector(createSelector([state => state.client], client => client?.adminUserList));
  const neglectedFieldsList = useSelector(createSelector([state => state.client], client => client?.monitorProbesList?.data?.data));

  const request = getRequestParams({ adminUserFilter, lastViewed });

  useEffect(() => {
    const stateObject = retrieveNeglectedFieldsFilterSettingsFromLocalStorage();
    if (stateObject) {
      setAdminUserFilter(stateObject.adminUserFilter);
      setLastViewed(stateObject.lastViewed);
    }
  }, []);

  useEffect(() => {
    const stateObject = { adminUserFilter, lastViewed };
    saveNeglectedFieldsFilterSettingsToLocalStorage(stateObject);
  }, [adminUserFilter, lastViewed]);

  useEffect(() => {
    dispatch(requestAdminUserList(request.adminUserParams));
    dispatch(requestClientMonitorProbesList(request.neglectedFieldsParams));
  }, []);

  useEffect(() => {
    dispatch(requestClientMonitorProbesList(request.neglectedFieldsParams));
  }, [adminUserFilter, lastViewed]);

  return <DashboardNeglectedFields neglectedFieldsList={ mappedNeglectedFieldsList(neglectedFieldsList) ?? [] }
                                   adminUserList={ mappedAdminUserList(adminUserList?.data) }
                                   loggedInUserData={ loggedInUserData }
                                   adminUserFilter={ adminUserFilter }
                                   setAdminUserFilter={ setAdminUserFilter } />;
};

export default DashboardNeglectedFieldsContainer;
