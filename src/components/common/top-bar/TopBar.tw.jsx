import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  Cog8ToothIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  FolderArrowDownIcon,
  ListBulletIcon,
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  MoonIcon,
  SignalIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaThermometerHalf } from 'react-icons/fa';
import { VscGraphLine } from 'react-icons/vsc';

import { bool, func, shape } from 'prop-types';
import { Routes } from '../../../routes';
import { Menu, Popover, Transition } from '@headlessui/react';

import { GENERAL_ROUTE, OTHER_FARM, VIEW_SIDEBAR } from '../../../tools/general/system-variables.util';
import { retrieveActiveThemeFromLocalStorage, retrieveUserLoginFromLocalStorage, saveActiveThemeToLocalStorage, saveUserLoginToLocalStorage } from '../../../tools/storage/localStorage';

import { requestClientPDF, setClientMonitorProbesList } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';
import { SET_THEME } from '../../../redux/actions/system.action';

import Button from '../button/Button';
import EmailModal from '../modal/EmailModal';
import Graphic from '../graphic/Graphic';
import logo from '../../../tools/images/pulselogo.png';
import ProgressBar from '../loader/progress-bar/ProgressBar';
import BreadCrumbsTw from '../bread-crumbs/BreadCrumbs.tw';

import './top-bar.scss';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TopBar = ({ showSideBar, setShowSideBar, clientRequestParams, mappedFieldList, setActiveFieldName }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const popoverRef = useRef(null);

  const { fieldName, groupName, clientName, probeNumber } = useParams();

  const userName = retrieveUserLoginFromLocalStorage()?.username?.toUpperCase();
  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode, setIsDarkMode] = useState(!(getTheme === 'dark'));
  const [isOpen, setIsOpen] = useState(false);

  const [emailAddress, setEmailAddress] = useState(undefined);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));
  const progress = useSelector(createSelector([state => state.system], system => system?.progressBar));

  useEffect(() => {
    if (getTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDarkModeClick = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      saveActiveThemeToLocalStorage('dark');
      dispatch({ type: SET_THEME, theme: 'dark' });
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      saveActiveThemeToLocalStorage('light');
      dispatch({ type: SET_THEME, theme: 'light' });
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

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

  const dropDownList = () => {
    switch (true) {
      case location.pathname.includes('chart'):
        return [
          {
            name: 'Recommendations',
            description: 'View Recommendations List',
            href: `/client/${ groupName }/${ clientName }`,
            icon: ListBulletIcon
          },
          {
            name: 'Temperatures',
            description: 'View Temperatures Charts',
            href: `/client/${ groupName }/${ clientName }/field-temperatures/${ probeNumber }/${ fieldName }`,
            icon: FaThermometerHalf
          },
          {
            name: 'Monitor Probes',
            description: 'Monitor Probes',
            href: Routes.MONITOR,
            icon: SignalIcon,
            onClick: () => dispatch(setClientMonitorProbesList([]))
          },
          {
            name: 'Field Setup',
            description: 'Field Setup',
            href: `/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`,
            icon: Cog8ToothIcon
          }
        ];
      case location.pathname.includes('report'):
      case location.pathname.includes('temperature'):
        return [
          {
            name: 'Recommendations',
            description: 'View Recommendations List',
            href: `/client/${ groupName }/${ clientName }`,
            icon: ListBulletIcon
          },
          {
            name: 'Moisture Charts',
            description: 'View Moisture Charts',
            href: `/client/${ groupName }/${ clientName }/field-charts/${ probeNumber }/${ fieldName }`,
            icon: VscGraphLine
          },
          {
            name: 'Monitor Probes',
            description: 'Monitor Probes',
            href: Routes.MONITOR,
            icon: SignalIcon,
            onClick: () => dispatch(setClientMonitorProbesList([]))
          },
          {
            name: 'Field Setup',
            description: 'Field Setup',
            href: `/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`,
            icon: Cog8ToothIcon
          }
        ];
      case location.pathname.includes('setup'):
        return [
          {
            name: 'Recommendations',
            description: 'View Recommendations List',
            href: `/client/${ groupName }/${ clientName }`,
            icon: ListBulletIcon
          },
          {
            name: 'Monitor Probes',
            description: 'Monitor Probes',
            href: Routes.MONITOR,
            icon: SignalIcon,
            onClick: () => dispatch(setClientMonitorProbesList([]))
          },
          {
            name: 'Find Last Readings',
            description: 'Find Last Readings',
            href: Routes.LAST_READINGS,
            icon: MagnifyingGlassCircleIcon
          }
        ];
      case !location?.pathname?.includes('dashboard') && !location?.pathname?.includes('setup'):
        return [
          {
            name: 'Download',
            description: 'Download Recommendations List',
            icon: FolderArrowDownIcon,
            onClick: getPDF
          },
          {
            name: 'Email',
            description: 'Email Recommendations',
            icon: EnvelopeIcon,
            onClick: getPDFAndEmail
          },
          {
            name: 'Show Archives',
            description: 'Show Archives',
            icon: ArchiveBoxIcon
          },
          {
            name: 'Previous Recommendations',
            description: 'Show Previous Recommendations',
            icon: ArrowUturnLeftIcon
          },
          {
            name: 'Reports',
            description: 'Show Reports',
            icon: DocumentTextIcon
          },
          {
            name: 'Accuracy Analysis',
            description: 'Download Accuracy Analysis',
            icon: DocumentArrowDownIcon
          },
          {
            name: 'Maps',
            description: 'Maps',
            icon: MapPinIcon
          },
          {
            name: 'Field Setup',
            description: 'Field Setup',
            href: `/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`,
            icon: Cog8ToothIcon
          }
        ];
      default:
        return [{
          name: 'Find Last Readings',
          description: 'Find Last Readings',
          href: Routes.LAST_READINGS,
          icon: MagnifyingGlassCircleIcon
        },
          {
            name: 'Monitor Probes',
            description: 'Monitor Probes',
            href: Routes.MONITOR,
            icon: SignalIcon,
            onClick: () => dispatch(setClientMonitorProbesList([]))
          }
        ];
    }
  };

  const handleDropDownClick = (event, item) => {
    if (item.onClick) item?.onClick();
    if (item.href) history.push(item?.href);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">

          <div className="top-bar__left__divider">

            <Graphic graphic={ logo }
                     topbar
                     onClick={ () => {
                       history.push('/dashboard/overview');
                       setShowSideBar(true);
                     } } />

            <Button icon={ VIEW_SIDEBAR }
                    tooltip={ OTHER_FARM }
                    onClick={ () => setShowSideBar(!showSideBar) }
            />
          </div>

          <BreadCrumbsTw groupName={ groupName }
                         clientName={ clientName }
                         fieldName={ fieldName }
                         probeNumber={ probeNumber }
                         history={ history }
                         location={ location }
                         isDarkMode={ isDarkMode }
                         viewClient={ viewClient } />

        </div>

        <div className={ 'top-bar__right' }>

          <Popover.Group className="flex">

            <Popover className="relative mt-0.5 cursor-pointer">

              <Popover.Button
                className={ classNames('flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 transition duration-100',
                  ` ${ isOpen ? 'transform rotate-90' : 'transform rotate-0' }`) }
                onClick={ () => setIsOpen(!isOpen) }>

                <div type="button"
                     className="rounded-full p-2 text-[#54a4d9]">
                  <ChevronDownIcon
                    className={ 'h-7 w-7' }
                    aria-hidden="true"
                  />
                </div>
              </Popover.Button>

              <Transition
                as={ Fragment }
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  ref={ popoverRef }
                  className={ classNames(isDarkMode ? 'bg-white' : 'bg-gray-700',
                    'absolute -right-12 top-full z-100 mt-3 w-screen max-w-sm overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-900/5') }>
                  <div className="p-3">
                    { dropDownList()?.map((item) => (
                      <div key={ item.name }
                           className={ classNames(isDarkMode ? 'hover:bg-gray-200' : 'hover:bg-gray-600',
                             'group relative flex items-center gap-x-6 rounded-lg p-1 text-sm leading-6') }>

                        <div className={ classNames(isDarkMode ? 'bg-gray-100' : 'bg-gray-800',
                          'flex h-11 w-11 flex-none items-center justify-center rounded-lg') }>
                          <item.icon className="h-6 w-6 text-[#54a4d9] group-hover:text-[#54a4d9]" aria-hidden="true" />
                        </div>

                        <div className="flex-auto">
                          <a onClick={ (event) => handleDropDownClick(event, item) }
                             className={ classNames(isDarkMode ? 'text-gray-700' : 'text-gray-200', 'block font-semibold') }>
                            { item.name }
                            <span className="absolute inset-0" />
                          </a>

                          <p className="mt-1 text-gray-500">{ item.description }</p>
                          { item.component && <p className="mt-1 text-gray-600">{ item.component }</p> }
                        </div>
                      </div>
                    )) }
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>

          <Menu as="div" className="relative mt-0.5 pr-2 cursor-pointer">
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
                className={ classNames(isDarkMode ? 'bg-white' : 'bg-gray-700',
                  'absolute right-0 z-100 mt-2 mr-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none') }>
                <Menu.Item>
                  { ({ active }) => (
                    <a
                      href="#"
                      className={ classNames(isDarkMode ? active ? 'bg-gray-100' : '' : 'text-white hover:bg-gray-600', 'block px-4 py-2 text-sm text-gray-700') }
                    >
                      Report Problem
                    </a>
                  ) }
                </Menu.Item>
                <Menu.Item>
                  { ({ active }) => (
                    <a
                      onClick={ handleDarkModeClick }
                      className={ classNames(isDarkMode ? active ? 'bg-gray-100' : '' : 'text-white hover:bg-gray-600', 'block px-4 py-2 text-sm text-gray-700') }
                    >
                      { !isDarkMode && <div className="flex">
                        Toggle Theme <span style={ { fontSize: '15px', marginLeft: '5px' } }><MoonIcon width={ 18 }
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
                      className={ classNames(isDarkMode ? active ? 'bg-gray-100' : '' : 'text-white hover:bg-gray-600', 'block px-4 py-2 text-sm text-gray-700') }
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
