import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useRouteMatch } from 'react-router';

import { mappedUserData } from '../../../common/side-bar/Sidebar.util';
import { retrieveUserLoginFromLocalStorage } from '../../../../tools/storage/localStorage';
import { requestClientOverviewList } from '../../../../redux/actions/client.action';

import RecommendationOverview from './RecommendationOverview';

const RecommendationOverviewContainer = () => {

  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const [filteredClientData, setFilteredClientData] = useState(undefined);
  const [overviewOptionSelected, setOverviewOptionSelected] = useState(1);

  const user = retrieveUserLoginFromLocalStorage();
  const userOverviewList = useSelector(createSelector([state => state.client], client => client?.overviewList));
  const mappedClientsList = mappedUserData(userOverviewList, true);

  useEffect(() => {
    dispatch(requestClientOverviewList(overviewRequestFields));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewOptionSelected]);

  const overviewRequestFields = {
    username: user?.username,
    password: user?.password,
    getwhat: overviewOptionSelected
  };

  return <RecommendationOverview ownClientsList={ mappedClientsList }
                                 filteredClientData={ filteredClientData }
                                 setFilteredClientData={ setFilteredClientData }
                                 overviewOptionSelected={ overviewOptionSelected }
                                 setOverviewOptionSelected={ setOverviewOptionSelected }
                                 activePath={ path } />;
};

export default RecommendationOverviewContainer;
