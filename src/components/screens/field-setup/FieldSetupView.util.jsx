import React from 'react';

import {
  ADD_FIELD_ROUTE,
  ADD_NEW_FIELD_TODB,
  ADD_NEW_NUMBER_TO_RECEIVE,
  ADD_NEW_SPLIT_VALVE,
  ADD_NEW_USER_LOGIN_TO_RECEIVE,
  ADD_WARNING,
  AREA_REGION,
  CHART_ACTIVE_PERIOD,
  CLICK_BUTTON_TO_ADD,
  CLIENT_DETAILS_HEADER,
  CLIENT_DETAILS_ROUTE,
  CLIENT_NAME,
  CLIENT_NAME_HEADER,
  CLIENT_RECOMMENDATION_VIEW,
  CLIENT_WAS_CREATED_ON_PULSE,
  CONSULTANT,
  CONTACT_AREA_HEADER,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HEADER,
  CONTACT_PERSON,
  CONTACT_TELEPHONE,
  COPY_TIP,
  CREATED_BY,
  CREATED_ON,
  CROP,
  DATABASE_NAME,
  DELETE_DATABASE_HERE,
  DOUBLE_DROPDOWN,
  EXISTING_STATIONS_CREATED,
  FIELD_NAME,
  FIELD_SETUP_VIEW,
  FIELDS_SPLIT_ROUTE,
  FORECAST_AREA,
  HARVEST_DATE,
  INTERVAL_CODE_1_4G,
  INTERVAL_CODE_2_4G,
  INTERVAL_CODE_4_4G,
  INTERVAL_CODE_5_4G,
  INTERVAL_CODE_VALUES_4G,
  IRRIGATION_SYSTEM,
  KML_FILE_FOR_MAPS,
  LENGTH,
  ML_FORECASTS_ROUTE,
  NOTE_BILLING_SMS,
  NOTE_IMPORTANT_PUSH,
  NOTE_IMPORTANT_SMS,
  NOTE_IRRICHECK,
  NOTE_NOTIFICATIONS,
  ONLY_ADMINS_CAN_EDIT,
  PLANT_DATE,
  POSTAL_ADDRESS,
  PROBE_NUMBER,
  PROBES_DETAILED_ROUTE,
  PUSH_WARNING_ROUTE,
  REGISTERED_BUSINESS_NAME,
  SEND_ANALYSIS_REPORT_ON,
  SEND_ANALYSIS_REPORT_TO,
  SEND_INTERVAL_4G,
  SHOW_FROST_WARNINGS,
  SHOW_TRANSP_EVAP,
  SMS_CONFIGURATION_FOR,
  SMS_RECOMMENDATION_ROUTE,
  SMS_WARNING_ROUTE,
  SMS_WARNINGS_FOR,
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
  STEPS_TO_CREATE_A_NEW_STATION,
  THT_WARNINGS_FOR,
  TIME_ZOME,
  USE_THIS_SECTION_TO_MAINTAIN,
  USERS_ROUTE,
  USERS_WITH_ACCESS_TO,
  VAT_NUMBER,
  WARN_WHEN_VOLTS_BELOW,
  XERO_CLIENT_CODE
} from '../../../tools/general/system-variables.util';

import TextInput from '../../common/input/text/TextInput';
import Button from '../../common/button/Button';
import Table from '../../common/table/Table';
import DropDownButton from '../../common/drop-down/drop-down-button/DropDownButton';

import './field-setup-view.scss';

