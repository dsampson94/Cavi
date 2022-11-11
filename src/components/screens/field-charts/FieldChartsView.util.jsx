import React from 'react';

import {
  ACTUAL_IRRIGATION,
  AGGREGATE,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  DAILY,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_100MM,
  DEFICIT_200MM,
  DEFICIT_300MM,
  DEFICIT_400MM,
  DEFICIT_600MM,
  DEFICIT_800MM,
  DEFICIT_ETO,
  EC,
  EXTENDED,
  FLOW_DAILY,
  FLOW_HOURLY,
  VOLT_READINGS,
  VPD
} from '../../../tools/general/system-variables.util';

import FieldLineChartD3 from '../../common/chart/client-field/FieldLineChart.d3';
import FieldBarAndLineChart from '../../common/chart/client-field/FIeldBarAndLineChart.d3';

export const DeficitChartsContainer = ({
                                         mappedChartList,
                                         hoverActive,
                                         setHoverActive,
                                         currentGlobalZoomState,
                                         setCurrentGlobalZoomState,
                                         currentYZoomState,
                                         setCurrentYZoomState,
                                         currentXZoomState,
                                         setCurrentXZoomState,
                                         yAxisShared,
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

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__left">
      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_100MM }
                        data={ mappedChartList?.[0] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][1] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_200MM }
                        data={ mappedChartList?.[1] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][2] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_300MM }
                        data={ mappedChartList?.[2] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][3] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_400MM }
                        data={ mappedChartList?.[3] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][4] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_600MM }
                        data={ mappedChartList?.[4] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][5] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_800MM }
                        data={ mappedChartList?.[5] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][6] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        activeProbeFactor={ activeProbeFactor }
                        setActiveProbeFactor={ setActiveProbeFactor }
                        date={ date }
                        setDate={ setDate }
                        hasXAxis />
    </div>
  );
};

DeficitChartsContainer.propTypes = {};

export const AggregateChartsContainer = ({
                                           mappedChartList,
                                           mappedVoltChartList,
                                           mappedFlowMeterDailyChartList,
                                           mappedFlowMeterHourlyList,
                                           mappedECChartList,
                                           mappedVPDChartList,
                                           mappedActualChartList,
                                           hoverActive,
                                           setHoverActive,
                                           currentGlobalZoomState,
                                           setCurrentGlobalZoomState,
                                           currentYZoomState,
                                           setCurrentYZoomState,
                                           currentXZoomState,
                                           setCurrentXZoomState,
                                           yAxisShared,
                                           activeLoadPeriod,
                                           activeDataPeriod,
                                           setActiveDataPeriod,
                                           xAxisViewMode,
                                           setXAxisViewMode,
                                           activeProbeFactor,
                                           setActiveProbeFactor,
                                           activeExtendedChart,
                                           setActiveExtendedChart,
                                           showChartsModal,
                                           setShowChartsModal,
                                           date,
                                           setDate
                                         }) => {

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__right">
      <div className="field-chart__right__top">
        <FieldLineChartD3 chartType={ AGGREGATE }
                          chartName={ AGGREGATE_TOP_SOIL }
                          data={ mappedChartList?.[6] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          chartInfo={ AGGREGATE_TOP_SOIL.slice(10) }
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[6]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          sharedYScaleData={ mappedChartList?.[6] }
                          yAxisShared={ yAxisShared }
                          activeLoadPeriod={ activeLoadPeriod }
                          activeDataPeriod={ activeDataPeriod }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          xAxisViewMode={ xAxisViewMode }
                          setXAxisViewMode={ setXAxisViewMode }
                          activeProbeFactor={ activeProbeFactor }
                          setActiveProbeFactor={ setActiveProbeFactor }
                          showChartsModal={ showChartsModal }
                          setShowChartsModal={ setShowChartsModal }
                          date={ date }
                          setDate={ setDate } />

        <FieldLineChartD3 chartType={ AGGREGATE }
                          chartName={ AGGREGATE_BOTTOM_SOIL }
                          data={ mappedChartList?.[7] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          chartInfo={ AGGREGATE_BOTTOM_SOIL.slice(10) }
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[7]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          sharedYScaleData={ mappedChartList?.[6] }
                          yAxisShared={ yAxisShared }
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

      <div className="field-chart__right__bottom">
        <ExtendedChartsSelector chartType={ EXTENDED }
                                chartName={ activeExtendedChart }
                                mappedChartList={ mappedChartList }
                                mappedVoltChartList={ mappedVoltChartList }
                                mappedFlowMeterDailyChartList={ mappedFlowMeterDailyChartList }
                                mappedFlowMeterHourlyList={ mappedFlowMeterHourlyList }
                                mappedECChartList={ mappedECChartList }
                                mappedVPDChartList={ mappedVPDChartList }
                                mappedActualChartList={ mappedActualChartList }
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
                                setDate={ setDate } />

        <FieldLineChartD3 chartType={ DAILY }
                          chartName={ DAILY_ETO }
                          data={ mappedChartList?.[10]?.[0] }
                          secondaryData={ mappedChartList?.[10]?.[1] }
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
                          date={ date }
                          setDate={ setDate }
                          hasXAxis />
      </div>
    </div>
  );
};

AggregateChartsContainer.propTypes = {};

const ExtendedChartsSelector = ({
                                  chartName,
                                  mappedChartList,
                                  mappedVoltChartList,
                                  mappedFlowMeterDailyChartList,
                                  mappedFlowMeterHourlyList,
                                  mappedECChartList,
                                  mappedVPDChartList,
                                  mappedActualChartList,
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
                                  activeExtendedChart,
                                  setActiveExtendedChart,
                                  date,
                                  setDate
                                }) => {

  switch (chartName) {
    case DEFICIT_ETO :
      return (
        <FieldBarAndLineChart chartType={ EXTENDED }
                              chartName={ DEFICIT_ETO }
                              data={ mappedChartList?.[9] }
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
                              setDate={ setDate } />
      );
    case VOLT_READINGS:
      return (
        <FieldLineChartD3 chartType={ EXTENDED }
                          chartName={ VOLT_READINGS }
                          data={ mappedVoltChartList }
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
                          setDate={ setDate } />
      );
    case FLOW_DAILY:
      return (
        <FieldBarAndLineChart chartType={ EXTENDED }
                              chartName={ FLOW_DAILY }
                              data={ mappedFlowMeterDailyChartList }
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
      );
    case FLOW_HOURLY:
      return (
        <FieldBarAndLineChart chartType={ EXTENDED }
                              chartName={ FLOW_HOURLY }
                              data={ mappedFlowMeterHourlyList }
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
      );
    case EC:
      return (
        <FieldLineChartD3 chartType={ EXTENDED }
                          chartName={ EC }
                          data={ mappedECChartList }
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
                          setDate={ setDate } />
      );
    case VPD:
      return (
        <FieldLineChartD3 chartType={ EXTENDED }
                          chartName={ VPD }
                          data={ mappedVPDChartList }
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
                          setDate={ setDate } />
      );
    case ACTUAL_IRRIGATION:
      return (
        <FieldLineChartD3 chartType={ EXTENDED }
                          chartName={ ACTUAL_IRRIGATION }
                          data={ mappedActualChartList }
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
                          setDate={ setDate } />
      );
  }
};
