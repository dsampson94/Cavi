import React from 'react';

import { FIELD_SETUP_VIEW } from '../../../../tools/general/system-variables.util';

import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const ProbesSummaryScreen = ({
                                      activeTableData,
                                      mappedDropdownList,
                                      selectedIndex,
                                      setSelectedIndex,
                                      setActiveTableData,
                                      updateFieldDetails,
                                      setUpdatedFieldList,
                                      valueToUpdate,
                                      setValueToUpdate,
                                      setSelectedFieldName,
                                      setSelectedProbeNumber
                                    }) => {
  return (
    <div className="field-setup__scroll">
      <FieldSetupTable
        tableName={ FIELD_SETUP_VIEW }
        activeTableData={ activeTableData }
        mappedDropdownList={ mappedDropdownList }
        hiddenColumns={ ['color'] }
        selectedIndex={ selectedIndex }
        setSelectedIndex={ setSelectedIndex }
        setActiveTableData={ setActiveTableData }
        updateFieldDetails={ updateFieldDetails }
        setUpdatedFieldList={ setUpdatedFieldList }
        valueToUpdate={ valueToUpdate }
        setValueToUpdate={ setValueToUpdate }
        setSelectedFieldName={ setSelectedFieldName }
        setSelectedProbeNumber={ setSelectedProbeNumber }
      />
    </div>
  );
};
