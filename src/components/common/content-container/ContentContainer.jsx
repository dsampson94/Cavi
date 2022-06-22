import React, { useState } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';
import { mappedUserData } from '../side-bar/Sidebar.util';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';

import './content-container.scss';

const ContentContainer = ({ children, clientRequestFields }) => {

  const [showSideBar, setShowSideBar] = useState(true);

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  return (
    <div className="content-container">
      <TopBar showSideBar={ showSideBar }
              setShowSideBar={ setShowSideBar }
              clientRequestFields={ clientRequestFields } />

      <div className="content-container__screen">
        <SideBar mappedUserData={ mappedUser }
                 showSideBar={ showSideBar }
                 setShowSideBar={ setShowSideBar } />
        { children }
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;
