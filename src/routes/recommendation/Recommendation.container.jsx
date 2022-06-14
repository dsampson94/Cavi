import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import RecommendationOverviewContainer from '../../components/screens/recommendation/overview/RecommendationOverview.container';
import RecommendationClientViewContainer from '../../components/screens/recommendation/view/client/RecommendationClientView.container';

const RecommendationContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/overview` } component={ RecommendationOverviewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName` } component={ RecommendationClientViewContainer } />
    </Switch>
  );
};

export default RecommendationContainer;
