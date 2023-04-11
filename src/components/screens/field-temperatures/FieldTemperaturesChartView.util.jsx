import React from 'react';
import {
  CANOPY_LINE,
  CANOPY_OUTSIDE_TEMPERATURE,
  HUMIDITY_LINE,
  LINE_100MM,
  LINE_200MM,
  LINE_300MM,
  LINE_400MM,
  LINE_600MM,
  LINE_800MM,
  OUTSIDE_LINE,
  RAIN_HUMIDITY,
  RAIN_LINE,
  SOIL_TEMPERATURE,
  TEMPERATURE_MULTILINE
} from '../../../tools/general/system-variables.util';

import TemperatureMultiLineChart from '../../common/chart/chart/TemperatureMultiLineChart.d3';

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
      <TemperatureMultiLineChart chartName={ SOIL_TEMPERATURE }
                                 chartType={ TEMPERATURE_MULTILINE }
                                 data={ [mappedTemperaturesList?.[0], mappedTemperaturesList?.[1], mappedTemperaturesList?.[2],
                                   mappedTemperaturesList?.[3], mappedTemperaturesList?.[4], mappedTemperaturesList?.[5]] }
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
                                 toggleInitialList={ [LINE_100MM, LINE_200MM, LINE_300MM, LINE_400MM, LINE_600MM, LINE_800MM] }
                                 date={ date }
                                 hasXAxis={ true }
                                 setDate={ setDate } />

      <TemperatureMultiLineChart chartName={ CANOPY_OUTSIDE_TEMPERATURE }
                                 chartType={ TEMPERATURE_MULTILINE }
                                 data={ [mappedTemperaturesList?.[6], mappedTemperaturesList?.[7]] }
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
                                 toggleInitialList={ [CANOPY_LINE, OUTSIDE_LINE] }
                                 date={ date }
                                 hasXAxis={ true }
                                 setDate={ setDate } />

      <TemperatureMultiLineChart chartName={ RAIN_HUMIDITY }
                                 chartType={ TEMPERATURE_MULTILINE }
                                 data={ [mappedTemperaturesList?.[8], mappedTemperaturesList?.[9]] }
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
                                 toggleInitialList={ [RAIN_LINE, HUMIDITY_LINE] }
                                 date={ date }
                                 setDate={ setDate } />
    </div>
  );
};

TemperatureChartsContainer.propTypes = {};
