import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { requestAdminUserList, requestClientMonitorProbesList } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';
import { mappedAdminUserList, mappedMonitorProbesList } from './DashboardMonitor.util';

import DashboardMonitor from './DashboardMonitor';
import {
  retrieveMonitorProbeFilterSettingsFromLocalStorage,
  retrieveUserLoginFromLocalStorage,
  saveMonitorProbeFilterSettingsToLocalStorage
} from '../../../../tools/storage/localStorage';

const DashboardMonitorContainer = () => {

  const dispatch = useDispatch();

  const [adminUserFilter, setAdminUserFilter] = useState({ id: 0, name: 'admin' });
  const [sortType, setSortType] = useState({ id: 0, name: 'Normal' });
  const [onlyBehind, setOnlyBehind] = useState({ id: 0, name: 'Hide DFM Handlogger Probes' });
  const [dfm, setDfm] = useState({ id: 1, name: 'Show all probes' });

  const loggedInUserData = retrieveUserLoginFromLocalStorage();

  const adminUserList = useSelector(createSelector([state => state.client], client => client?.adminUserList));
  const monitorProbesList = useSelector(createSelector([state => state.client], client => client?.monitorProbesList));

  const request = getRequestParams({ adminUserFilter, sortType, onlyBehind, dfm });

  useEffect(() => {
    const stateObject = retrieveMonitorProbeFilterSettingsFromLocalStorage();
    if (stateObject) {
      setAdminUserFilter(stateObject.adminUserFilter);
      setSortType(stateObject.sortType);
      setOnlyBehind(stateObject.onlyBehind);
      setDfm(stateObject.dfm);
    }
  }, []);

  useEffect(() => {
    const stateObject = { adminUserFilter, sortType, onlyBehind, dfm };
    saveMonitorProbeFilterSettingsToLocalStorage(stateObject);
  }, [adminUserFilter, sortType, onlyBehind, dfm]);

  useEffect(() => {
    dispatch(requestAdminUserList(request.adminUserParams));
    dispatch(requestClientMonitorProbesList(request.monitorProbesParams));
  }, []);

  useEffect(() => {
    dispatch(requestClientMonitorProbesList(request.monitorProbesParams));
  }, [adminUserFilter, sortType, onlyBehind, dfm]);

  return <DashboardMonitor monitorProbesList={ mappedMonitorProbesList(monitorProbesList) ?? [] }
                           adminUserList={ mappedAdminUserList(adminUserList?.data) }
                           loggedInUserData={ loggedInUserData }
                           adminUserFilter={ adminUserFilter }
                           setAdminUserFilter={ setAdminUserFilter }
                           sortType={ sortType }
                           setSortType={ setSortType }
                           onlyBehind={ onlyBehind }
                           setOnlyBehind={ setOnlyBehind }
                           dfm={ dfm }
                           setDfm={ setDfm } />;
};

export default DashboardMonitorContainer;
