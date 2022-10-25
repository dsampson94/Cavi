import React, { useEffect, useState } from 'react';

import { bool, func } from 'prop-types';

import {
  CLIENT_FIELDS,
  FIELD_CHARTS,
  FIELD_SETUP,
  FIELD_TEMPERATURES,
  SEARCH_PLACEHOLDER
} from '../../../tools/general/system-variables.util';

import { mapFavoritesList, SideBarButton, SideBarFieldList, SideBarList, ViewDataBar } from './Sidebar.util';
import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';
import { viewFarmLocalStorageFavorites } from '../../../tools/storage/localStorage';

import InputSearch from '../input-search/InputSearch';
import Button from '../button/Button';

import './side-bar.scss';

const SideBar = ({ showSideBar, setShowSideBar, mappedUserData, mappedFieldList, setActiveLoadPeriod, setActiveFieldName, view }) => {

  switch (view) {
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
                                mappedFieldList={ mappedFieldList }
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

const FieldSetupSideBar = ({ showSideBar, mappedFieldList, clientRequestFields, setActiveFieldName }) => {

  return (
    <div className={ getClassNames('field-setup-side-bar', { show: showSideBar }) }>
      { showSideBar && <>

        <ul className={ 'field-setup-side-bar__list' }>
          <h4>Field Setup</h4>
          <li>General</li>
          <li>Probes - Summary</li>
          <li>Probes - Detail</li>
          <li>Sensors</li>
          <li>Roots</li>
          <li>Cropfactors</li>
          <li>Crop Details</li>
          <li>Weatherstation</li>
          <li>Irrigation System</li>
          <li>Irrigation Days</li>
          <li>SMS Warnings</li>
          <li>Push Notifications</li>
          <li>Split Valves</li>
          <li><Button label={ 'Create new field' } /></li>
        </ul>

        <ul className={ 'field-setup-side-bar__list--client' }>
          <h4>Client Details</h4>
          <li>Billing</li>
          <li>Client Details</li>
          <li>Users</li>
          <li>SMS Recommendations</li>
        </ul>

        <ul className={ 'field-setup-side-bar__list' }>
          <h4>Advanced</h4>
          <li>Forecasts</li>
        </ul>
      </> }
    </div>
  );
};

FieldSetupSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};
