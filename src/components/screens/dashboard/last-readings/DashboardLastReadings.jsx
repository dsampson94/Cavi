import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-last-readings.scss';
import './../dashboard.scss';

const DashboardLastReadings = ({
                                 ownClientsList,
                                 overviewOptionSelected,
                                 setOverviewOptionSelected
                               }) => {

  const history = useHistory();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);

  return (
    <ContentContainer view={ DASHBOARD }
                      showClientsSideBar={ showClientsSideBar }
                      setShowClientsSideBar={ setShowClientsSideBar }>
      <div className="dashboard-last-readings">
        <div className="dashboard-header">Find most recent readings from any probe, Irricom, Aquawave, DFM, GPRS probe:
        </div>
      </div>
    </ContentContainer>
  );
};

DashboardLastReadings.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardLastReadings;
