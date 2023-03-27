import React from 'react';

import { FieldSetupTable } from '../../../common/table/FieldSetupTable';

export const ProbesDetailedScreen = ({ activeTableData, selectedIndex, setSelectedIndex, setActiveTableData }) => {

  const mappedProbeList = activeTableData?.forEach((field, index) => {
      let mappedProbeList = [];
      let currentProbeName = activeTableData?.[index]?.probe?.probe;
      let previousProbeName = activeTableData?.[index - 1]?.probe?.probe;

      if (currentProbeName !== previousProbeName) {
        mappedProbeList?.push(index, 0, {
          probe: { probe: `Field: ${ activeTableData?.[index]?.[''] }` },
          depthMMEnd: field?.depthMMEnd,
          VWK: field?.vwk,
          moistKoef: field?.mmkoef,
          tempKoef: field?.tkoef,
          tempKonst: field?.tkonst,
          ['']: field?.land
        });

        mappedProbeList?.push(index, 0, {
          probe: { probe: field?.probe },
          ['']: field?.land
        });
      }
    }
  );

  return (
    <div className="field-setup__scroll">
      <FieldSetupTable activeTableData={ mappedProbeList ? mappedProbeList : activeTableData }
                       hiddenColumns={ ['color'] }
                       selectedIndex={ selectedIndex }
                       setSelectedIndex={ setSelectedIndex }
                       setActiveTableData={ setActiveTableData }
      />
    </div>
  );
};
