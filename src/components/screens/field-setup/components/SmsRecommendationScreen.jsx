import React from 'react';

import { FieldSetupInputRow } from '../FieldSetupView.util';
import { ADD_NEW_NUMBER_TO_RECEIVE, CLICK_BUTTON_TO_ADD, NOTE_BILLING_SMS, SMS_CONFIGURATION_FOR } from '../../../../tools/general/system-variables.util';

export const SmsRecommendationScreen = ({ mappedSetupList }) => {
  return (
    <div className="field-setup__scroll">
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
    </div>
  );
};
