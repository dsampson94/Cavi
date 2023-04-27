import React from 'react';
import { ToolTipAbsolute } from '../tool-tip/ToolTipAbsolute';
import { useDispatch } from 'react-redux';
import { SET_CLIENT_FIELD_WEATHER_DETAILS_LIST, SET_CLIENT_FIELD_WEATHER_FIRE_SPRAY_LIST, SET_CLIENT_FIELD_WEATHER_OBJECT_LIST } from '../../../redux/actions/client.action';

import { RiBaseStationFill } from 'react-icons/ri';
import { FaTemperatureLow } from 'react-icons/fa';

export const DashboardPopupScreen = ({ mappedWeatherList, handleWeatherStationClick }) => {

  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-1 h-full w-3/4 pr-3 md:w-[85%]">
      { mappedWeatherList?.map((weatherObj) => (
        <div key={ weatherObj?.key } className="flex border border-black dark:border-white cursor-pointer hover:-mt-0.5 text-white border-1 h-12 rounded-sm bg-gradient-to-b from-blue-400 to-blue-900"
             onClick={ () => {
               dispatch({ type: SET_CLIENT_FIELD_WEATHER_OBJECT_LIST, undefined });
               dispatch({ type: SET_CLIENT_FIELD_WEATHER_DETAILS_LIST, undefined });
               dispatch({ type: SET_CLIENT_FIELD_WEATHER_FIRE_SPRAY_LIST, undefined });
               handleWeatherStationClick(weatherObj);
             } }>

          <div className="w-[90%] mt-1.5">
            <ToolTipAbsolute text="Click for more Details">
              <h3 className="text-center text-xs ml-7 whitespace-nowrap">
                { weatherObj?.value?.displayname }
              </h3>
              <p className="text-center text-xs ml-7 whitespace-nowrap">
                { weatherObj?.value?.displaysummary }
              </p>
            </ToolTipAbsolute>
          </div>

          <div className="mt-1">
            { weatherObj?.value?.wsnaam &&
            <ToolTipAbsolute text="Weather Station">
              <RiBaseStationFill />
            </ToolTipAbsolute> }
          </div>

          <div className="mt-1">
            { !weatherObj?.value?.wsnaam &&
            <ToolTipAbsolute text="Temperatures">
              { <FaTemperatureLow className="w-3 h-4" /> }
            </ToolTipAbsolute> }
          </div>
        </div>
      )) }
    </div>
  );
};
