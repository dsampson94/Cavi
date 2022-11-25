import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD, SEARCH_PLACEHOLDER } from '../../../../tools/general/system-variables.util';
import { ActiveHeader, OverviewList } from './DashboardOverview.util';

import ContentContainer from '../../../common/content-container/ContentContainer';
import InputSearch from '../../../common/input-search/InputSearch';

import './dashboard-overview.scss';

const DashboardOverview = ({
                             ownClientsList,
                             overviewOptionSelected,
                             setOverviewOptionSelected
                           }) => {

  const history = useHistory();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [filteredClientData, setFilteredClientData] = useState(undefined);

  const handleSubHeaderClick = (groupName, clientName) => history.push(`/client/${ groupName }/${ clientName }`);

  return (
    <ContentContainer view={ DASHBOARD }
                      showClientsSideBar={ showClientsSideBar }
                      setShowClientsSideBar={ setShowClientsSideBar }>
      <div className="dashboard-overview">

        <ActiveHeader overviewOptionSelected={ overviewOptionSelected }
                      setOverviewOptionSelected={ setOverviewOptionSelected } />

        <InputSearch dataToFilter={ ownClientsList }
                     setFilteredData={ setFilteredClientData }
                     placeholder={ SEARCH_PLACEHOLDER }
                     overview />

        <OverviewList ownClientsList={ filteredClientData ? filteredClientData : ownClientsList }
                      overviewOptionSelected={ overviewOptionSelected }
                      setOverviewOptionSelected={ setOverviewOptionSelected }
                      handleSubHeaderClick={ handleSubHeaderClick } />
      </div>
    </ContentContainer>
  );
};

DashboardOverview.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string
};

export default DashboardOverview;
