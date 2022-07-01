import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';
import { CLIENT_FIELDS, FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { mappedUserData } from '../side-bar/Sidebar.util';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';

import './content-container.scss';

const ContentContainer = ({
                            children,
                            view,
                            clientRequestFields,
                            mappedFieldList,
                            setLoadPeriod,
                            showChartsSideBar,
                            showClientsSideBar,
                            setShowClientsSideBar
                          }) => {
  switch (view) {
    case CLIENT_FIELDS:
      return <ClientFieldsContentContainer children={ children }
                                           view={ view }
                                           showClientsSideBar={ showClientsSideBar }
                                           setShowClientsSideBar={ setShowClientsSideBar }
                                           clientRequestFields={ clientRequestFields } />;
    case FIELD_CHARTS:
      return <FieldChartsContentContainer children={ children }
                                          view={ view }
                                          showChartsSideBar={ showChartsSideBar }
                                          mappedFieldList={ mappedFieldList }
                                          clientRequestFields={ clientRequestFields }
                                          setLoadPeriod={ setLoadPeriod } />;
  }
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;

const ClientFieldsContentContainer = ({ children, view, showClientsSideBar, setShowClientsSideBar, clientRequestFields }) => {

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  return (
    <div className="content-container">
      <TopBar showSideBar={ showClientsSideBar }
              setShowSideBar={ setShowClientsSideBar }
              clientRequestFields={ clientRequestFields }
              view={ view } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showClientsSideBar }
                 mappedUserData={ mappedUser }
                 setShowSideBar={ setShowClientsSideBar }
                 view={ view } />
        { children }
      </div>
    </div>
  );
};

ClientFieldsContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

const FieldChartsContentContainer = ({ children, view, showChartsSideBar, clientRequestFields, mappedFieldList, setLoadPeriod }) => {

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  return (
    <div className="content-container">
      <TopBar clientRequestFields={ clientRequestFields }
              view={ view } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showChartsSideBar }
                 mappedUserData={ mappedUser }
                 mappedFieldList={ mappedFieldList }
                 setLoadPeriod={ setLoadPeriod }
                 view={ view } />
        { children }
      </div>
    </div>
  );
};

FieldChartsContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
