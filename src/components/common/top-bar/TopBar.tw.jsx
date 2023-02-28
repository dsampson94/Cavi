import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { MoonIcon } from '@heroicons/react/24/solid';

import { bool, func, shape } from 'prop-types';
import { Routes } from '../../../routes';

import {
  EMAIL,
  EMAIL_RECOMMENDATIONS,
  FIELD_SETTINGS,
  FIELD_SETUP_STRING,
  GENERAL_ROUTE,
  MAPS,
  MAPS_ICON,
  OTHER_FARM,
  PRINT,
  PRINT_ICON,
  PROBES_MONITOR,
  PROBES_MONITOR_STRING,
  RECOMMENDATION_LIST,
  TABLE_LIST,
  VIEW_SIDEBAR,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';
import { capitalize } from '../../../tools/general/helpers.util';
import {
  retrieveActiveThemeFromLocalStorage,
  retrieveUserLoginFromLocalStorage,
  saveActiveThemeToLocalStorage,
  saveUserLoginToLocalStorage
} from '../../../tools/storage/localStorage';

import { requestClientPDF, setClientMonitorProbesList } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import EmailModal from '../modal/EmailModal';
import Graphic from '../graphic/Graphic';
import logo from '../../../tools/images/pulselogo.png';
import ProgressBar from '../loader/progress-bar/ProgressBar';

import './top-bar.scss';
import { Menu, Transition } from '@headlessui/react';
import { SET_THEME } from '../../../redux/actions/system.action';
import TextInput from '../input/text/TextInput';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TopBar = ({ showSideBar, setShowSideBar, clientRequestParams, mappedFieldList, setActiveFieldName }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { fieldName, groupName, clientName, probeNumber } = useParams();

  const userName = retrieveUserLoginFromLocalStorage()?.username?.toUpperCase();
  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode, setIsDarkMode] = useState(!(getTheme === 'dark'));

  useEffect(() => {
    if (getTheme === 'dark') return document.body.classList.add('dark-mode');
  }, [isDarkMode]);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      saveActiveThemeToLocalStorage('dark');
      dispatch({ type: SET_THEME, theme: 'dark' });
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      saveActiveThemeToLocalStorage('light');
      dispatch({ type: SET_THEME, theme: 'light' });
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  const [emailAddress, setEmailAddress] = useState(undefined);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));
  const progress = useSelector(createSelector([state => state.system], system => system?.progressBar));

  useEffect(() => {
    if (!emailAddress) downloadPDF();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientPDF]);

  const downloadPDF = () => {
    if (!clientRequestParams) return;
    if (!clientPDF) return;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(clientPDF);
    link.download = `Irricheck Recommendations ${ clientRequestParams.clientname }`;
    link.click();
  };

  const getPDF = () => {
    if (clientRequestParams)
      dispatch(requestClientPDF(clientRequestParams));
  };

  const getPDFAndEmail = () => {
    setShowEmailModal(true);
  };

  const logout = () => {
    saveUserLoginToLocalStorage({});
    dispatch(requestLogout());
    history.push('/');
  };

  const handleFieldClick = (history, groupName, clientName, field) => {
    if (location.pathname.includes('charts'))
      history.push(`/client/${ groupName }/${ clientName }/field-charts/${ field?.probeNumber }/${ field?.locationName }`);
    if (location.pathname.includes('temperature'))
      history.push(`/client/${ groupName }/${ clientName }/field-temperatures/${ field?.probeNumber }/${ field?.locationName }`);
  };

  const viewClient = (direction) => {
    mappedFieldList.forEach((item, index) => {
      if (item.fieldName.locationName === fieldName) {
        const field = mappedFieldList[index + direction].fieldName;
        setActiveFieldName(field.locationName);
        handleFieldClick(history, groupName, clientName, field);
      }
    });
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">

          <div className="top-bar__left__divider">

            <Graphic onClick={ () => history.push('/dashboard/overview') } topbar graphic={ logo } />

            <Button icon={ VIEW_SIDEBAR }
                    tooltip={ OTHER_FARM }
                    onClick={ () => setShowSideBar(!showSideBar) }
            />
          </div>

          <div className="top-bar__left__breadcrumb">

            { fieldName &&
            <div className="top-bar__left__breadcrumb__container">

              <p onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }>
                { `${ capitalize(groupName) }  /  ${ capitalize(clientName) }` }
              </p>

              <p onClick={ () => viewClient(1) }>{ `/  ${ fieldName }` }</p>

              { location.pathname.includes('charts') &&
              <p
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-temperatures/${ probeNumber }/${ fieldName }`) }>
                { '  / Deficit Charts ' }
              </p> }

              { location.pathname.includes('temperature') &&
              <p onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-charts/${ probeNumber }/${ fieldName }`) }>
                { '  / Temperature Charts ' }
              </p> }

            </div> }

            { location.pathname.includes('client') &
            !location.pathname.includes('setup') & !fieldName ?
              <div className="top-bar__left__breadcrumb__container">
                <p>{ `${ capitalize(groupName) } / ${ capitalize(clientName) }` }</p>
                <p onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/general`) }>
                  { ' /  Field List' }
                </p>
              </div> : <></> }

            { location.pathname.includes('setup') &&
            <div className="top-bar__left__breadcrumb__container">
              <p onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }>
                { `${ capitalize(groupName) }  /  ${ capitalize(clientName) }` }
              </p>
              <p onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }>
                { ' / Field Setup' }
              </p>
              <p>{ `  /  ${ capitalize(location.pathname.split('/')[5]) }` }</p>
            </div> }

            { location.pathname.includes('dashboard') &&
            <div className="top-bar__left__breadcrumb__container">
              <p>{ location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) }</p>
              <p>{ ` / ${ location.pathname.split('/')[2] }` }</p>
            </div> }

          </div>

        </div>

        <div className={ 'top-bar__right' }>

          <div className="top-bar__left-buttons--buttons">
            <TopBarButtons getPDF={ getPDF }
                           getPDFAndEmail={ getPDFAndEmail } />
          </div>

          <TextInput placeholder={ 'Find Last Readings' }
                     topbar />

          <Menu as="div" className="relative mt-0.5 pr-2">
            <div>
              <Menu.Button
                className="flex rounded-full bg-white text-lg focus:outline-none hover:ring-1 hover:ring-[#54a4d9]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#54a4d9]"><span
                  className="font-medium leading-none text-white">{ userName?.[0] + (userName?.split('.')?.[1] ? userName?.split('.')?.[1]?.[0] : '') }</span></span>
              </Menu.Button>
            </div>
            <Transition
              as={ Fragment }
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 z-100 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  { ({ active }) => (
                    <a
                      href="#"
                      className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                    >
                      Report Problem
                    </a>
                  ) }
                </Menu.Item>
                <Menu.Item>
                  { ({ active }) => (
                    <a
                      onClick={ handleClick }
                      className={ classNames(active ? 'bg-gray-100' : '', 'flex-row block px-4 py-2 text-sm text-gray-700') }
                    >
                      { !isDarkMode && <div className="flex">
                        Toggle Theme <span style={ { fontSize: '15px' } }><MoonIcon width={ 18 }
                                                                                    height={ 18 } /></span></div> }
                      { isDarkMode && <>
                        Toggle Theme <span style={ { fontSize: '15px' } }>&#9728;</span> </> }
                    </a>
                  ) }
                </Menu.Item>
                <Menu.Item>
                  { ({ active }) => (
                    <a
                      onClick={ logout }
                      className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                    >
                      Sign out
                    </a>
                  ) }
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        { showEmailModal &&
        <EmailModal setShowEmailModal={ setShowEmailModal }
                    emailAddress={ emailAddress }
                    setEmailAddress={ setEmailAddress }
                    clientRequestParams={ clientRequestParams } /> }

      </div>
      <ProgressBar value={ progress } max={ 100 } />
    </>
  );
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

export default TopBar;

export const TopBarButtons = ({ getPDF, getPDFAndEmail, modal }) => {

  const { groupName, clientName } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className={ modal ? 'top-bar__left__buttons-modal' : 'top-bar__left__buttons' }>

      { (location?.pathname?.includes('chart') ||
        location?.pathname?.includes('setup') ||
        location?.pathname?.includes('report') ||
        location?.pathname?.includes('temperature')) &&
      <Button icon={ TABLE_LIST }
              tooltip={ RECOMMENDATION_LIST }
              onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) } /> }

      { !location?.pathname?.includes('dashboard') && !location?.pathname?.includes('setup') &&
      <Button icon={ FIELD_SETTINGS }
              tooltip={ FIELD_SETUP_STRING }
              onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`) } /> }

      { !location?.pathname?.includes('overview') && <>
        <Button icon={ PRINT_ICON }
                onClick={ getPDF }
                tooltip={ PRINT } />

        <Button icon={ EMAIL_RECOMMENDATIONS }
                onClick={ getPDFAndEmail }
                tooltip={ EMAIL } />


        <Button icon={ PROBES_MONITOR }
                tooltip={ PROBES_MONITOR_STRING }
                onClick={ () => {
                  dispatch(setClientMonitorProbesList([]));
                  history.push(Routes.MONITOR);
                } } />

        <Button icon={ WEATHER_STATION_ICON }
                tooltip={ WEATHER_STATION } />

        <Button icon={ MAPS_ICON }
                tooltip={ MAPS } />
      </> }

    </div>
  );
};
