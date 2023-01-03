import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { CLIENT_RECOMMENDATION_VIEW, DASHBOARD, EXCEL_ICON, LOCATION_PIN } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';
import Select from '../../../common/select/Select';
import Button from '../../../common/button/Button';
import SVGIcon from '../../../common/SVGIcon/SVGIcon';
import Table from '../../../common/table/Table';

import './dashboard-monitor.scss';

const DashboardMonitor = ({
                            ownClientsList,
                            overviewOptionSelected,
                            setOverviewOptionSelected
                          }) => {

  const history = useHistory();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [activeTableData, setActiveTableData] = useState([]);

  const handleReloadButtonClick = () => {

  };

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="dashboard-monitor">

        <div className="dashboard-monitor__topbar">

          <div className="dashboard-monitor__select-container">
            <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />
            <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />
            <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />
            <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />
          </div>

          <div className="dashboard-monitor__button-container">
            <Button label={ 'Reload' }
                    onClick={ handleReloadButtonClick } medium spaced />
            <div style={ { width: '30px' } }><SVGIcon name={ EXCEL_ICON } /></div>
            <div style={ { width: '30px' } }><SVGIcon name={ LOCATION_PIN } fill={ 'red' } /></div>
          </div>

        </div>

        <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
               activeTableData={ [{
                 group: '',
                 database: '',
                 field: '',
                 act: '',
                 probe: '',
                 IC: '',
                 lastReading: '',
                 lastSent: '',
                 ['cell#']: '',
                 FWAirtime: '',
                 volts: ''
               }] }
               hiddenColumns={ ['color'] }
               selectedIndex={ selectedIndex }
               setSelectedIndex={ setSelectedIndex }
               setActiveTableData={ setActiveTableData } />
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
