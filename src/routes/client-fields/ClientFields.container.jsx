import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ClientFieldsViewContainer from '../../components/screens/client/ClientFieldsView.container';
import FieldChartViewContainer from '../../components/screens/field/FieldChartView.container';
import FieldTemperaturesChartViewContainer from '../../components/screens/field-temperatures/FieldTemperaturesChartView.container';
import FieldSetupViewContainer from '../../components/screens/field-setup/FieldSetupView.container';

const ClientFieldsContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/:groupName/:clientName` }
             component={ ClientFieldsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field/:probeNumber/:fieldName+` }
             component={ FieldChartViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-temperatures/:probeNumber/:fieldName+` }
             component={ FieldTemperaturesChartViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-setup/` }
             component={ FieldSetupViewContainer } />
    </Switch>
  );
};

export default ClientFieldsContainer;
