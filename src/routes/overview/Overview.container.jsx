import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import FieldsOverviewContainer from '../../components/screens/overview/FieldsOverview.container';

const OverviewContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }` }
             component={ FieldsOverviewContainer } />
    </Switch>
  );
};

export default OverviewContainer;
