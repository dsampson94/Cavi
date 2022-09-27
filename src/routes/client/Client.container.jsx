import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ClientFieldsViewContainer from '../../components/screens/client/ClientFieldsView.container';
import FieldChartViewContainer from '../../components/screens/field/FieldChartView.container';
import FieldTemperaturesChartViewContainer from '../../components/screens/field-temperatures/FieldTemperaturesChartView.container';

const ClientContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/:groupName/:clientName` }
             component={ ClientFieldsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field/:fieldName/:probeNumber` }
             component={ FieldChartViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field/:fieldName/:probeNumber/temperatures` }
             component={ FieldTemperaturesChartViewContainer } />
    </Switch>
  );
};

export default ClientContainer;
