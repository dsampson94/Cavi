import React from 'react';
import { useHistory } from 'react-router';

import { arrayOf, shape, string } from 'prop-types';

import { ActiveHeader, OverviewList } from './RecommendationOverview.util';
import ContentContainer from '../../../common/content-container/ContentContainer';
import MidBar from '../../../common/mid-bar/MidBar';
import InputSearch from '../../../common/input-search/InputSearch';

import './recommendation-overview.scss';

const RecommendationOverview = ({
                                  ownClientsList,
                                  filteredClientData,
                                  setFilteredClientData,
                                  overviewOptionSelected,
                                  setOverviewOptionSelected,
                                  activePath
                                }) => {

  const history = useHistory();

  const handleOverviewClick = () => history.push('/recommendation/overview');
  const handleMonitorProbesClick = () => history.push('/recommendation/monitor');

  const handleSubHeaderClick = (groupName, clientName) => {
    history.push(`/recommendation/${ groupName }/${ clientName }`);
  };

  return (
    <ContentContainer>
      <div className="recommendation-overview">
        <MidBar activePath={ activePath }
                handleOverviewClick={ handleOverviewClick }
                handleMonitorProbesClick={ handleMonitorProbesClick } />

        <ActiveHeader overviewOptionSelected={ overviewOptionSelected }
                      setOverviewOptionSelected={ setOverviewOptionSelected } />

        <InputSearch dataToFilter={ ownClientsList }
                     setFilteredData={ setFilteredClientData }
                     placeholder={ 'Filter clients' }
                     overview />

        <OverviewList ownClientsList={ filteredClientData ? filteredClientData : ownClientsList }
                      overviewOptionSelected={ overviewOptionSelected }
                      setOverviewOptionSelected={ setOverviewOptionSelected }
                      handleSubHeaderClick={ handleSubHeaderClick } />
      </div>
    </ContentContainer>
  );
};

RecommendationOverview.defaultProps = {};

RecommendationOverview.propTypes = {
  ownClientsList: arrayOf(shape({})).isRequired,
  activePath: string.isRequired
};

export default RecommendationOverview;
