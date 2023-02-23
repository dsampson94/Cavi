import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { requestClientLastReadingsList } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';
import DashboardLastReadings from './DashboardLastReadings';
import { mappedLastReadingsIrricomList, mappedLastReadingsReadingsList } from './DashboardLastReadings.util';

const DashboardLastReadingsContainer = () => {

  const dispatch = useDispatch();

  const lastReadingsList = useSelector(createSelector([state => state.client], client => client?.lastReadingsList));

  const [probeNumber, setProbeNumber] = useState('');
  const [filterNumber, setFilterNumber] = useState({ id: 2, name: '100' });

  const request = getRequestParams({ probeNumber, filterNumber });

  const handleSubmit = () => {
    dispatch(requestClientLastReadingsList(request.lastReadingsParams));
  };

  useEffect(() => {
    if (probeNumber) {
      dispatch(requestClientLastReadingsList(request.lastReadingsParams));
    }
  }, [filterNumber]);

  return <DashboardLastReadings lastReadingsIrricomList={ mappedLastReadingsIrricomList(lastReadingsList?.data?.irricom) ?? [] }
                                lastReadingsReadingsList={ mappedLastReadingsReadingsList(lastReadingsList?.data?.readings) ?? [] }
                                probeNumber={ probeNumber }
                                setProbeNumber={ setProbeNumber }
                                filterNumber={ filterNumber }
                                setFilterNumber={ setFilterNumber }
                                handleSubmit={ handleSubmit } />;
};

export default DashboardLastReadingsContainer;
