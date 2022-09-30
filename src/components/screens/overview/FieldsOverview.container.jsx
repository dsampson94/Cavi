import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useRouteMatch } from 'react-router';

import { mappedUserData } from '../../common/side-bar/Sidebar.util';

import { requestClientOverviewList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldsOverview from './FieldsOverview';

const OverviewContainer = () => {

  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const [overviewOptionSelected, setOverviewOptionSelected] = useState(1);

  const userOverviewList = useSelector(createSelector([state => state.client], client => client?.overviewList));
  const mappedClientsList = mappedUserData(userOverviewList, true);

  const request = getRequestParams({ overviewOptionSelected });

  useEffect(() => {
    dispatch(requestClientOverviewList(request.overviewParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewOptionSelected]);

  return <FieldsOverview ownClientsList={ mappedClientsList }
                         overviewOptionSelected={ overviewOptionSelected }
                         setOverviewOptionSelected={ setOverviewOptionSelected }
                         activePath={ path } />;
};

export default OverviewContainer;
