import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

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
  PROFILE_ICON,
  RECOMMENDATION_LIST,
  TABLE_LIST,
  TOPBAR_OPTIONS,
  VIEW_SIDEBAR,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';
import { capitalize } from '../../../tools/general/helpers.util';
import { saveUserLoginToLocalStorage } from '../../../tools/storage/localStorage';

import { requestClientPDF, setClientMonitorProbesList } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import EmailModal from '../modal/EmailModal';
import DropDownButton from '../drop-down/drop-down-button/DropDownButton';
import Graphic from '../graphic/Graphic';
import logo from '../../../tools/images/pulselogo.png';
import ProgressBar from '../loader/progress-bar/ProgressBar';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestParams, mappedFieldList, setActiveFieldName }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { fieldName, groupName, clientName, probeNumber } = useParams();

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

          <DropDownButton name={ PROFILE_ICON }
                          className={ 'top-bar__right--menu' }
                          fill={ '#53a5df' }
                          onLogOutClick={ () => logout() }
                          menu={ TOPBAR_OPTIONS }
                          getPDF={ getPDF }
                          getPDFAndEmail={ getPDFAndEmail }
                          profile
                          tall
                          left />
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
