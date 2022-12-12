import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { bool, func, shape } from 'prop-types';

import {
  EMAIL,
  EMAIL_RECOMMENDATIONS,
  GENERAL_ROUTE,
  MAPS,
  MAPS_ICON,
  PRINT,
  PRINT_ICON,
  PROFILE_ICON,
  TOPBAR_OPTIONS,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';
import { saveUserLoginToLocalStorage } from '../../../tools/storage/localStorage';

import { requestClientPDF } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import EmailModal from '../modal/EmailModal';
import DropDownButton from '../drop-down/drop-down-button/DropDownButton';
import Graphic from '../graphic/Graphic';
import logo from '../../../tools/images/pulselogo.png';
import ProgressBar from '../loader/progress-bar/ProgressBar';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestParams, mappedFieldList, view }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { groupName, clientName } = useParams();

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

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__left">
          <div className="top-bar__left__header">
            <Graphic onClick={ () => history.push('/dashboard/overview') } topbar graphic={ logo } />
          </div>
          <div className="top-bar__left__buttons">
            <Button icon={ PRINT_ICON }
                    onClick={ getPDF }
                    tooltip={ PRINT } />

            <Button icon={ EMAIL_RECOMMENDATIONS }
                    onClick={ getPDFAndEmail }
                    tooltip={ EMAIL } />

            <Button label={ 'Other Farm' }
                    onClick={ () => setShowSideBar(!showSideBar) } />

            { !location?.pathname?.includes('dashboard') &&
            <Button label={ 'Field Setup' }
                    onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/${ GENERAL_ROUTE }`) } /> }
            <Button label={ 'Probes Monitor' } />
            <Button icon={ WEATHER_STATION_ICON }
                    tooltip={ WEATHER_STATION } />
            <Button icon={ MAPS_ICON }
                    tooltip={ MAPS } />
          </div>
        </div>

        <div className="top-bar__right">
          <TextInput placeholder={ 'Find Last Readings' }
                     topbar />

          <DropDownButton name={ PROFILE_ICON }
                          className={ 'top-bar__right--menu' }
                          fill={ '#53a5df' }
                          onLogOutClick={ () => logout() }
                          menu={ TOPBAR_OPTIONS }
                          profile
                          left />
        </div>

        { showEmailModal &&
        <EmailModal setShowEmailModal={ setShowEmailModal }
                    emailAddress={ emailAddress }
                    setEmailAddress={ setEmailAddress }
                    clientRequestParams={ clientRequestParams } /> }

      </div>
      <ProgressBar value={ progress } />
    </>
  );
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

export default TopBar;
