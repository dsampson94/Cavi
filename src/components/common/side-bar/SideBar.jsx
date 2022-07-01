import React, { useState } from 'react';

import { bool, func } from 'prop-types';

import { CLIENT_FIELDS, FIELD_CHARTS, SEARCH_PLACEHOLDER } from '../../../tools/general/system-variables.util';
import { SideBarButton, SideBarFieldList, SideBarList, ViewDataBar } from './Sidebar.util';
import { getClassNames } from '../../../tools/general/helpers.util';

import InputSearch from '../input-search/InputSearch';

import './side-bar.scss';

const SideBar = ({ showSideBar, setShowSideBar, mappedUserData, mappedFieldList, setLoadPeriod, view }) => {
  switch (view) {
    case CLIENT_FIELDS:
      return <ClientFieldsSideBar showSideBar={ showSideBar }
                                  setShowSideBar={ setShowSideBar }
                                  mappedUserData={ mappedUserData } />;
    case FIELD_CHARTS:
      return <FieldChartsSideBar showSideBar={ showSideBar }
                                 setShowSideBar={ setShowSideBar }
                                 mappedFieldList={ mappedFieldList }
                                 setLoadPeriod={ setLoadPeriod } />;
  }
};

SideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

export default SideBar;

const ClientFieldsSideBar = ({ showSideBar, mappedUserData, setShowSideBar }) => {

  const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);
  const [persistSearchString, setPersistSearchString] = useState('');

  return (
    <div className={ getClassNames('client-fields-side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <InputSearch dataToFilter={ mappedUserData }
                     setFilteredData={ setFilteredSideBarData }
                     persistSearchString={ persistSearchString }
                     setPersistSearchString={ setPersistSearchString }
                     placeholder={ SEARCH_PLACEHOLDER }
                     sidebar />

        <SideBarList mappedUserData={ filteredSideBarData ? filteredSideBarData : mappedUserData }
                     filteredSideBarData={ filteredSideBarData }
                     setShowSideBar={ setShowSideBar }
                     showSideBar={ showSideBar } />

        <SideBarButton />
      </> }
    </div>
  );
};

ClientFieldsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

const FieldChartsSideBar = ({ showSideBar, mappedFieldList, clientRequestFields, setLoadPeriod }) => {

  return (
    <div className={ getClassNames('field-charts-side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <ViewDataBar setLoadPeriod={ setLoadPeriod } />

        <SideBarFieldList mappedFieldList={ mappedFieldList }
                          clientRequestFields={ clientRequestFields } />
      </> }
    </div>
  );
};

FieldChartsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};
