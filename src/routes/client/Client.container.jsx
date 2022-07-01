import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ClientFieldsViewContainer from '../../components/screens/client/ClientFieldsView.container';
import FieldChartViewContainer from '../../components/screens/field/FieldChartView.container';

const ClientContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/:groupName/:clientName` }
             component={ ClientFieldsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field/:fieldName/:probeNumber` }
             component={ FieldChartViewContainer } />
    </Switch>
  );
};

export default ClientContainer;
