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
  FIELD_SETUP,
  FIELD_TEMPERATURES,
  MAPS,
  MAPS_ICON,
  PRINT,
  PRINT_ICON,
  PROFILE_ICON,
  TOPBAR_OPTIONS,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';

import { daysFromToday } from '../../../tools/general/helpers.util';

import { requestClientPDF } from '../../../redux/actions/client.action';
import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import EmailModal from '../modal/EmailModal';
import DropDownButton from '../drop-down/DropDownButton';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestParams, mappedFieldList, view }) => {

  switch (view) {
    case CLIENT_FIELDS:
      return <ClientFieldsTopBar showSideBar={ showSideBar }
                                 setShowSideBar={ setShowSideBar }
                                 clientRequestParams={ clientRequestParams } />;

    case FIELD_CHARTS:
      return <FieldChartsTopBar clientRequestParams={ clientRequestParams }
                                mappedFieldList={ mappedFieldList } />;

    case FIELD_TEMPERATURES:
      return <FieldTemperaturesChartsTopBar clientRequestParams={ clientRequestParams } />;

    case FIELD_SETUP:
      return <FieldSetupTopBar />;
  }
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

export default TopBar;

const ClientFieldsTopBar = ({ showSideBar, setShowSideBar, clientRequestParams }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const { groupName, clientName } = useParams();

  const [emailAddress, setEmailAddress] = useState(undefined);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));

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
          <p onClick={ () => history.push('/overview') }>
            { 'IrriCheck Pulse' }
          </p>
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

          <Button label={ 'Field Setup' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/`) }
          />
          <Button label={ 'Probes Monitor' } />
          <Button icon={ WEATHER_STATION_ICON }
                  tooltip={ WEATHER_STATION } />
          <Button icon={ MAPS_ICON }
                  tooltip={ MAPS } />
        </div>
      </div>
      <div className="client-fields-top-bar__right">
        <TextInput placeholder={ 'Find Last Readings' }
                   topbar />

        <DropDownButton name={ PROFILE_ICON }
                        className={ 'client-fields-top-bar__right--menu' }
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
  );
};

ClientFieldsTopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

const FieldChartsTopBar = ({ clientRequestParams, mappedFieldList }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { groupName, clientName, fieldName } = useParams();

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));

  useEffect(() => {
    downloadPDF();
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
        <p onClick={ () => history.push('/overview') }>
          { 'IrriCheck Pulse' }
        </p>
      </div>
      <div className="field-charts-top-bar__lower">
        <Button icon={ PRINT_ICON }
                onClick={ getPDF }
                tooltip={ PRINT }
                spaced
                small />

        <Button label={ 'Other Farms' }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }
                spaced />

        <Button label={ 'Field Setup' }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-setup/`) }
                spaced />

        <Button label={ 'Probes Monitor' }
                spaced />

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

        <TextInput placeholder={ 'Last Readings' }
                   topbar />

        <DropDownButton name={ PROFILE_ICON }
                        className={ 'client-fields-top-bar__right--menu' }
                        fill={ '#53a5df' }
                        onLogOutClick={ () => logout() }
                        menu={ TOPBAR_OPTIONS }
                        profile
                        left />
      </div>
    </div>
  );
};

FieldChartsTopBar.propTypes = {
  clientRequestParams: shape({})
};

const FieldTemperaturesChartsTopBar = ({ clientRequestParams }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const [emailAddress, setEmailAddress] = useState(undefined);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const clientPDF = useSelector(createSelector([state => state.client], client => client?.clientPDF));

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

  const logout = () => {
    dispatch(requestLogout());
    history.push('/');
  };

  return (
    <div className="field-temperature-top-bar">
      <div className="field-temperature-top-bar__left">
        <div className="field-temperature-top-bar__left-header">
          <img src={ '/favicon-irricheck.ico' }
               alt={ 'icon' }
               height={ 14 } />
          <p onClick={ () => history.push('/overview') }>
            { 'IrriCheck Pulse' }
          </p>
        </div>
        <div className="field-temperature-top-bar__left-lower">
          <Button icon={ PRINT_ICON }
                  onClick={ getPDF }
                  tooltip={ PRINT } />
          <Button label={ 'Other Farms' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }
                  spaced />
          <Button label={ 'Moisture Graphs' } />
          <Button label={ 'Probes Monitor' } />
        </div>
      </div>
      <div className="field-temperature-top-bar__right">
        <TextInput placeholder={ 'Find Last Readings' }
                   topbar />

        <DropDownButton name={ PROFILE_ICON }
                        className={ 'client-fields-top-bar__right--menu' }
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
  );
};

FieldTemperaturesChartsTopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

const FieldSetupTopBar = ({}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const logout = () => {
    dispatch(requestLogout());
    history.push('/');
  };

  return (
    <div className="field-setup-top-bar">
      <div className="field-setup-top-bar__left">

        <div className="field-setup-top-bar__left-header">
          <img src={ '/favicon-irricheck.ico' }
               alt={ 'icon' }
               height={ 14 } />
          <p onClick={ () => history.push('/overview') }>
            { 'IrriCheck Pulse' }
          </p>
        </div>

        <div className="field-setup-top-bar__left-lower">

          <Button label={ 'Recommendations' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }
                  medium />

          <Button label={ 'Other Farms' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }`) }
                  medium />
        </div>
      </div>
      <div className="field-setup-top-bar__right">
        <TextInput placeholder={ 'Find Last Readings' }
                   topbar />

        <DropDownButton name={ PROFILE_ICON }
                        className={ 'client-fields-top-bar__right--menu' }
                        fill={ '#53a5df' }
                        onLogOutClick={ () => logout() }
                        menu={ TOPBAR_OPTIONS }
                        profile
                        left />
      </div>
    </div>
  );
};

FieldSetupTopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestParams: shape({})
};

