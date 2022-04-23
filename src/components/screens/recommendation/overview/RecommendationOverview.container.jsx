import React from 'react';
import { connect } from 'react-redux';
import RecommendationOverview from './RecommendationOverview';

const RecommendationOverviewContainer = ({}) => {

  return <RecommendationOverview />;
};

const mapStateToProps = ({ auth }) => ({
  loggedInUser: auth.loggedInUser
});

export default connect(mapStateToProps)(RecommendationOverviewContainer);
