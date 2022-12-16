import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ClientFieldsViewContainer from '../../components/screens/client-fields/ClientFieldsView.container';
import FieldChartsViewContainer from '../../components/screens/field-charts/FieldChartsView.container';
import FieldTemperaturesChartViewContainer from '../../components/screens/field-temperatures/FieldTemperaturesChartView.container';
import FieldReportsViewContainer from '../../components/screens/field-reports/FieldReportsView.container';
import FieldSetupViewContainer from '../../components/screens/field-setup/FieldSetupView.container';

const ClientFieldsContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/:groupName/:clientName` }
             component={ ClientFieldsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-charts/:probeNumber/:fieldName+` }
             component={ FieldChartsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-temperatures/:probeNumber/:fieldName+` }
             component={ FieldTemperaturesChartViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-reports` }
             component={ FieldReportsViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-setup` }
             component={ FieldSetupViewContainer } />
      <Route exact path={ `${ path }/:groupName/:clientName/field-setup/:activeScreen` }
             component={ FieldSetupViewContainer } />
    </Switch>
  );
};

export default ClientFieldsContainer;
