import React from 'react';

import { LAST_READINGS_VIEW } from '../../../tools/general/system-variables.util';

import { DailyDataTable } from '../table/DailyDataTable';

export const DailyDataPopupScreen = ({ mappedDailyDataList }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full w-3/4 pr-3 md:w-full">
      <DailyDataTable tableName={ LAST_READINGS_VIEW }
                      activeTableData={ mappedDailyDataList }
                      hiddenColumns={ [] }
        // selectedIndex={ selectedIndex }
        // setSelectedIndex={ setSelectedIndex }
      />
    </div>
  );
};
