import React from 'react';
import { WeatherPopupLineChart } from '../chart/chart/WeatherPopupLineChart';
import { WeatherPopupBarChart } from '../chart/chart/WeatherPopupBarChart';
import Compass from '../compass/Compass';

export const UnitPopupScreen = ({ mappedWeatherList2, mappedRainfallList, mappedCurrentDashboardData }) => {

  console.log(mappedCurrentDashboardData);
  return (
    <div className="grid grid-cols-1 pr-48 lg:pr-0 overflow-y-auto overflow-x-hidden h-full xl:grid-cols-3 lg:w-[80%] gap-4 w-[95%]">

      <div className="flex flex-col items-center justify-center w-[90%]">
        <h1 className="text-xl font-bold pl-20 whitespace-nowrap">Past 48 Hours</h1>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <WeatherPopupLineChart height={ 330 }
                                   lines={ [
                                     { data: mappedWeatherList2?.temperatureLineList, dataKey: 'Temperature', color: 'red' },
                                     { data: mappedWeatherList2?.radiationLineList, dataKey: 'Radiation', color: 'orange' },
                                     { data: mappedWeatherList2?.humidityLineList, dataKey: 'Humidity', color: 'blue' },
                                     { data: mappedWeatherList2?.dewLineList, dataKey: 'Dew Point', color: 'lightblue' }
                                   ] } />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-[90%] pr-12 mt-6">

        <h1 className="text-xl font-bold justify-center ml-28 whitespace-nowrap">Current Conditions</h1>
        <p className="flex justify-center ml-28 mb-10">{ mappedCurrentDashboardData?.date }</p>

        <div className=" flex flex-row h-3/4 w-fit pl-24">
          <div className="flex flex-col w-fit whitespace-nowrap">
            <div className="">Temperature</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.temp24 } C</div>
            <div className="">Radiation</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.radiation } mj</div>
            <div className="">Humidity</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.humidity } %</div>
          </div>

          <div className="flex flex-col w-full h-full -mt-6">
            <div className="border border-orange-500 h-48 bg-transparent flex items-center justify-center font-bold rounded-full" style={ { width: '160px', height: '160px' } }>
              <div className="flex flex-col items-center">
                <span>Current</span>
                <span className="font-bold text-xl">{ mappedWeatherList2?.latestData?.[0]?.temp1 }</span>
                <span className="font-bold text-xl">{ mappedWeatherList2?.latestData?.[0]?.wind1 }</span>
                <span className="font-bold text-lg">{ mappedCurrentDashboardData?.windDirection }</span>
              </div>
            </div>
            <div className="flex justify-center items-center translate-y-2">
              <Compass direction={ mappedCurrentDashboardData?.windDirection } />
            </div>
          </div>

          <div className="flex flex-col w-fit whitespace-nowrap pl-6 text-right">
            <div className="">1 hour</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.rain1 } mm</div>
            <div className="">24 hour</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.rain24 } mm</div>
            <div className="">1 week</div>
            <div className="font-bold">{ mappedCurrentDashboardData?.rain7 } mm</div>
          </div>

        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-[80%] lg:pl-20 lg:-pr-0">
        <h1 className="text-xl font-bold whitespace-nowrap">Annual Rainfall Comparison</h1>
        <div className="flex flex-col">
          <div className="h-1/2 items-center justify-center">
            <WeatherPopupBarChart data={ mappedRainfallList } />
          </div>
        </div>
      </div>
    </div>
  );
};
