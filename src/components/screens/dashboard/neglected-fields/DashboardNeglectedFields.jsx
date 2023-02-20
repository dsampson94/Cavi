import React, { useState } from 'react';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD, MONITOR_PROBES_VIEW } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import Select from '../../../common/select/Select';
import Table from '../../../common/table/Table';

import './dashboard-neglected-fields.scss';

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

        <Table tableName={ MONITOR_PROBES_VIEW }
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
