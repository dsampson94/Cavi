import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-check-irricoms.scss';
import Button from '../../../common/button/Button';
import TextInput from '../../../common/input/text/TextInput';
import Select from '../../../common/select/Select';

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
      <div className="dashboard-check-irricoms">

        <div className="dashboard-check-irricoms__container">

          <label>{ 'Manually check if Irricoms or 4Gees are working' }</label><br /><br />

          <label>{ 'Enter the unit numbers, devide by a comma or enter 1234-1250 for a range, for example: 1234,1235,1510-1530,1237 ' +
          'Note: You can subdevide the results by entering names inbetween for example: Knutsford,ge01477,ge01907,ge00550,' +
          'Teebus,ge01885,ge01886,ge01883' }</label><br /><br />

          <TextInput label={ 'Irricom Probe Number' } left />

          <Select label={ 'Select a Previous List' }
                  menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] }
                  left input />

          <div className={ 'dashboard-check-irricoms__button-container' }>

            <Button label={ 'Charts' } medium spaced />

            <Button label={ 'Submit Probe Number' } long spaced />

            <Button label={ 'Submit Previous List' } long />
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
