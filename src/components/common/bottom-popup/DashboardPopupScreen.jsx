import React from 'react';
import { ToolTipAbsolute } from '../tool-tip/ToolTipAbsolute';

export const DashboardPopupScreen = ({ mappedWeatherList }) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full w-3/4 pr-3 md:w-full">
      { mappedWeatherList?.map((weatherObj) => (
        <div key={ weatherObj?.key } className="border border-black cursor-pointer text-white border-2 h-12 rounded-md bg-gradient-to-br from-blue-400 to-blue-800">
          <ToolTipAbsolute text="Click for more Details">
            <h3 className="text-center text-sm pt-0.5 whitespace-nowrap">
              { weatherObj?.value?.displayname }
            </h3>
            <p className="text-center text-sm whitespace-nowrap">
              { weatherObj?.value?.displaysummary }
            </p>
          </ToolTipAbsolute>

        </div>
      )) }
    </div>
  );
};
