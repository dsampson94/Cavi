import React from 'react';
import { TEMPERATURE_MULTILINE } from '../../../tools/general/system-variables.util';

import TemperaturesLineChartD3 from '../../common/chart/client-field/TemperaturesLineChart.d3';

export const TemperatureChartsContainer = ({
                                             mappedTemperaturesList,
                                             hoverActive,
                                             setHoverActive,
                                             currentGlobalZoomState,
                                             setCurrentGlobalZoomState,
                                             currentYZoomState,
                                             setCurrentYZoomState,
                                             currentXZoomState,
                                             setCurrentXZoomState,
                                             activeLoadPeriod,
                                             activeDataPeriod,
                                             setActiveDataPeriod,
                                             xAxisViewMode,
                                             setXAxisViewMode,
                                             activeProbeFactor,
                                             setActiveProbeFactor,
                                             date,
                                             setDate
                                           }) => {

  if (!mappedTemperaturesList) return null;

  return (
    <div className="field-temperatures__whole">
      <TemperaturesLineChartD3 chartName={ TEMPERATURE_MULTILINE }
                               chartType={ TEMPERATURE_MULTILINE }
                               data={ mappedTemperaturesList }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               hasXAxis={ true }
                               activeLoadPeriod={ activeLoadPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               xAxisViewMode={ xAxisViewMode }
                               setXAxisViewMode={ setXAxisViewMode }
                               activeProbeFactor={ activeProbeFactor }
                               setActiveProbeFactor={ setActiveProbeFactor }
                               date={ date }
                               setDate={ setDate } />

      <TemperaturesLineChartD3 chartName={ TEMPERATURE_MULTILINE }
                               chartType={ TEMPERATURE_MULTILINE }
                               data={ mappedTemperaturesList }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               hasXAxis={ true }
                               activeLoadPeriod={ activeLoadPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               xAxisViewMode={ xAxisViewMode }
                               setXAxisViewMode={ setXAxisViewMode }
                               activeProbeFactor={ activeProbeFactor }
                               setActiveProbeFactor={ setActiveProbeFactor }
                               date={ date }
                               setDate={ setDate } />

      <TemperaturesLineChartD3 chartName={ TEMPERATURE_MULTILINE }
                               chartType={ TEMPERATURE_MULTILINE }
                               data={ mappedTemperaturesList }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               hasXAxis={ true }
                               activeLoadPeriod={ activeLoadPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               xAxisViewMode={ xAxisViewMode }
                               setXAxisViewMode={ setXAxisViewMode }
                               activeProbeFactor={ activeProbeFactor }
                               setActiveProbeFactor={ setActiveProbeFactor }
                               date={ date }
                               setDate={ setDate } />
    </div>
  );
};

TemperatureChartsContainer.propTypes = {};
