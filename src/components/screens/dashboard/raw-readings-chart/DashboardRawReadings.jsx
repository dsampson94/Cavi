import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import Select from '../../../common/select/Select';
import TextInput from '../../../common/input/text/TextInput';
import Button from '../../../common/button/Button';

import './dashboard-raw-readings.scss';

const DashboardRawReadings = ({
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
      <div className="dashboard-raw-readings">

        <div className="dashboard-raw-readings__container">

          <TextInput label={ 'Probe' } left />

          <Select label={ 'Type' }
                  menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] }
                  left input />

          <div className="dashboard-raw-readings__button-container">
            <Button label={ 'Send Readings' } medium />
          </div>

        </div>

      </div>
    </ContentContainer>
  );
};

DashboardRawReadings.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardRawReadings;
