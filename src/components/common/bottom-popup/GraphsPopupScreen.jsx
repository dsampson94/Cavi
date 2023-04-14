import React, { useState } from 'react';
import { zoomIdentity } from 'd3';

import {
  ACTUAL_TEMPERATURE,
  ETO_FORECAST,
  ETO_WEATHER,
  ETO_WEATHER_STATION,
  FORECAST_TEMPERATURE,
  HUMIDITY_LINE,
  HUMIDITY_WEATHER,
  RAIN_LINE,
  RAIN_WEATHER,
  TEMP_WEATHER,
  WEATHER_POPUP_MULTILINE,
  WIND_WEATHER
} from '../../../tools/general/system-variables.util';

import WeatherPopupMultiLineChart from '../chart/chart/WeatherPopupMultiLineChart.d3';
import WeatherPopupBarAndLineChart from '../chart/chart/WeatherPopupBarAndLineChart.d3';

export const GraphsPopupScreen = ({
                                    // chartName,
                                    // chartType,
                                    // chartInfo,
                                    // hasXAxis,
                                    // recommendationOffset,
                                    // currentGlobalZoomState,
                                    // setCurrentGlobalZoomState,
                                    // currentYZoomState,
                                    // setCurrentYZoomState,
                                    // currentXZoomState,
                                    // setCurrentXZoomState,
                                    // hoverActive,
                                    // setHoverActive,
                                    // activeDataPeriod,
                                    // setActiveDataPeriod,
                                    // xAxisViewMode,
                                    // setXAxisViewMode,
                                    // date,
                                    // setDate,
                                    // showOnlyBars,
                                    activeLoadPeriod,
                                    activeProbeFactor,
                                    setActiveProbeFactor,
                                    activeExtendedChart,
                                    setActiveExtendedChart,
                                    mappedETOWeatherPopupChartList,
                                    mapActualForecastWeatherPopupChartList,
                                    mapHumidityWeatherPopupChartList,
                                    mapWindWeatherPopupChartList,
                                    mapRainWeatherPopupChartList
                                  }) => {

  const [showChartsSideBar, setShowChartsSideBar] = useState(true);
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const [hoverActive, setHoverActive] = useState(false);
  const [yAxisShared, setYAxisShared] = useState(false);
  const [date, setDate] = useState(null);
  const [activeDataPeriod, setActiveDataPeriod] = useState('All');
  const [xAxisViewMode, setXAxisViewMode] = useState('topBar');

  return (
    <div className="flex flex-col w-full pr-48">
      <WeatherPopupMultiLineChart chartName={ ETO_WEATHER }
                                  chartType={ WEATHER_POPUP_MULTILINE }
                                  data={ mappedETOWeatherPopupChartList }
                                  hoverActive={ hoverActive }
                                  setHoverActive={ setHoverActive }
                                  currentGlobalZoomState={ currentGlobalZoomState }
                                  setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                  currentYZoomState={ currentYZoomState }
                                  setCurrentYZoomState={ setCurrentYZoomState }
                                  currentXZoomState={ currentXZoomState }
                                  setCurrentXZoomState={ setCurrentXZoomState }
                                  activeLoadPeriod={ activeLoadPeriod }
                                  activeDataPeriod={ activeDataPeriod }
                                  setActiveDataPeriod={ setActiveDataPeriod }
                                  xAxisViewMode={ xAxisViewMode }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor }
                                  toggleInitialList={ [ETO_FORECAST, ETO_WEATHER_STATION] }
                                  date={ date }
                                  hasXAxis={ false }
                                  setDate={ setDate } />

      <WeatherPopupMultiLineChart chartName={ TEMP_WEATHER }
                                  chartType={ WEATHER_POPUP_MULTILINE }
                                  data={ mapActualForecastWeatherPopupChartList }
                                  hoverActive={ hoverActive }
                                  setHoverActive={ setHoverActive }
                                  currentGlobalZoomState={ currentGlobalZoomState }
                                  setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                  currentYZoomState={ currentYZoomState }
                                  setCurrentYZoomState={ setCurrentYZoomState }
                                  currentXZoomState={ currentXZoomState }
                                  setCurrentXZoomState={ setCurrentXZoomState }
                                  activeLoadPeriod={ activeLoadPeriod }
                                  activeDataPeriod={ activeDataPeriod }
                                  setActiveDataPeriod={ setActiveDataPeriod }
                                  xAxisViewMode={ xAxisViewMode }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor }
                                  toggleInitialList={ [ACTUAL_TEMPERATURE, FORECAST_TEMPERATURE] }
                                  date={ date }
                                  hasXAxis={ false }
                                  setDate={ setDate } />

      <WeatherPopupMultiLineChart chartName={ HUMIDITY_WEATHER }
                                  chartType={ WEATHER_POPUP_MULTILINE }
                                  data={ mapHumidityWeatherPopupChartList }
                                  hoverActive={ hoverActive }
                                  setHoverActive={ setHoverActive }
                                  currentGlobalZoomState={ currentGlobalZoomState }
                                  setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                  currentYZoomState={ currentYZoomState }
                                  setCurrentYZoomState={ setCurrentYZoomState }
                                  currentXZoomState={ currentXZoomState }
                                  setCurrentXZoomState={ setCurrentXZoomState }
                                  activeLoadPeriod={ activeLoadPeriod }
                                  activeDataPeriod={ activeDataPeriod }
                                  setActiveDataPeriod={ setActiveDataPeriod }
                                  xAxisViewMode={ xAxisViewMode }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor }
                                  toggleInitialList={ [RAIN_LINE, HUMIDITY_LINE] }
                                  date={ date }
                                  hasXAxis={ false }
                                  setDate={ setDate } />

      <WeatherPopupBarAndLineChart chartName={ WIND_WEATHER }
                                   chartType={ WEATHER_POPUP_MULTILINE }
                                   data={ mapWindWeatherPopupChartList?.[0] }
                                   hoverActive={ hoverActive }
                                   setHoverActive={ setHoverActive }
                                   currentGlobalZoomState={ currentGlobalZoomState }
                                   setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                   currentYZoomState={ currentYZoomState }
                                   setCurrentYZoomState={ setCurrentYZoomState }
                                   currentXZoomState={ currentXZoomState }
                                   setCurrentXZoomState={ setCurrentXZoomState }
                                   activeLoadPeriod={ activeLoadPeriod }
                                   activeDataPeriod={ activeDataPeriod }
                                   setActiveDataPeriod={ setActiveDataPeriod }
                                   xAxisViewMode={ xAxisViewMode }
                                   setXAxisViewMode={ setXAxisViewMode }
                                   activeProbeFactor={ activeProbeFactor }
                                   setActiveProbeFactor={ setActiveProbeFactor }
                                   activeExtendedChart={ activeExtendedChart }
                                   setActiveExtendedChart={ setActiveExtendedChart }
                                   date={ date }
                                   setDate={ setDate }
                                   showOnlyBars />

      <WeatherPopupBarAndLineChart chartName={ RAIN_WEATHER }
                                   chartType={ WEATHER_POPUP_MULTILINE }
                                   data={ mapRainWeatherPopupChartList?.[1] }
                                   hoverActive={ hoverActive }
                                   setHoverActive={ setHoverActive }
                                   currentGlobalZoomState={ currentGlobalZoomState }
                                   setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                   currentYZoomState={ currentYZoomState }
                                   setCurrentYZoomState={ setCurrentYZoomState }
                                   currentXZoomState={ currentXZoomState }
                                   setCurrentXZoomState={ setCurrentXZoomState }
                                   activeLoadPeriod={ activeLoadPeriod }
                                   activeDataPeriod={ activeDataPeriod }
                                   setActiveDataPeriod={ setActiveDataPeriod }
                                   xAxisViewMode={ xAxisViewMode }
                                   setXAxisViewMode={ setXAxisViewMode }
                                   activeProbeFactor={ activeProbeFactor }
                                   setActiveProbeFactor={ setActiveProbeFactor }
                                   activeExtendedChart={ activeExtendedChart }
                                   setActiveExtendedChart={ setActiveExtendedChart }
                                   date={ date }
                                   setDate={ setDate }
                                   hasXAxis={ true }
                                   showOnlyBars />

    </div>
  );
};
