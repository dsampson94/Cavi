import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';
import { DASHBOARD, LAST_READINGS_VIEW } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import Select from '../../../common/select/Select';
import Button from '../../../common/button/Button';
import Table from '../../../common/table/Table';
import TextInputTw from '../../../common/input/text/TextInput.tw';

import './dashboard-last-readings.scss';
import './../dashboard.scss';

const DashboardLastReadings = ({
                                 lastReadingsIrricomList,
                                 lastReadingsReadingsList,
                                 probeNumber,
                                 setProbeNumber,
                                 filterNumber,
                                 setFilterNumber,
                                 handleSubmit
                               }) => {

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>
      <div className="dashboard-last-readings">

        <div className="dashboard-header">
          Find most recent readings from any probe, Irricom, Aquawave, DFM, GPRS probe:
        </div>

        <div className="dashboard-last-readings__container">

          <TextInputTw label={ 'Probe Number' }
                       placeholder={ 'ex. AC12345, DFM00034, 2549, 19273' }
                       activeValue={ probeNumber }
                       setActiveValue={ setProbeNumber } />

          <Select activeItem={ filterNumber }
                  setActiveItem={ setFilterNumber }
                  list={ [
                    { id: 0, name: '10' },
                    { id: 1, name: '50' },
                    { id: 2, name: '100' },
                    { id: 3, name: '250' },
                    { id: 4, name: '500' },
                    { id: 5, name: '1000' }
                  ] } />

          <div className="flex mt-2 w-full">
            <Button label={ 'Search' } medium spaced onClick={ handleSubmit } />

            <Button label={ 'Send Raw Readings by Email' } long spaced />

            <Button label={ 'View Charts' } medium spaced />

          </div>

        </div>

        <div>
          <Table tableName={ LAST_READINGS_VIEW }
                 activeTableData={ lastReadingsIrricomList }
                 hiddenColumns={ [] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex } />
        </div>


        { lastReadingsReadingsList &&
        <div>
          <Table tableName={ LAST_READINGS_VIEW }
                 activeTableData={ lastReadingsReadingsList }
                 hiddenColumns={ [] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex } />
        </div> }
      </div>
    </ContentContainer>
  );
};

DashboardLastReadings.propTypes = {
  lastReadingsList: arrayOf(shape({}))
};

export default DashboardLastReadings;
