import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { bool, func, shape } from 'prop-types';

import {
  EMAIL,
  EMAIL_RECOMMENDATIONS,
  LOG_OUT,
  LOG_OUT_ICON,
  MAPS,
  MAPS_ICON,
  PRINT,
  PRINT_ICON,
  REPORT_PROBLEM,
  REPORT_PROBLEM_ICON,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';

import { requestClientPDF } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import EmailModal from '../modal/EmailModal';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestFields }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [emailAddress, setEmailAddress] = useState(undefined);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));

  useEffect(() => {
    if (!emailAddress) {
      downloadPDF();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientPDF]);

  const downloadPDF = () => {
    if (!clientRequestFields) return;
    if (!clientPDF) return;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(clientPDF);
    link.download = `Irricheck Recommendations ${ clientRequestFields.clientname }`;
    link.click();
  };

  const getPDF = () => {
    if (clientRequestFields)
      dispatch(requestClientPDF(clientRequestFields));
  };

  const getPDFAndEmail = () => {
    setShowEmailModal(true);
  };

  const logout = () => {
    dispatch(requestLogout());
    history.push('/');
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__text">
          <img src={ '/favicon-irricheck.ico' }
               alt={ 'icon' }
               height={ 20 } />
          IrriCheck Pulse
        </div>
        <div className="top-bar__lower-left">
          <Button icon={ PRINT_ICON }
                  onClick={ getPDF }
                  tooltip={ PRINT } />
          <Button icon={ EMAIL_RECOMMENDATIONS }
                  onClick={ getPDFAndEmail }
                  tooltip={ EMAIL } />
          <Button label={ 'Other Farm' }
                  onClick={ () => setShowSideBar(!showSideBar) } />
          <Button label={ 'Field Setup' } />
          <Button icon={ WEATHER_STATION_ICON }
                  tooltip={ WEATHER_STATION } />
          <Button icon={ MAPS_ICON }
                  tooltip={ MAPS } />
        </div>
      </div>
      <div className="top-bar__right">
        <ThemeToggle />
        <Button label={ 'Probes Monitor' } />
        <Button icon={ REPORT_PROBLEM_ICON }
                tooltip={ REPORT_PROBLEM } />
        <TextInput placeholder={ 'Find Last Readings' } />
        <Button icon={ LOG_OUT_ICON }
                tooltip={ LOG_OUT }
                onClick={ logout }
                leftAlignedTooltip />
      </div>

      { showEmailModal &&
        <EmailModal setShowEmailModal={ setShowEmailModal }
                    emailAddress={ emailAddress }
                    setEmailAddress={ setEmailAddress }
                    clientRequestFields={ clientRequestFields } /> }
    </div>
  );
};

TopBar.propTypes = {
  showSideBar: bool.isRequired,
  setShowSideBar: func.isRequired,
  clientRequestFields: shape({})
};

export default TopBar;