export const ActiveScreen = ({
                               activeScreen,
                               mappedSetupList,
                               mappedDropdownList,
                               activeTableData,
                               selectedIndex,
                               setSelectedIndex,
                               setActiveTableData,
                               updateFieldDetails,
                               setUpdatedFieldList,
                               valueToUpdate,
                               setValueToUpdate
                             }) => {
  switch (activeScreen) {
    case SMS_WARNING_ROUTE:
      return <>
        <FieldSetupSMSWarningsView mappedDetails={ mappedSetupList?.[0] } />
        <div className="field-setup__scroll">
          <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
                 activeTableData={ [{
                   fieldName: '',
                   probe: '',
                   pulseLogin: '',
                   sensor: '',
                   ['Above / Below']: '',
                   value: '',
                   minutesBetweenWarnings: '',
                   lastWarningSent: ''
                 }] }
                 hiddenColumns={ ['color'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>
      </>;

    case PUSH_WARNING_ROUTE:
      return <>
        <FieldSetupPushWarningsView mappedDetails={ mappedSetupList?.[0] } />
        <div className="field-setup__scroll">
          <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
                 activeTableData={ [{
                   fieldName: '',
                   probe: '',
                   pulseLogin: '',
                   sensor: '',
                   ['Above / Below']: '',
                   value: '',
                   minutesBetweenWarnings: '',
                   lastWarningSent: ''
                 }] }
                 hiddenColumns={ ['color'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>
      </>;

    case FIELDS_SPLIT_ROUTE:
      return <>
        <FieldSetupSplitValveView mappedDetails={ mappedSetupList?.[0] } />
        <div className="field-setup__scroll">
          <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
                 activeTableData={ [{
                   fieldName: '',
                   probe: '',
                   splitValve: '',
                   hectare: ''
                 }] }
                 hiddenColumns={ ['color'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>
      </>;

    case ADD_FIELD_ROUTE:
      return <>
        <FieldSetupCreateNewFieldView mappedDetails={ mappedSetupList?.[0] } />
      </>;

    case CLIENT_DETAILS_ROUTE:
      return <div className="field-setup__scroll">
        <ClientDetailsView mappedDetails={ mappedSetupList?.[0] } />
      </div>;

    case USERS_ROUTE:
      return <div className="field-setup__scroll">
        <ClientDetailsUsersView mappedDetails={ mappedSetupList?.[0] } />
      </div>;

    case SMS_RECOMMENDATION_ROUTE:
      return <div className="field-setup__scroll">
        <ClientDetailsSMSRecommendationsView mappedDetails={ mappedSetupList?.[0] } />
      </div>;

    case ML_FORECASTS_ROUTE:
      return <div className="field-setup__scroll">
        <AdvancedForecastView mappedDetails={ mappedSetupList?.[0] } />
        <Table tableName={ CLIENT_RECOMMENDATION_VIEW }
               activeTableData={ [{
                 forecastArea: '',
                 GWSSerial: '',
                 ['Nearest YR.no Forecast']: '',
                 updated: ''
               }] }
               hiddenColumns={ ['color'] }
               selectedIndex={ selectedIndex }
               setSelectedIndex={ setSelectedIndex }
               setActiveTableData={ setActiveTableData } />
      </div>;

    case PROBES_DETAILED_ROUTE:
      const mappedProbeList = activeTableData?.forEach((field, index) => {
          let mappedProbeList = [];
          let currentProbeName = activeTableData?.[index]?.probe?.probe;
          let previousProbeName = activeTableData?.[index - 1]?.probe?.probe;

          if (currentProbeName !== previousProbeName) {
            mappedProbeList?.push(index, 0, {
              probe: { probe: `Field: ${ activeTableData?.[index]?.[''] }` },
              depthMMEnd: field?.depthMMEnd,
              VWK: field?.vwk,
              moistKoef: field?.mmkoef,
              tempKoef: field?.tkoef,
              tempKonst: field?.tkonst,
              ['']: field?.land
            });

            mappedProbeList?.push(index, 0, {
              probe: { probe: field?.probe },
              ['']: field?.land
            });
          }
        }
      );

      return <div className="field-setup__scroll">
        <Table tableName={ FIELD_SETUP_VIEW }
               activeTableData={ mappedProbeList ? mappedProbeList : activeTableData }
               hiddenColumns={ ['color'] }
               selectedIndex={ selectedIndex }
               setSelectedIndex={ setSelectedIndex }
               setActiveTableData={ setActiveTableData } />
      </div>;

    default:
      return <div className="field-setup__scroll">
        <Table tableName={ FIELD_SETUP_VIEW }
               activeTableData={ activeTableData }
               mappedDropdownList={ mappedDropdownList }
               hiddenColumns={ ['color'] }
               selectedIndex={ selectedIndex }
               setSelectedIndex={ setSelectedIndex }
               setActiveTableData={ setActiveTableData }
               updateFieldDetails={ updateFieldDetails }
               setUpdatedFieldList={ setUpdatedFieldList }
               valueToUpdate={ valueToUpdate }
               setValueToUpdate={ setValueToUpdate } />
      </div>;
  }
};


export const ClientDetailsView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__client-details__list' }>
      <FieldSetupInputRow label={ DATABASE_NAME }
                          value={ mappedDetails?.databaseName } />
      <FieldSetupInputRow label={ CREATED_BY }
                          value={ mappedDetails?.createdBy } />
      <FieldSetupInputRow label={ CREATED_ON }
                          value={ mappedDetails?.createdOn } />
      <FieldSetupInputRow label={ CONSULTANT }
                          value={ mappedDetails?.consultant } />
      <FieldSetupInputRow label={ CLIENT_NAME }
                          value={ mappedDetails?.clientName } />
      <FieldSetupInputRow label={ REGISTERED_BUSINESS_NAME }
                          value={ mappedDetails?.registeredBusinessName } />
      <FieldSetupInputRow label={ XERO_CLIENT_CODE }
                          value={ mappedDetails?.xeroClientCode } />
      <FieldSetupInputRow label={ VAT_NUMBER }
                          value={ mappedDetails?.VATNumber } />
      <FieldSetupInputRow label={ POSTAL_ADDRESS }
                          value={ mappedDetails?.postalAddress } />
      <FieldSetupInputRow label={ CONTACT_PERSON }
                          value={ mappedDetails?.contactPerson } />
      <FieldSetupInputRow label={ CONTACT_TELEPHONE }
                          value={ mappedDetails?.contactTelephone } />
      <FieldSetupInputRow label={ CONTACT_EMAIL }
                          value={ mappedDetails?.contactEmail } />
      <FieldSetupInputRow label={ AREA_REGION }
                          value={ mappedDetails?.['Area / Region'] } />
      <FieldSetupInputRow label={ TIME_ZOME }
                          value={ mappedDetails?.timeZone } />
      <FieldSetupInputRow label={ SEND_ANALYSIS_REPORT_ON }
                          value={ mappedDetails?.sendAnalysisReportOn } />
      <FieldSetupInputRow label={ SEND_ANALYSIS_REPORT_TO }
                          value={ mappedDetails?.sendAnalysisReportTo } />
      <FieldSetupInputRow label={ WARN_WHEN_VOLTS_BELOW }
                          value={ mappedDetails?.warnWhenVoltsBelow } />
      <FieldSetupInputRow label={ SHOW_TRANSP_EVAP }
                          value={ mappedDetails?.showTransEvapForWeekWithRecommendations } />
      <FieldSetupInputRow label={ SEND_INTERVAL_4G }
                          value={ mappedDetails?.['4GeeSendInterval'] } />
      <FieldSetupInputRow label={ SHOW_FROST_WARNINGS }
                          value={ mappedDetails?.showFrostWarnings } />
      <FieldSetupInputRow label={ INTERVAL_CODE_VALUES_4G }
                          onlyLabel />
      <FieldSetupInputRow label={ INTERVAL_CODE_1_4G }
                          onlyLabel />
      <FieldSetupInputRow label={ INTERVAL_CODE_2_4G }
                          onlyLabel />
      <FieldSetupInputRow label={ INTERVAL_CODE_4_4G }
                          onlyLabel />
      <FieldSetupInputRow label={ INTERVAL_CODE_5_4G }
                          onlyLabel />
      <FieldSetupInputRow label={ KML_FILE_FOR_MAPS }
                          onlyLabel />
      <FieldSetupInputRow label={ DELETE_DATABASE_HERE }
                          onlyLabel />
    </div>
  );
};

export const FieldSetupSMSWarningsView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ ADD_NEW_NUMBER_TO_RECEIVE }
                          onlyLabel />
      <FieldSetupInputRow label={ ADD_WARNING }
                          addWarning
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_IRRICHECK }
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_NOTIFICATIONS }
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_IMPORTANT_SMS }
                          onlyLabel />
      <FieldSetupInputRow label={ SMS_WARNINGS_FOR }
                          onlyLabel />
    </div>
  );
};

