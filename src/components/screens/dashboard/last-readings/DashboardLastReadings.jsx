import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';
import { DASHBOARD, LAST_READINGS_VIEW } from '../../../../tools/general/system-variables.util';
import { isEmpty } from '../../../../tools/general/helpers.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import Select from '../../../common/select/Select';
import Button from '../../../common/button/Button';
import TextInputTw from '../../../common/input/text/TextInput.tw';
import LastReadingsSlideOverTw from '../../../common/slide-over/LastReadingsSlideOverTw';

import './dashboard-last-readings.scss';
import './../dashboard.scss';
import { LastReadingsTable } from '../../../common/table/LastReadingsTable';

const DashboardLastReadings = ({
                                 lastReadingsIrricomList,
                                 lastReadingsReadingsList,
                                 lastReadingsLandDataList,
                                 lastReadingsVoltsAndSignal,
                                 probeNumber,
                                 setProbeNumber,
                                 filterNumber,
                                 setFilterNumber,
                                 handleSubmit
                               }) => {

  const [showSlideOver, setShowSlideOver] = useState(false);
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

            <Button label={ 'View Charts' } onClick={ () => setShowSlideOver(!showSlideOver) } medium spaced />

          </div>

        </div>

        { lastReadingsLandDataList &&
        <div className="h-[13%] overflow-y-auto">
          { lastReadingsLandDataList?.map((item) => {
            return <div className="text-xs mt-1">{ item?.whichfields || item?.naam }</div>;
          }) }
        </div> }

        { !isEmpty(lastReadingsIrricomList) &&
        <>
          <h2 className="font-bold text-sm">{ 'Irricom Readings' }</h2>
          <div className="h-[30%] min-h-[200px] overflow-y-auto">
            <LastReadingsTable tableName={ LAST_READINGS_VIEW }
                               activeTableData={ lastReadingsIrricomList }
                               hiddenColumns={ [] }
                               selectedIndex={ selectedIndex }
                               setSelectedIndex={ setSelectedIndex } />
          </div>
        </> }

        { !isEmpty(lastReadingsReadingsList) &&
        <>
          <h2 className="font-bold text-sm mt-2">{ 'DFM or Aquacheck Handlogger Readings' }</h2>
          <div className="h-[30%] min-h-[200px] overflow-y-auto">
            <LastReadingsTable tableName={ LAST_READINGS_VIEW }
                               activeTableData={ lastReadingsReadingsList }
                               hiddenColumns={ [] }
                               selectedIndex={ selectedIndex }
                               setSelectedIndex={ setSelectedIndex } />
          </div>
        </> }

        { !isEmpty(lastReadingsIrricomList) &&
        <LastReadingsSlideOverTw showSlideOver={ showSlideOver }
                                 setShowSlideOver={ setShowSlideOver }
                                 tableData={ lastReadingsVoltsAndSignal } /> }

      </div>
    </ContentContainer>
  );
};

DashboardLastReadings.propTypes = {
  lastReadingsList: arrayOf(shape({}))
};

export default DashboardLastReadings;
