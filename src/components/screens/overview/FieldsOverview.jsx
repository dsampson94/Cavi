import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { arrayOf, func, number, shape, string } from 'prop-types';

import { CLIENT_FIELDS, OVERVIEW_MIDBAR, SEARCH_PLACEHOLDER } from '../../../tools/general/system-variables.util';
import { ActiveHeader, OverviewList } from './FieldsOverview.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';
import InputSearch from '../../common/input-search/InputSearch';

import './fields-overview.scss';

const FieldsOverview = ({
                          ownClientsList,
                          overviewOptionSelected,
                          setOverviewOptionSelected,
                          activePath
                        }) => {

  const history = useHistory();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [filteredClientData, setFilteredClientData] = useState(undefined);

  const handleOverviewClick = () => history.push('/overview');
  const handleMonitorProbesClick = () => history.push('/monitor');

  const handleSubHeaderClick = (groupName, clientName) => history.push(`/client/${ groupName }/${ clientName }`);

  return (
    <ContentContainer view={ CLIENT_FIELDS }
                      showClientsSideBar={ showClientsSideBar }
                      setShowClientsSideBar={ setShowClientsSideBar }>
      <div className="fields-overview">
        <MidBar view={ OVERVIEW_MIDBAR }
                activePath={ activePath }
                handleOverviewClick={ handleOverviewClick }
                handleMonitorProbesClick={ handleMonitorProbesClick } />

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

FieldsOverview.propTypes = {
  ownClientsList: arrayOf(shape({})),
  overviewOptionSelected: number || undefined,
  setOverviewOptionSelected: func,
  activePath: string.isRequired
};

export default FieldsOverview;
