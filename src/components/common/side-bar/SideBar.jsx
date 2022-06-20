import React, { useState } from 'react';

import { bool, func } from 'prop-types';

import { SideBarButton, SideBarList } from './Sidebar.util';
import { getClassNames } from '../../../tools/general/helpers.util';

import InputSearch from '../input-search/InputSearch';

import './side-bar.scss';

const SideBar = ({ mappedUserData, showSideBar, setShowSideBar }) => {

  const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);
  const [persistSearchString, setPersistSearchString] = useState('');

  return (
    <div className={ getClassNames('side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <InputSearch dataToFilter={ mappedUserData }
                     setFilteredData={ setFilteredSideBarData }
                     persistSearchString={ persistSearchString }
                     setPersistSearchString={ setPersistSearchString }
                     placeholder={ 'Filter clients' }
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

SideBar.defaultProps = {};

SideBar.propTypes = {
  showSideBar: bool.isRequired,
  setShowSideBar: func.isRequired
};

export default SideBar;
