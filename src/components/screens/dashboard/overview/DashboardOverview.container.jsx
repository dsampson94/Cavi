import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { mappedUserData } from '../../../common/side-bar/Sidebar.util';
import { chooseRandom } from '../../../../tools/general/helpers.util';

import { requestClientOverviewList, requestFullClientFieldList } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';

import DashboardOverview from './DashboardOverview';

const DashboardOverviewContainer = () => {

  const dispatch = useDispatch();

  const [overviewOptionSelected, setOverviewOptionSelected] = useState(chooseRandom([1,2,3]));

  const userOverviewList = useSelector(createSelector([state => state.client], client => client?.overviewList));
  const mappedClientsList = mappedUserData(userOverviewList, true);

  const request = getRequestParams({ overviewOptionSelected });

  useEffect(() => {
    dispatch(requestClientOverviewList(request.overviewParams));
  }, [overviewOptionSelected]);

  useEffect(() => {
    function updateData() {
      dispatch(requestClientOverviewList(request.overviewParams));
      setTimeout(updateData, 10 * 60 * 1000);
    }

    updateData();
    return () => {
      clearTimeout(updateData);
    };
  }, []);

  return <DashboardOverview ownClientsList={ mappedClientsList }
                            overviewOptionSelected={ overviewOptionSelected }
                            setOverviewOptionSelected={ setOverviewOptionSelected } />;
};

export default DashboardOverviewContainer;
