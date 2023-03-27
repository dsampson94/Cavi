import React, { useState } from 'react';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD, EXCEL_ICON, LOCATION_PIN, MONITOR_PROBES_VIEW } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';
import SVGIcon from '../../../common/SVGIcon/SVGIcon';

import Select from '../../../common/select/Select';

import './dashboard-monitor.scss';
import { MonitorProbesTable } from '../../../common/table/MonitorProbesTable';

const DashboardMonitor = ({
                            monitorProbesList,
                            adminUserList,
                            adminUserFilter,
                            setAdminUserFilter,
                            sortType,
                            setSortType,
                            onlyBehind,
                            setOnlyBehind,
                            dfm,
                            setDfm
                          }) => {

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="dashboard-monitor">

        <div className="dashboard-monitor__topbar">

          <div className="dashboard-monitor__select-container">
            <Select activeItem={ adminUserFilter }
                    setActiveItem={ setAdminUserFilter }
                    list={ adminUserList ?? [] } />

            <Select activeItem={ sortType }
                    setActiveItem={ setSortType }
                    list={ [
                      { id: 0, name: 'Normal' },
                      { id: 1, name: 'Volts' },
                      { id: 2, name: 'Airtime' },
                      { id: 3, name: 'Probe No' },
                      { id: 4, name: 'Irricom No' },
                      { id: 5, name: 'Last Reading' },
                      { id: 6, name: 'Last Sent' },
                      { id: 7, name: 'Alphabetical' }
                    ] } />

            <Select activeItem={ onlyBehind }
                    setActiveItem={ setOnlyBehind }
                    list={ [
                      { id: 0, name: 'Hide DFM Handlogger Probes' },
                      { id: 1, name: 'Show DFM Handlogger Probes' }
                    ] } />

            <Select activeItem={ dfm }
                    setActiveItem={ setDfm }
                    list={ [
                      { id: 0, name: 'Filter \'okay\' probes' },
                      { id: 1, name: 'Show all probes' }
                    ] } />
            <div className="flex pt-2 px-6">
              <div style={ { width: '30px' } }><SVGIcon name={ EXCEL_ICON } /></div>
              <div style={ { width: '30px' } }><SVGIcon name={ LOCATION_PIN } fill={ 'red' } /></div>
            </div>
          </div>

        </div>

        <MonitorProbesTable tableName={ MONITOR_PROBES_VIEW }
                            activeTableData={ monitorProbesList }
                            hiddenColumns={ [] }
                            selectedIndex={ selectedIndex }
                            setSelectedIndex={ setSelectedIndex } />
      </div>

    </ContentContainer>
  );
};

DashboardMonitor.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardMonitor;
