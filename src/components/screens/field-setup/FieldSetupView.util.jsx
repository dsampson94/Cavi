import {
  AREA_REGION,
  CLIENT_NAME,
  CONSULTANT,
  CONTACT_EMAIL,
  CONTACT_PERSON,
  CONTACT_TELEPHONE,
  CREATED_BY,
  CREATED_ON,
  DATABASE_NAME,
  DELETE_DATABASE_HERE,
  INTERVAL_CODE_1_4G,
  INTERVAL_CODE_2_4G,
  INTERVAL_CODE_4_4G,
  INTERVAL_CODE_5_4G,
  INTERVAL_CODE_VALUES_4G,
  KML_FILE_FOR_MAPS,
  POSTAL_ADDRESS,
  REGISTERED_BUSINESS_NAME,
  SEND_ANALYSIS_REPORT_ON,
  SEND_ANALYSIS_REPORT_TO,
  SEND_INTERVAL_4G,
  SHOW_FROST_WARNINGS,
  SHOW_TRANSP_EVAP,
  TIME_ZOME,
  VAT_NUMBER,
  WARN_WHEN_VOLTS_BELOW,
  XERO_CLIENT_CODE
} from '../../../tools/general/system-variables.util';

import TextInput from '../../common/input/text/TextInput';

const ClientDetailsView = ({ mappedDetails }) => {

  return (
    <div className={ 'field-setup__client-details__list' }>
      <ClientDetailsInputRow label={ DATABASE_NAME }
                             value={ mappedDetails?.databaseName } />
      <ClientDetailsInputRow label={ CREATED_BY }
                             value={ mappedDetails?.createdBy } />
      <ClientDetailsInputRow label={ CREATED_ON }
                             value={ mappedDetails?.createdOn } />
      <ClientDetailsInputRow label={ CONSULTANT }
                             value={ mappedDetails?.consultant } />
      <ClientDetailsInputRow label={ CLIENT_NAME }
                             value={ mappedDetails?.clientName } />
      <ClientDetailsInputRow label={ REGISTERED_BUSINESS_NAME }
                             value={ mappedDetails?.registeredBusinessName } />
      <ClientDetailsInputRow label={ XERO_CLIENT_CODE }
                             value={ mappedDetails?.xeroClientCode } />
      <ClientDetailsInputRow label={ VAT_NUMBER }
                             value={ mappedDetails?.VATNumber } />
      <ClientDetailsInputRow label={ POSTAL_ADDRESS }
                             value={ mappedDetails?.postalAddress } />
      <ClientDetailsInputRow label={ CONTACT_PERSON }
                             value={ mappedDetails?.contactPerson } />
      <ClientDetailsInputRow label={ CONTACT_TELEPHONE }
                             value={ mappedDetails?.contactTelephone } />
      <ClientDetailsInputRow label={ CONTACT_EMAIL }
                             value={ mappedDetails?.contactEmail } />
      <ClientDetailsInputRow label={ AREA_REGION }
                             value={ mappedDetails?.['Area / Region'] } />
      <ClientDetailsInputRow label={ TIME_ZOME }
                             value={ mappedDetails?.timeZone } />
      <ClientDetailsInputRow label={ SEND_ANALYSIS_REPORT_ON }
                             value={ mappedDetails?.sendAnalysisReportOn } />
      <ClientDetailsInputRow label={ SEND_ANALYSIS_REPORT_TO }
                             value={ mappedDetails?.sendAnalysisReportTo } />
      <ClientDetailsInputRow label={ WARN_WHEN_VOLTS_BELOW }
                             value={ mappedDetails?.warnWhenVoltsBelow } />
      <ClientDetailsInputRow label={ SHOW_TRANSP_EVAP }
                             value={ mappedDetails?.showTransEvapForWeekWithRecommendations } />
      <ClientDetailsInputRow label={ SEND_INTERVAL_4G }
                             value={ mappedDetails?.['4GeeSendInterval'] } />
      <ClientDetailsInputRow label={ SHOW_FROST_WARNINGS }
                             value={ mappedDetails?.showFrostWarnings } />
      <div className={ 'field-setup__client-details__label' }>
        <ClientDetailsInputRow label={ INTERVAL_CODE_VALUES_4G }
                               onlyLabel />
        <ClientDetailsInputRow label={ INTERVAL_CODE_1_4G }
                               onlyLabel />
        <ClientDetailsInputRow label={ INTERVAL_CODE_2_4G }
                               onlyLabel />
        <ClientDetailsInputRow label={ INTERVAL_CODE_4_4G }
                               onlyLabel />
        <ClientDetailsInputRow label={ INTERVAL_CODE_5_4G }
                               onlyLabel />
        <ClientDetailsInputRow label={ KML_FILE_FOR_MAPS }
                               onlyLabel />
        <ClientDetailsInputRow label={ DELETE_DATABASE_HERE }
                               onlyLabel />
      </div>
    </div>
  );
};

export default ClientDetailsView;

const ClientDetailsInputRow = ({ label, value, placeholder, onlyLabel }) => {
  if (onlyLabel)
    return (
      <div>
        { label }
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
