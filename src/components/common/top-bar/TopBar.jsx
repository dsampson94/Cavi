import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { bool, func, shape } from 'prop-types';

import {
  CLIENT_FIELDS,
  EMAIL,
  EMAIL_RECOMMENDATIONS,
  FIELD_CHARTS,
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
import { daysFromToday } from '../../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import { requestClientPDF } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import EmailModal from '../modal/EmailModal';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestFields, mappedFieldList, view }) => {
  switch (view) {
    case CLIENT_FIELDS:
      return <ClientFieldsTopBar showSideBar={ showSideBar }
                                 setShowSideBar={ setShowSideBar }
                                 clientRequestFields={ clientRequestFields } />;
    case FIELD_CHARTS:
      return <FieldChartsTopBar clientRequestFields={ clientRequestFields }
                                mappedFieldList={ mappedFieldList } />;
  }
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestFields: shape({})
};

export default TopBar;

const ClientFieldsTopBar = ({ showSideBar, setShowSideBar, clientRequestFields }) => {

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
    <div className="client-fields-top-bar">
      <div className="client-fields-top-bar__left">
        <div className="client-fields-top-bar__left-header">
          <img src={ '/favicon-irricheck.ico' }
               alt={ 'icon' }
               height={ 14 } />
          <p>{ 'IrriCheck Pulse' }</p>
        </div>
        <div className="client-fields-top-bar__left-lower">
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
      <div className="client-fields-top-bar__right">
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

ClientFieldsTopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestFields: shape({})
};

const FieldChartsTopBar = ({ clientRequestFields, mappedFieldList }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { groupName, clientName, fieldName } = useParams();

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode] = useState(!(getTheme === 'dark'));

  useEffect(() => {
    if (getTheme === 'dark') return document.body.classList.add('dark-mode');
  }, [isDarkMode]);

  useEffect(() => {
    downloadPDF();
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

  const logout = () => {
    dispatch(requestLogout());
    history.push('/');
  };

  const getTopBarValue = () => {
    const recommendations = [];
    mappedFieldList?.forEach(item => {
      if (fieldName === item.fieldName.locationName) {
        recommendations.push(item.fieldName.recommend1);
        recommendations.push(item.fieldName.recommend2);
        recommendations.push(item.fieldName.recommend3);
        recommendations.push(item.fieldName.recommend4);
        recommendations.push(item.fieldName.recommend5);
        recommendations.push(item.fieldName.recommend6);
        recommendations.push(item.fieldName.recommend7);
        recommendations.push(item.fieldName.recommend8);
      }
    });
    return recommendations;
  };

  return (
    <div className="field-charts-top-bar">
      <div className="field-charts-top-bar__header">
        <img src={ '/favicon-irricheck.ico' }
             alt={ 'icon' }
             height={ 14 } />
        <p>{ 'IrriCheck Pulse' }</p>
      </div>
      <div className="field-charts-top-bar__lower">
        <Button icon={ PRINT_ICON }
                onClick={ getPDF }
                tooltip={ PRINT }
                spaced
                small />
        <Button label={ 'Recommendations' }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }
                spaced />
        <Button label={ 'Field Setup' } spaced />
        <Button label={ 'Temperatures' } spaced />

        <Button label={ daysFromToday(0) }
                lowerLabel={ getTopBarValue()[0] } datebar />
        <Button label={ daysFromToday(1) }
                lowerLabel={ getTopBarValue()[1] } datebar />
        <Button label={ daysFromToday(2) }
                lowerLabel={ getTopBarValue()[2] } datebar />
        <Button label={ daysFromToday(3) }
                lowerLabel={ getTopBarValue()[3] } datebar />
        <Button label={ daysFromToday(4) }
                lowerLabel={ getTopBarValue()[4] } datebar />
        <Button label={ daysFromToday(5) }
                lowerLabel={ getTopBarValue()[5] } datebar />
        <Button label={ daysFromToday(6) }
                lowerLabel={ getTopBarValue()[6] } datebar />
        <Button label={ daysFromToday(7) }
                lowerLabel={ getTopBarValue()[7] } datebar spaced />

        <Button label={ 'Probes Monitor' }
                spaced />
        <Button icon={ REPORT_PROBLEM_ICON }
                tooltip={ REPORT_PROBLEM }
                spaced />
        <TextInput placeholder={ 'Last Readings' } />
        <Button icon={ LOG_OUT_ICON }
                tooltip={ LOG_OUT }
                onClick={ logout }
                leftAlignedTooltip
                spaced />
      </div>
    </div>
  );
};

FieldChartsTopBar.propTypes = {
  clientRequestFields: shape({})
};
