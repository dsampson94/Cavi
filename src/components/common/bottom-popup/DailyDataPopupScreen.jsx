import React from 'react';

import { DailyDataTable } from '../table/DailyDataTable';

export const DailyDataPopupScreen = ({ mappedDailyDataList, setActiveTab, onWeatherPopupDailyDataDetailClick }) => {

  return (
    <div className="flex flex-col h-full w-full pr-48">
      <div>
        <h3 className="text-center mb-2 font-bold"></h3>
      </div>

      <div className="overflow-scroll">
        <DailyDataTable activeTableData={ mappedDailyDataList }
                        hiddenColumns={ [] }
                        setActiveTab={ setActiveTab }
                        onWeatherPopupDailyDataDetailClick={ onWeatherPopupDailyDataDetailClick }
        />
      </div>
    </div>
  );
};
