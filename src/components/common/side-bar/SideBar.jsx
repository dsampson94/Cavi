import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { bool, func } from 'prop-types';

import {
  ADD_FIELD_ROUTE,
  BILLING_ROUTE,
  CLIENT_DETAILS_ROUTE,
  CLIENT_FIELDS,
  CROP_DETAILS_ROUTE,
  CROP_FACTORS_ROUTE,
  DASHBOARD,
  FIELD_CHARTS,
  FIELD_SETUP,
  FIELD_TEMPERATURES,
  FIELDS_SPLIT_ROUTE,
  GENERAL_ROUTE,
  IRRIDAY_ROUTE,
  IRRISYS_ROUTE,
  ML_FORECASTS_STRING,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  PUSH_WARNING_ROUTE,
  ROOTS_ROUTE,
  SEARCH_PLACEHOLDER,
  SENSORS_ROUTE,
  SMS_RECOMMENDATION_ROUTE,
  SMS_WARNING_ROUTE,
  USERS_ROUTE,
  WEATHER_STATION_ROUTE
} from '../../../tools/general/system-variables.util';

import { mapFavoritesList, SideBarButton, SideBarFieldList, SideBarList, ViewDataBar } from './Sidebar.util';
import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';
import { viewFarmLocalStorageFavorites } from '../../../tools/storage/localStorage';

import InputSearch from '../input-search/InputSearch';
import Button from '../button/Button';

import './side-bar.scss';

const SideBar = ({
                   showSideBar,
                   setShowSideBar,
                   mappedUserData,
                   mappedFieldList,
                   setActiveLoadPeriod,
                   setActiveFieldName,
                   view
                 }) => {

  switch (view) {
    case DASHBOARD:
    case CLIENT_FIELDS:
      return <ClientFieldsSideBar showSideBar={ showSideBar }
                                  setShowSideBar={ setShowSideBar }
                                  mappedUserData={ mappedUserData } />;

    case FIELD_CHARTS:
      return <FieldChartsSideBar showSideBar={ showSideBar }
                                 setShowSideBar={ setShowSideBar }
                                 mappedFieldList={ mappedFieldList }
                                 setActiveLoadPeriod={ setActiveLoadPeriod }
                                 setActiveFieldName={ setActiveFieldName }
                                 mappedUserData={ mappedUserData } />;

    case FIELD_TEMPERATURES:
      return <FieldTemperaturesChartsSideBar showSideBar={ showSideBar }
                                             setShowSideBar={ setShowSideBar }
                                             mappedFieldList={ mappedFieldList }
                                             setActiveLoadPeriod={ setActiveLoadPeriod }
                                             setActiveFieldName={ setActiveFieldName }
                                             mappedUserData={ mappedUserData } />;

    case FIELD_SETUP:
      return <FieldSetupSideBar showSideBar={ showSideBar }
                                setShowSideBar={ setShowSideBar }
                                setActiveFieldName={ setActiveFieldName } />;
  }
};

SideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

export default SideBar;

const ClientFieldsSideBar = ({ showSideBar, mappedUserData }) => {

    let storedFavoritesList = viewFarmLocalStorageFavorites();

    const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);
    const [persistSearchString, setPersistSearchString] = useState('');
    const [favoritesToggle, setFavoritesToggle] = useState(false);
    const [mappedFavoritesList, setMappedFavoritesList] = useState([]);

    useEffect(() => {
      storedFavoritesList = viewFarmLocalStorageFavorites();
      setMappedFavoritesList(mapFavoritesList(storedFavoritesList, mappedUserData));
    }, []);

    useEffect(() => {
      storedFavoritesList = viewFarmLocalStorageFavorites();
      setMappedFavoritesList(mapFavoritesList(storedFavoritesList, mappedUserData));
    }, [favoritesToggle]);

    return (
      <div className={ getClassNames('client-fields-side-bar', { show: showSideBar }) }>
        { showSideBar && <>
          <InputSearch dataToFilter={ mappedUserData }
                       setFilteredData={ setFilteredSideBarData }
                       persistSearchString={ persistSearchString }
                       setPersistSearchString={ setPersistSearchString }
                       placeholder={ SEARCH_PLACEHOLDER }
                       sidebar />

          { !isEmpty(mappedFavoritesList) &&
          <SideBarList mappedUserData={ mappedFavoritesList }
                       favoritesToggle={ favoritesToggle }
                       setFavoritesToggle={ setFavoritesToggle }
                       myFavorites /> }

          <SideBarList mappedUserData={ filteredSideBarData ? filteredSideBarData : mappedUserData }
                       filteredSideBarData={ filteredSideBarData }
                       favoritesToggle={ favoritesToggle }
                       setFavoritesToggle={ setFavoritesToggle }
                       myClients />

          <SideBarButton />
        </> }
      </div>
    );
  }
;

ClientFieldsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

