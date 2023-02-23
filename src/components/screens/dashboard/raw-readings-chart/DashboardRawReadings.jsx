import React, { useState } from 'react';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-raw-readings.scss';

const DashboardRawReadings = ({ rawReadings }) => {

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);

  const chartString = rawReadings ? rawReadings?.slice(0, rawReadings?.indexOf('?')) +
    'https://www.irricheck.co.za/actcode/web/getstatus.php' + rawReadings?.slice(rawReadings?.indexOf('?')) : null;

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="mt-10"
           dangerouslySetInnerHTML={ { __html: chartString } } />
    </ContentContainer>
  );
};

DashboardRawReadings.propTypes = {
  rawReadings: String
};

export default DashboardRawReadings;
