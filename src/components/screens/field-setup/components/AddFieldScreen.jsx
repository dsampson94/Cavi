import React from 'react';
import { ADD_NEW_FIELD_TODB, COPY_TIP, CROP, FIELD_NAME, FORECAST_AREA, HARVEST_DATE, IRRIGATION_SYSTEM, LENGTH, PLANT_DATE, PROBE_NUMBER } from '../../../../tools/general/system-variables.util';
import { FieldSetupInputRow } from '../FieldSetupView.util';

import Button from '../../../common/button/Button';

export const AddFieldScreen = ({ mappedSetupList }) => {
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
