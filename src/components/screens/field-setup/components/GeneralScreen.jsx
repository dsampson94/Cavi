import React from 'react';

import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const GeneralScreen = ({
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
