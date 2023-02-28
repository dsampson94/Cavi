import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';

import { DASHBOARD } from '../../../tools/general/system-variables.util';

import { mappedUserData } from '../side-bar/Sidebar.util';

import TopBarTw from '../top-bar/TopBar.tw';
import SideBar from '../side-bar/SideBar';
import TabBar from '../tab-bar/TabBar';

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

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  return (
    <div className="content-container">

      <TopBarTw showSideBar={ showSideBar }
                setShowSideBar={ setShowSideBar }
                clientRequestParams={ clientRequestParams }
                view={ view } />

      {/*<TopBar showSideBar={ showSideBar }*/ }
      {/*        setShowSideBar={ setShowSideBar }*/ }
      {/*        clientRequestParams={ clientRequestParams }*/ }
      {/*        view={ view } />*/ }

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 mappedUserData={ mappedUser }
                 setShowSideBar={ setShowSideBar }
                 view={ view } />

        <div className="content-container__screen--dashboard">

          <TabBar />

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

      <TopBarTw showSideBar={ showSideBar }
                setShowSideBar={ setShowSideBar }
                clientRequestParams={ clientRequestParams }
                view={ view } />

      {/*<TopBar showSideBar={ showSideBar }*/}
      {/*        setShowSideBar={ setShowSideBar }*/}
      {/*        setActiveFieldName={ setActiveFieldName }*/}
      {/*        clientRequestParams={ clientRequestParams }*/}
      {/*        mappedFieldList={ mappedFieldList }*/}
      {/*        view={ view } />*/}

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
