import React, { useState } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';

import './content-container.scss';

const ContentContainer = ({ children, clientRequestFields }) => {

  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <div className="content-container">
      <TopBar showSideBar={ showSideBar }
              setShowSideBar={ setShowSideBar }
              clientRequestFields={ clientRequestFields } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 setShowSideBar={ setShowSideBar } />
        { children }
      </div>
    </div>
  );
};

ContentContainer.defaultProps = {};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;
