import React from 'react';
import { WeatherPopupLineChart } from '../chart/chart/WeatherPopupLineChart';
import { WeatherPopupBarChart } from '../chart/chart/WeatherPopupBarChart';

export const UnitPopupScreen = ({ mappedWeatherList2 }) => {

  return (
    <div className="flex flex-col md:flex-row overflow-auto">

      <div className="flex flex-col items-center justify-between w-full xl:w-1/4 md:w-1/2">
        <h1 className="text-2xl">Temperature</h1>
        <div className="flex flex-col h-3/4">
          <div className="border border-orange-500 bg-transparent flex items-center justify-center font-bold rounded-full"
               style={ { width: '200px', height: '200px' } }>
            <div className="flex flex-col items-center">
              <span>Current</span>
              <span className="font-bold text-3xl">{ mappedWeatherList2?.latestData?.[0]?.temp1 }</span>
              <span>°C</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full xl:w-1/4 md:w-1/2 ">
        <h1 className="text-2xl pl-20">Past 48 Hours</h1>
        <div className="flex flex-col">
          <div className="h-1/2 w-fit flex  items-center justify-center">
            <WeatherPopupLineChart height={ 190 }
                                   lines={ [
                                     { data: mappedWeatherList2?.temperatureLineList, dataKey: 'Temperature', color: 'blue' }
                                   ] } />
          </div>
          <div className="h-1/2 w-fit items-center justify-center">
            <WeatherPopupLineChart height={ 160 }
                                   lines={ [
                                     { data: mappedWeatherList2?.radiationLineList, dataKey: 'Radiation', color: 'blue' },
                                     { data: mappedWeatherList2?.humidityLineList, dataKey: 'Humidity', color: 'red' }
                                   ] } />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between w-full xl:w-1/4 md:w-1/2">

        <h1 className="text-2xl pl-20">Wind</h1>

        <div className=" flex flex-row h-3/4 w-fit pl-24">
          <div className="flex flex-col w-fit whitespace-nowrap">
            <div className="">Temperature</div>
            <div className="">-</div>
            <div className="">Radiation</div>
            <div className="">-</div>
            <div className="">Humidity</div>
            <div className="">-</div>
          </div>

          <div className="border border-orange-500 bg-transparent flex mb-16 items-center justify-center font-bold rounded-full"
               style={ { width: '200px', height: '200px' } }>
            <div className="flex flex-col items-center">
              <span>Current</span>
              <span className="font-bold text-3xl">{ mappedWeatherList2?.latestData?.[0]?.wind1 }</span>
              <span></span>
            </div>
          </div>

          <div className="flex flex-col w-fit whitespace-nowrap pl-6 text-right">
            <div className="">1 hour</div>
            <div className="">-</div>
            <div className="">24 hour</div>
            <div className="">-</div>
            <div className="">1 week</div>
            <div className="">-</div>
          </div>

        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <h1 className="text-2xl">Rainfall</h1>
        <div className="flex flex-col">
          <div className="h-1/2 w-fit items-center justify-center">
            <WeatherPopupBarChart height={ 180 } />
          </div>
        </div>
      </div>

    </div>
  );
};
