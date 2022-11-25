import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { mappedUserData } from '../../../common/side-bar/Sidebar.util';

import { requestClientOverviewList } from '../../../../redux/actions/client.action';
import { getRequestParams } from '../../../../redux/endpoints';
import DashboardNeglectedFields from './DashboardNeglectedFields';

const DashboardNeglectedFieldsContainer = () => {

  const dispatch = useDispatch();

  const [overviewOptionSelected, setOverviewOptionSelected] = useState(1);

  const userOverviewList = useSelector(createSelector([state => state.client], client => client?.overviewList));
  const mappedClientsList = mappedUserData(userOverviewList, true);

  const request = getRequestParams({ overviewOptionSelected });

  useEffect(() => {
    dispatch(requestClientOverviewList(request.overviewParams));
  }, [overviewOptionSelected]);

  return <DashboardNeglectedFields ownClientsList={ mappedClientsList }
                                   overviewOptionSelected={ overviewOptionSelected }
                                   setOverviewOptionSelected={ setOverviewOptionSelected } />;
};

export default DashboardNeglectedFieldsContainer;
