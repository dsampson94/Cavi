import React from 'react';

import { DailyDataTable } from '../table/DailyDataTable';

export const DailyDataPopupScreen = ({ mappedDailyDataList, setActiveTab, onWeatherPopupDailyDataDetailClick }) => {

  return (
    <div className="flex -full w-full overflow-scroll pr-48">
      <DailyDataTable activeTableData={ mappedDailyDataList }
                      hiddenColumns={ [] }
                      setActiveTab={ setActiveTab }
                      onWeatherPopupDailyDataDetailClick={ onWeatherPopupDailyDataDetailClick }
      />
    </div>
  );
};
