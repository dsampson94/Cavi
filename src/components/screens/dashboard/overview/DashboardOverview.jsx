import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { arrayOf, func, number, shape, string } from 'prop-types';
import { DASHBOARD, SEARCH_PLACEHOLDER } from '../../../../tools/general/system-variables.util';
import { ActiveHeader, OverviewList } from './DashboardOverview.util';
import { SET_CLIENT_FIELD_LIST, SET_CLIENT_FIELD_RAIN_DATA, SET_CLIENT_FIELD_WEATHER_LIST } from '../../../../redux/actions/client.action';

import ContentContainer from '../../../common/content-container/ContentContainer';
import InputSearch from '../../../common/input-search/InputSearch';

import './dashboard-overview.scss';

const DashboardOverview = ({
                             ownClientsList,
                             overviewOptionSelected,
                             setOverviewOptionSelected
                           }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [showClientsSideBar, setShowClientsSideBar] = useState(true);
  const [filteredClientData, setFilteredClientData] = useState(undefined);

  const handleSubHeaderClick = (groupName, clientName) => {
    // setShowClientsSideBar(false);
    dispatch({ type: SET_CLIENT_FIELD_LIST, fieldList: null });
    dispatch({ type: SET_CLIENT_FIELD_RAIN_DATA, fieldRainData: null });
    dispatch({ type: SET_CLIENT_FIELD_WEATHER_LIST, weatherList: null });
    history.push(`/client/${ groupName }/${ clientName }`);
  };

  return (
    <ContentContainer view={ DASHBOARD }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setShowClientsSideBar }>

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
