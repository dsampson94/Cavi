import React, { useState } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';

import { DASHBOARD } from '../../../tools/general/system-variables.util';

import { mappedUserData } from '../side-bar/Sidebar.util';

import TopBarTw from '../top-bar/TopBar.tw';
import SideBar from '../side-bar/SideBar';
import TabBarTop from '../tab-bar/TabBarTop';
import FieldCommentsSlideOverTw from '../slide-over/FieldCommentsSlideOverTw';

import { Routes } from '../../../routes';
import { setClientMonitorProbesList } from '../../../redux/actions/client.action';
import { useHistory, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';

import './content-container.scss';

const ContentContainer = ({
                            children,
                            view,
                            clientRequestParams,
                            mappedFieldList,
                            setActiveLoadPeriod,
                            setActiveFieldName,
                            showSideBar,
                            setShowSideBar,
                            isAgent
                          }) => {
  switch (view) {
    case DASHBOARD:
      return <DashboardContentContainer children={ children }
                                        showSideBar={ showSideBar }
                                        setShowSideBar={ setShowSideBar }
                                        clientRequestParams={ clientRequestParams }
                                        view={ view }
                                        isAgent={ isAgent } />;

    default:
      return <ClientFieldContentContainer children={ children }
                                          showSideBar={ showSideBar }
                                          setShowSideBar={ setShowSideBar }
                                          clientRequestParams={ clientRequestParams }
                                          setActiveFieldName={ setActiveFieldName }
                                          setActiveLoadPeriod={ setActiveLoadPeriod }
                                          mappedFieldList={ mappedFieldList }
                                          view={ view }
                                          isAgent={ isAgent } />;

  }
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;

const DashboardContentContainer = ({ children, view, showSideBar, setShowSideBar, clientRequestParams, isAgent }) => {

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = [
    {
      name: 'Assistant',
      current: path.includes('assistant'),
      href: () => {
        history.push(Routes.ASSISTANT);
      }
    },
    {
      name: 'Overview',
      current: path.includes('overview'),
      href: () => {
        history.push(Routes.OVERVIEW);
      }
    },
    {
      name: 'Monitor Probes',
      current: path.includes('monitor-probes'),
      href: () => {
        dispatch(setClientMonitorProbesList([]));
        history.push(Routes.MONITOR);
      }
    },
    {
      name: 'Last Readings',
      current: path.includes('last-readings'),
      href: () => {
        history.push(Routes.LAST_READINGS);
      }
    },
    {
      name: 'Neglected Fields',
      current: path.includes('neglected-fields'),
      href: () => {
        dispatch(setClientMonitorProbesList([]));
        history.push(Routes.NEGLECTED_FIELDS);
      }
    },
    {
      name: 'Email Readings',
      current: path.includes('email-readings'),
      href: () => {
        history.push(Routes.EMAIL_READINGS);
      }
    },
    {
      name: 'Raw Readings',
      current: path.includes('raw-readings'),
      href: () => {
        history.push(Routes.RAW_READINGS);
      }
    },
    {
      name: 'Irricoms',
      current: path.includes('irricoms'),
      href: () => {
        history.push(Routes.CHECK_IRRICOMS);
      }
    }
  ];

  return (
    <div className="content-container">

      <TopBarTw showSideBar={ showSideBar }
                setShowSideBar={ setShowSideBar }
                clientRequestParams={ clientRequestParams }
                view={ view }
                isAgent={ isAgent } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 setShowSideBar={ setShowSideBar }
                 mappedUserData={ mappedUser }
                 view={ view }
                 isAgent={ isAgent } />

        <div className="content-container__screen--dashboard">

          { isAgent ? <TabBarTop tabs={ tabs } /> : <></> }

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
                                       setActiveFieldName,
                                       isAgent
                                     }) => {

  const userAccount = retrieveUserClientListFromLocalStorage();
  const mappedUser = mappedUserData(userAccount);

  const [showSlideOver, setShowSlideOver] = useState(false);

  return (
    <div className="content-container">

      <TopBarTw showSideBar={ showSideBar }
                setShowSideBar={ setShowSideBar }
                clientRequestParams={ clientRequestParams }
                view={ view }
                isAgent={ isAgent }
                showSlideOver={ showSlideOver }
                setShowSlideOver={ setShowSlideOver } />

      <div className="content-container__screen">
        <SideBar showSideBar={ showSideBar }
                 setShowSideBar={ setShowSideBar }
                 mappedUserData={ mappedUser }
                 mappedFieldList={ mappedFieldList }
                 setActiveLoadPeriod={ setActiveLoadPeriod }
                 setActiveFieldName={ setActiveFieldName }
                 view={ view }
                 isAgent={ isAgent } />
        { children }

        <FieldCommentsSlideOverTw showSlideOver={ showSlideOver }
                                  setShowSlideOver={ setShowSlideOver } />

      </div>
    </div>
  );
};

ClientFieldContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
