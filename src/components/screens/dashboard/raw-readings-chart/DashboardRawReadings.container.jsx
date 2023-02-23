import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { requestClientRawReadings } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';
import DashboardRawReadings from './DashboardRawReadings';

const DashboardRawReadingsContainer = () => {

  const dispatch = useDispatch();

  const rawReadings = useSelector(createSelector([state => state.client], client => client?.rawReadings));

  const request = getRequestParams({});

  useEffect(() => {
    dispatch(requestClientRawReadings(request.rawReadingsParams));
  }, []);

  return <DashboardRawReadings rawReadings={ rawReadings } />;
};

export default DashboardRawReadingsContainer;
