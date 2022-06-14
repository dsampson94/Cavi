import React from 'react';
import { useRouteMatch } from 'react-router';

import { retrieveUserFromLocalStorage } from '../../../../tools/storage/localStorage';

import RecommendationOverview from './RecommendationOverview';

const RecommendationOverviewContainer = () => {

  const { path } = useRouteMatch();

  const userAccount = retrieveUserFromLocalStorage();

  const ownClientsList = () => {
    let mappedClients = [];
    delete userAccount.access;
    delete userAccount.clientsOther;
    for (const [{}, listValues] of new Map(Object.entries(userAccount)).entries()) {
      for (const [objectKey, objectValue] of new Map(Object.entries(listValues)).entries()) {
        const innerObjectValueList = [];
        for (const [iok, iov] of new Map(Object.entries(objectValue)).entries()) {
          innerObjectValueList.push({ iok, iov });
        }
        mappedClients.push({ objectKey, innerObjectValueList });
      }
    }
    return mappedClients;
  };

  return <RecommendationOverview userAccount={ userAccount }
                                 ownClientsList={ ownClientsList() }
                                 activePath={ path } />;
};

export default RecommendationOverviewContainer;
