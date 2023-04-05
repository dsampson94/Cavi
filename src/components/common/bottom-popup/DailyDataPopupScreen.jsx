import React from 'react';

import { LAST_READINGS_VIEW } from '../../../tools/general/system-variables.util';

import { DailyDataTable } from '../table/DailyDataTable';

export const DailyDataPopupScreen = ({ mappedDailyDataList, setActiveTab }) => {
  return (
    <div className="flex -full w-full overflow-scroll pr-48">
      <DailyDataTable tableName={ LAST_READINGS_VIEW }
                      activeTableData={ mappedDailyDataList }
                      hiddenColumns={ [] }
                      setActiveTab={ setActiveTab }
        // selectedIndex={ selectedIndex }
        // setSelectedIndex={ setSelectedIndex }
      />
    </div>
  );
};
