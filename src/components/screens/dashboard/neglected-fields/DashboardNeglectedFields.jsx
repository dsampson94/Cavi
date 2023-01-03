import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { CLIENT_RECOMMENDATION_VIEW, DASHBOARD } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';

import './dashboard-neglected-fields.scss';
import Select from '../../../common/select/Select';
import Button from '../../../common/button/Button';
import Table from '../../../common/table/Table';

const DashboardNeglectedFields = ({
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
      <div className="dashboard-neglected-fields">

        <div className="dashboard-neglected-fields__container">

          <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />

          <Select menuData={ [{ 1: 1 }, { 2: 2 }, { 3: 3 }] } wide />

          <Button label={ 'Reload' } medium spaced />

        </div>

        <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
               activeTableData={ [{
                 group: '',
                 database: '',
                 field: '',
                 lastViewed: ''
               }] }
               hiddenColumns={ ['color'] } />

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
