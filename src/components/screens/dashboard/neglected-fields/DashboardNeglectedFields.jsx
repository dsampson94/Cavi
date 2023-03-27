import React, { useState } from 'react';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD, MONITOR_PROBES_VIEW } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import Select from '../../../common/select/Select';

import './dashboard-neglected-fields.scss';
import { MonitorProbesTable } from '../../../common/table/MonitorProbesTable';

const DashboardNeglectedFields = ({
                                    neglectedFieldsList,
                                    adminUserList,
                                    adminUserFilter,
                                    setAdminUserFilter
                                  }) => {

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="dashboard-neglected-fields">

        <div className="dashboard-neglected-fields__container">

          <Select activeItem={ adminUserFilter }
                  setActiveItem={ setAdminUserFilter }
                  list={ adminUserList ?? [] } />

        </div>

        <MonitorProbesTable tableName={ MONITOR_PROBES_VIEW }
                            activeTableData={ neglectedFieldsList }
                            hiddenColumns={ [] }
                            selectedIndex={ selectedIndex }
                            setSelectedIndex={ setSelectedIndex } />

      </div>
    </ContentContainer>
  );
};

DashboardNeglectedFields.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardNeglectedFields;