export const FieldSetupPushWarningsView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ ADD_NEW_USER_LOGIN_TO_RECEIVE }
                          onlyLabel />
      <FieldSetupInputRow label={ ADD_WARNING }
                          addWarning
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_NOTIFICATIONS }
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_IMPORTANT_PUSH }
                          onlyLabel />
      <FieldSetupInputRow label={ THT_WARNINGS_FOR }
                          onlyLabel />
    </div>
  );
};

export const FieldSetupSplitValveView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ ADD_NEW_SPLIT_VALVE }
                          addWarning
                          onlyLabel />
    </div>
  );
};

export const FieldSetupCreateNewFieldView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ ADD_NEW_FIELD_TODB } onlyLabel />
      <FieldSetupInputRow label={ COPY_TIP } onlyLabel />
      <FieldSetupInputRow label={ FIELD_NAME } />
      <FieldSetupInputRow label={ FORECAST_AREA } />
      <FieldSetupInputRow label={ CROP } />
      <FieldSetupInputRow label={ PLANT_DATE } />
      <FieldSetupInputRow label={ HARVEST_DATE } />
      <FieldSetupInputRow label={ IRRIGATION_SYSTEM } />
      <FieldSetupInputRow label={ PROBE_NUMBER } />
      <FieldSetupInputRow label={ LENGTH } />
      <div className={ 'field-setup__scroll__button-container' }>
        <Button label={ 'Create Field' } />
      </div>
    </div>
  );
};