const FieldChartsSideBar = ({
                              showSideBar,
                              mappedFieldList,
                              clientRequestFields,
                              setActiveLoadPeriod,
                              setActiveFieldName,
                              mappedUserData
                            }) => {

  let storedFavoritesList = viewFarmLocalStorageFavorites();

  const [mappedFavoritesList, setMappedFavoritesList] = useState([]);

  useEffect(() => {
    storedFavoritesList = viewFarmLocalStorageFavorites();
    setMappedFavoritesList(mapFavoritesList(storedFavoritesList, mappedUserData));
  }, []);

  return (
    <div className={ getClassNames('field-charts-side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <ViewDataBar setActiveLoadPeriod={ setActiveLoadPeriod } />

        { !isEmpty(mappedFavoritesList) &&
        <SideBarList mappedUserData={ mappedFavoritesList }
                     myFavoritesChart /> }

        <SideBarFieldList view={ FIELD_CHARTS }
                          mappedFieldList={ mappedFieldList }
                          clientRequestFields={ clientRequestFields }
                          setActiveFieldName={ setActiveFieldName } />
      </> }
    </div>
  );
};

FieldChartsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

const FieldTemperaturesChartsSideBar = ({
                                          showSideBar,
                                          mappedFieldList,
                                          clientRequestFields,
                                          setActiveLoadPeriod,
                                          setActiveFieldName,
                                          mappedUserData
                                        }) => {

  let storedFavoritesList = viewFarmLocalStorageFavorites();

  const [mappedFavoritesList, setMappedFavoritesList] = useState([]);

  useEffect(() => {
    storedFavoritesList = viewFarmLocalStorageFavorites();
    setMappedFavoritesList(mapFavoritesList(storedFavoritesList, mappedUserData));
  }, []);

  return (
    <div className={ getClassNames('field-charts-side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <ViewDataBar setActiveLoadPeriod={ setActiveLoadPeriod } />

        { !isEmpty(mappedFavoritesList) &&
        <SideBarList mappedUserData={ mappedFavoritesList }
                     myFavoritesChart /> }

        <SideBarFieldList view={ FIELD_TEMPERATURES }
                          mappedFieldList={ mappedFieldList }
                          clientRequestFields={ clientRequestFields }
                          setActiveFieldName={ setActiveFieldName } />
      </> }
    </div>
  );
};

FieldTemperaturesChartsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

const FieldSetupSideBar = ({ showSideBar }) => {

  const history = useHistory();

  const { groupName, clientName, activeScreen } = useParams();

  const handleSetupSideBarClick = (optionSelected) => {
    return history.push(`/client/${ groupName }/${ clientName }/field-setup/${ optionSelected }`);
  };

  return (
    <div className={ getClassNames('field-setup-side-bar', { show: showSideBar }) }>
      { showSideBar && <>

        <ul className={ 'field-setup-side-bar__list' }>
          <h4>Field Setup</h4>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === GENERAL_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(GENERAL_ROUTE) }>General
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === PROBES_SUMMARY_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(PROBES_SUMMARY_ROUTE) }>Probes - Summary
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === PROBES_DETAILED_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(PROBES_DETAILED_ROUTE) }>Probes - Detail
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === SENSORS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(SENSORS_ROUTE) }>Sensors
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === ROOTS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(ROOTS_ROUTE) }>Roots
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === CROP_FACTORS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(CROP_FACTORS_ROUTE) }>Cropfactors
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === CROP_DETAILS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(CROP_DETAILS_ROUTE) }>Crop Details
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === WEATHER_STATION_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(WEATHER_STATION_ROUTE) }>Weatherstation
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === IRRISYS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(IRRISYS_ROUTE) }>Irrigation System
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === IRRIDAY_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(IRRIDAY_ROUTE) }>Irrigation Days
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === SMS_WARNING_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(SMS_WARNING_ROUTE) }>SMS Warnings
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === PUSH_WARNING_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(PUSH_WARNING_ROUTE) }>Push Notifications
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === FIELDS_SPLIT_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(FIELDS_SPLIT_ROUTE) }>Split Valves
          </li>
          <li><Button label={ 'Create new field' }
                      onClick={ () => handleSetupSideBarClick(ADD_FIELD_ROUTE) } />
          </li>
        </ul>

        <ul className={ 'field-setup-side-bar__list--client' }>
          <h4>Client Details</h4>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === BILLING_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(BILLING_ROUTE) }>Billing
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === CLIENT_DETAILS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(CLIENT_DETAILS_ROUTE) }>Client Details
          </li>
          <li className={ getClassNames('field-setup-side-bar__list__item',
            { selected: (activeScreen === USERS_ROUTE) }) }
              onClick={ () => handleSetupSideBarClick(USERS_ROUTE) }>Users
          </li>
          <li
            className={ getClassNames('field-setup-side-bar__list__item',
              { selected: (activeScreen === SMS_RECOMMENDATION_ROUTE) }) }
            onClick={ () => handleSetupSideBarClick(SMS_RECOMMENDATION_ROUTE) }>SMS Recommendations
          </li>
        </ul>

        <ul className={ 'field-setup-side-bar__list' }>
          <h4>Advanced</h4>
          <li onClick={ () => handleSetupSideBarClick(ML_FORECASTS_STRING) }>Forecasts</li>
        </ul>
      </> }
    </div>
  );
};

FieldSetupSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};
