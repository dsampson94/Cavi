import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-assistant.scss';
import './../dashboard.scss';

const DashboardAssistant = ({
                              ownClientsList,
                              overviewOptionSelected,
                              setOverviewOptionSelected
                            }) => {

  const history = useHistory();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="dashboard-assistant">
        <div className="field-chart__top-bar--right-tool-container">

        </div>
        <div className="dashboard-header">Below Items Need Attention:</div>
        <p style={ { margin: '0 10px 10px 10px' } }>Pulse had some issues loading the assistant.</p>
      </div>

    </ContentContainer>
  );
};

DashboardAssistant.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardAssistant;