export const ClientDetailsUsersView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ USERS_WITH_ACCESS_TO }
                          onlyLabel />
      <FieldSetupInputRow label={ ONLY_ADMINS_CAN_EDIT }
                          onlyLabel />
      <FieldSetupInputRow label={ CLIENT_DETAILS_HEADER }
                          onlyLabel />
      <FieldSetupInputRow label={ CLIENT_NAME_HEADER }
                          onlyLabel />
      <FieldSetupInputRow label={ CONTACT_EMAIL_HEADER }
                          onlyLabel />
      <FieldSetupInputRow label={ CONTACT_AREA_HEADER }
                          onlyLabel />
      <FieldSetupInputRow label={ CLIENT_WAS_CREATED_ON_PULSE }
                          onlyLabel />
    </div>
  );
};

export const ClientDetailsSMSRecommendationsView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ SMS_CONFIGURATION_FOR }
                          onlyLabel />
      <FieldSetupInputRow label={ ADD_NEW_NUMBER_TO_RECEIVE }
                          onlyLabel />
      <FieldSetupInputRow label={ CLICK_BUTTON_TO_ADD }
                          addWarning
                          onlyLabel />
      <FieldSetupInputRow label={ NOTE_BILLING_SMS }
                          onlyLabel />
    </div>
  );
};

export const AdvancedForecastView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__scroll__list' }>
      <FieldSetupInputRow label={ USE_THIS_SECTION_TO_MAINTAIN }
                          onlyLabel />
      <FieldSetupInputRow label={ STEPS_TO_CREATE_A_NEW_STATION }
                          onlyLabel />
      <FieldSetupInputRow label={ STEP_1 }
                          onlyLabel />
      <FieldSetupInputRow label={ STEP_2 }
                          onlyLabel />
      <FieldSetupInputRow label={ STEP_3 }
                          onlyLabel />
      <FieldSetupInputRow label={ STEP_4 }
                          onlyLabel />
      <FieldSetupInputRow label={ STEP_5 }
                          onlyLabel />
      <FieldSetupInputRow label={ EXISTING_STATIONS_CREATED }
                          onlyLabel />
    </div>
  );
};

const FieldSetupInputRow = ({ label, value, placeholder, onlyLabel, addWarning }) => {
  if (onlyLabel && !addWarning)
    return (
      <div className={ 'field-setup__scroll__list__item' }>
        { label }
      </div>
    );
  else if (onlyLabel && addWarning)
    return (
      <div className={ 'field-setup__scroll__list__item' }>
        <div className={ 'field-setup__scroll__list__item--centered' }>{ label }</div>
        <div className="field-setup__scroll-tool-container">

          <DropDownButton name={ DOUBLE_DROPDOWN }
                          menu={ CHART_ACTIVE_PERIOD }
                          className={ 'field-setup__scroll-icon-container' }
                          fill={ 'white' }
                          tall
                          period />

          <TextInput select />
        </div>
        <div className={ 'field-setup__scroll__list__item__button-container' }>
          <Button label={ 'Add' } add />
        </div>
      </div>
    );
  else
    return (
      <TextInput label={ label }
                 value={ value }
                 placeholder={ placeholder }
                 centered
                 left />
    );
};

const checkForFirstProbe = (index, tableList) => {
  const currentProbe = tableList[index]?.probe;
  const previousProbe = tableList[index - 1]?.probe;
  return currentProbe !== previousProbe;
};
