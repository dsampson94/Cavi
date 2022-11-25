import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import DashboardOverviewContainer from '../../components/screens/dashboard/overview/DashboardOverview.container';
import DashboardAssistantContainer from '../../components/screens/dashboard/assistant/DashboardAssistant.container';
import DashboardMonitorContainer from '../../components/screens/dashboard/monitor-probes/DashboardMonitor.container';
import DashboardLastReadingsContainer from '../../components/screens/dashboard/last-readings/DashboardLastReadings.container';
import DashboardNeglectedFieldsContainer from '../../components/screens/dashboard/neglected-fields/DashboardNeglectedFields.container';
import DashboardEmailReadingsContainer from '../../components/screens/dashboard/email-readings/DashboardEmailReadings.container';
import DashboardCheckIrricomsContainer from '../../components/screens/dashboard/check-irricoms/DashboardCheckIrricoms.container';
import DashboardRawReadingsContainer from '../../components/screens/dashboard/raw-readings-chart/DashboardRawReadings.container';

const DashboardContainer = () => {

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={ `${ path }/assistant` } component={ DashboardAssistantContainer } />
      <Route exact path={ `${ path }/overview` } component={ DashboardOverviewContainer } />
      <Route exact path={ `${ path }/monitor-probes` } component={ DashboardMonitorContainer } />
      <Route exact path={ `${ path }/last-readings` } component={ DashboardLastReadingsContainer } />
      <Route exact path={ `${ path }/neglected-fields` } component={ DashboardNeglectedFieldsContainer } />
      <Route exact path={ `${ path }/email-readings` } component={ DashboardEmailReadingsContainer } />
      <Route exact path={ `${ path }/raw-readings` } component={ DashboardRawReadingsContainer } />
      <Route exact path={ `${ path }/irricoms` } component={ DashboardCheckIrricomsContainer } />
    </Switch>
  );
};

export default DashboardContainer;
