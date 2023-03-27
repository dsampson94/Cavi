import React from 'react';

import { ADD_NEW_USER_LOGIN_TO_RECEIVE, ADD_WARNING, CLIENT_RECOMMENDATION_VIEW, NOTE_IMPORTANT_PUSH, NOTE_NOTIFICATIONS, THT_WARNINGS_FOR } from '../../../../tools/general/system-variables.util';
import { FieldSetupInputRow } from '../FieldSetupView.util';

import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const PushWarningScreen = ({ mappedSetupList }) => {
  return (
    <>
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

      <div className="field-setup__scroll">
        <FieldSetupTable
          tableName={ CLIENT_RECOMMENDATION_VIEW }
          activeTableData={ [
            {
              fieldName: '',
              probe: '',
              pulseLogin: '',
              sensor: '',
              ['Above / Below']: '',
              value: '',
              minutesBetweenWarnings: '',
              lastWarningSent: ''
            }
          ] }
          hiddenColumns={ ['color'] }
        />
      </div>
    </>
  );
};
