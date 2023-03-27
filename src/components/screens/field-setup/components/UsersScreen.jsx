import React from 'react';

import { FieldSetupInputRow } from '../FieldSetupView.util';
import {
  CLIENT_DETAILS_HEADER,
  CLIENT_NAME_HEADER,
  CLIENT_WAS_CREATED_ON_PULSE,
  CONTACT_AREA_HEADER,
  CONTACT_EMAIL_HEADER,
  ONLY_ADMINS_CAN_EDIT,
  USERS_WITH_ACCESS_TO
} from '../../../../tools/general/system-variables.util';

export const UsersScreen = ({ mappedSetupList }) => {
  return (
    <div className="field-setup__scroll">
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
    </div>
  );
};
