import React from 'react';

import { FieldSetupInputRow } from '../FieldSetupView.util';
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
} from '../../../../tools/general/system-variables.util';

export const ClientDetailsScreen = ({ mappedSetupList }) => {
  return (
    <div className="field-setup__scroll">
      <div className={ 'field-setup__client-details__list' }>
        <FieldSetupInputRow label={ DATABASE_NAME }
                            value={ mappedSetupList?.[0]?.databaseName } />
        <FieldSetupInputRow label={ CREATED_BY }
                            value={ mappedSetupList?.[0]?.createdBy } />
        <FieldSetupInputRow label={ CREATED_ON }
                            value={ mappedSetupList?.[0]?.createdOn } />
        <FieldSetupInputRow label={ CONSULTANT }
                            value={ mappedSetupList?.[0]?.consultant } />
        <FieldSetupInputRow label={ CLIENT_NAME }
                            value={ mappedSetupList?.[0]?.clientName } />
        <FieldSetupInputRow label={ REGISTERED_BUSINESS_NAME }
                            value={ mappedSetupList?.[0]?.registeredBusinessName } />
        <FieldSetupInputRow label={ XERO_CLIENT_CODE }
                            value={ mappedSetupList?.[0]?.xeroClientCode } />
        <FieldSetupInputRow label={ VAT_NUMBER }
                            value={ mappedSetupList?.[0]?.VATNumber } />
        <FieldSetupInputRow label={ POSTAL_ADDRESS }
                            value={ mappedSetupList?.[0]?.postalAddress } />
        <FieldSetupInputRow label={ CONTACT_PERSON }
                            value={ mappedSetupList?.[0]?.contactPerson } />
        <FieldSetupInputRow label={ CONTACT_TELEPHONE }
                            value={ mappedSetupList?.[0]?.contactTelephone } />
        <FieldSetupInputRow label={ CONTACT_EMAIL }
                            value={ mappedSetupList?.[0]?.contactEmail } />
        <FieldSetupInputRow label={ AREA_REGION }
                            value={ mappedSetupList?.[0]?.['Area / Region'] } />
        <FieldSetupInputRow label={ TIME_ZOME }
                            value={ mappedSetupList?.[0]?.timeZone } />
        <FieldSetupInputRow label={ SEND_ANALYSIS_REPORT_ON }
                            value={ mappedSetupList?.[0]?.sendAnalysisReportOn } />
        <FieldSetupInputRow label={ SEND_ANALYSIS_REPORT_TO }
                            value={ mappedSetupList?.[0]?.sendAnalysisReportTo } />
        <FieldSetupInputRow label={ WARN_WHEN_VOLTS_BELOW }
                            value={ mappedSetupList?.[0]?.warnWhenVoltsBelow } />
        <FieldSetupInputRow label={ SHOW_TRANSP_EVAP }
                            value={ mappedSetupList?.[0]?.showTransEvapForWeekWithRecommendations } />
        <FieldSetupInputRow label={ SEND_INTERVAL_4G }
                            value={ mappedSetupList?.[0]?.['4GeeSendInterval'] } />
        <FieldSetupInputRow label={ SHOW_FROST_WARNINGS }
                            value={ mappedSetupList?.[0]?.showFrostWarnings } />
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
    </div>
  );
};
