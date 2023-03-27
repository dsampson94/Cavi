import React from 'react';

import { ADD_NEW_SPLIT_VALVE, CLIENT_RECOMMENDATION_VIEW } from '../../../../tools/general/system-variables.util';
import { FieldSetupInputRow } from '../FieldSetupView.util';

import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const FieldsSplitScreen = ({ mappedSetupList }) => {
  return (
    <>
      <div className={ 'field-setup__scroll__list' }>
        <FieldSetupInputRow label={ ADD_NEW_SPLIT_VALVE }
                            addWarning
                            onlyLabel />
      </div>

      <div className="field-setup__scroll">
        <FieldSetupTable
          tableName={ CLIENT_RECOMMENDATION_VIEW }
          activeTableData={ [
            {
              fieldName: '',
              probe: '',
              splitValve: '',
              hectare: ''
            }
          ] }
          hiddenColumns={ ['color'] }
        />
      </div>
    </>
  );
};
