import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router';

import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';

import { Routes } from '../../../routes';

import { DASHBOARD } from '../../../tools/general/system-variables.util';

import { mappedUserData } from '../side-bar/Sidebar.util';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';
import MidBar from '../mid-bar/MidBar';

import './content-container.scss';

const ContentContainer = ({
                            children,
                            view,
                            clientRequestParams,
                            mappedFieldList,
                            setActiveLoadPeriod,
                            setActiveFieldName,
                            showSideBar,
                            setShowSideBar
                          }) => {
  switch (view) {
    case DASHBOARD:
      return <DashboardContentContainer children={ children }
                                        showSideBar={ showSideBar }
                                        setShowSideBar={ setShowSideBar }
                                        clientRequestParams={ clientRequestParams }
                                        view={ view } />;

    default:
      return <ClientFieldContentContainer children={ children }
                                          showSideBar={ showSideBar }
                                          setShowSideBar={ setShowSideBar }
                                          clientRequestParams={ clientRequestParams }
                                          setActiveFieldName={ setActiveFieldName }
                                          setActiveLoadPeriod={ setActiveLoadPeriod }
                                          mappedFieldList={ mappedFieldList }
                                          view={ view } />;

  }
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;

const DashboardContentContainer = ({ children, view, showSideBar, setShowSideBar, clientRequestParams }) => {

  const history = useHistory();
  const { path } = useRouteMatch();

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  const handleAssistantClick = () => history.push(Routes.ASSISTANT);
  const handleOverviewClick = () => history.push(Routes.OVERVIEW);
  const handleMonitorProbesClick = () => history.push(Routes.MONITOR);
  const handleLastReadingsClick = () => history.push(Routes.LAST_READINGS);
  const handleNeglectedClick = () => history.push(Routes.NEGLECTED_FIELDS);
  const handleEmailReadingsClick = () => history.push(Routes.EMAIL_READINGS);
  const handleRawReadingsClick = () => history.push(Routes.RAW_READINGS);
  const handleIrricomsClick = () => history.push(Routes.CHECK_IRRICOMS);

  return (
    <div className="content-container">
      <TopBar showSideBar={ showSideBar }
              setShowSideBar={ setShowSideBar }
              clientRequestParams={ clientRequestParams }
              view={ view } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 mappedUserData={ mappedUser }
                 setShowSideBar={ setShowSideBar }
                 view={ view } />

        <div className="content-container__screen--dashboard">

          <MidBar view={ view }
                  activePath={ path }
                  handleAssistantClick={ handleAssistantClick }
                  handleOverviewClick={ handleOverviewClick }
                  handleMonitorProbesClick={ handleMonitorProbesClick }
                  handlelastReadingsClick={ handleLastReadingsClick }
                  handleNeglectedClick={ handleNeglectedClick }
                  handleEmailReadingsClick={ handleEmailReadingsClick }
                  handleRawReadingsClick={ handleRawReadingsClick }
                  handleIrricomsClick={ handleIrricomsClick } />

          { children }

        </div>
      </div>
    </div>
  );
};

DashboardContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

const ClientFieldContentContainer = ({
                                       children,
                                       view,
                                       showSideBar,
                                       setShowSideBar,
                                       clientRequestParams,
                                       mappedFieldList,
                                       setActiveLoadPeriod,
                                       setActiveFieldName
                                     }) => {

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  return (
    <div className="content-container">
      <TopBar showSideBar={ showSideBar }
              setShowSideBar={ setShowSideBar }
              clientRequestParams={ clientRequestParams }
              mappedFieldList={ mappedFieldList }
              view={ view } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 mappedUserData={ mappedUser }
                 mappedFieldList={ mappedFieldList }
                 setActiveLoadPeriod={ setActiveLoadPeriod }
                 setActiveFieldName={ setActiveFieldName }
                 view={ view } />
        { children }
      </div>
    </div>
  );
};

ClientFieldContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
