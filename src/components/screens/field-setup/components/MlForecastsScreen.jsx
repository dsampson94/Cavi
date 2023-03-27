import React from 'react';

import {
  CLIENT_RECOMMENDATION_VIEW,
  EXISTING_STATIONS_CREATED,
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
  STEPS_TO_CREATE_A_NEW_STATION,
  USE_THIS_SECTION_TO_MAINTAIN
} from '../../../../tools/general/system-variables.util';

import { FieldSetupInputRow } from '../FieldSetupView.util';
import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const MlForecastsScreen = ({ mappedSetupList }) => {
  return (
    <div className="field-setup__scroll">
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

      <FieldSetupTable
        tableName={ CLIENT_RECOMMENDATION_VIEW }
        activeTableData={ [
          {
            forecastArea: '',
            GWSSerial: '',
            ['Nearest YR.no Forecast']: '',
            updated: ''
          }
        ] }
        hiddenColumns={ ['color'] }
      />
    </div>
  );
};
