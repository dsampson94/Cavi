import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-email-readings.scss';
import TextInput from '../../../common/input/text/TextInput';
import CheckboxInput from '../../../common/input/checkbox/CheckboxInput';
import Button from '../../../common/button/Button';

const DashboardEmailReadings = ({
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
      <div className="dashboard-email-readings">

        <div className="dashboard-email-readings__container">

          <TextInput label={ 'Probe / Wave Number' } left />

          <TextInput label={ 'Start Date' } left />

          <CheckboxInput constant={ 'Aquawaves' }
                         rightText={ 'Include raw data files' }
                         left />

          <div className="dashboard-email-readings__button-container">
            <Button label={ 'Send Readings' } medium />
          </div>

        </div>

      </div>
    </ContentContainer>
  );
};

DashboardEmailReadings.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardEmailReadings;
