import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { MID_BAR_OVERVIEW } from '../../../../tools/general/system-variables.util';

import ContentContainer from '../../../common/content-container/ContentContainer';
import MidBar from '../../../common/mid-bar/MidBar';

import './recommendation-overview.scss';

const RecommendationOverview = () => {

  const history = useHistory();

  const handleOverviewClick = () => history.push('/recommendation/overview');
  const handleMonitorProbesClick = () => history.push('/recommendation/client');

  const { path } = useRouteMatch();

  // const getActiveButton = () => {
  //   console.log((activePath.toLowerCase()));
  //   console.log(activePath.includes(activeRoute.toLowerCase()));
  //   if (path.includes(activeButton.toLowerCase())) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const getActiveButton = () => {
  //   console.log((activeButton.toLowerCase()));
  //   if (path.includes(activeButton.toLowerCase())) {
  //     return true;
  //   } else return false;
  // };

  return (
    <ContentContainer>
      <div className="recommendation-overview">
        <MidBar activeButton={ MID_BAR_OVERVIEW }
                activePath={ path }
                handleOverviewClick={ handleOverviewClick }
                handleMonitorProbesClick={ handleMonitorProbesClick } />
      </div>
    </ContentContainer>
  );
};

RecommendationOverview.defaultProps = {};

RecommendationOverview.propTypes = {};

export default RecommendationOverview;
