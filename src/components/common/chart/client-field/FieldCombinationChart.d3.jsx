import React, { useEffect, useRef, useState } from 'react';
import { max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName, ChartHeader } from '../Chart.util';
import { AGGREGATE } from '../../../../tools/general/system-variables.util';

import useDimensions from '../../../../tools/hooks/useDimensions';
import useTheme from '../../../../tools/hooks/useTheme';

import Chart from '../components/Chart.d3';
import XAxis from '../components/xAxis.d3';
import YAxis from '../components/yAxis.d3';
import Line from '../components/Line.d3';
import ChartTooltipDot from '../components/ChartToolTipDot.d3';
import ChartTooltipText from '../components/ChartToolTipText.d3';
import Bars from '../components/Bars';
import ChartContextMenu from '../components/ChartContextMenu';

const FieldCombinationChart = ({
                                 data,
                                 chartName,
                                 chartType,
                                 chartInfo,
                                 hasXAxis,
                                 recommendationOffset,
                                 currentGlobalZoomState,
                                 setCurrentGlobalZoomState,
                                 currentYZoomState,
                                 setCurrentYZoomState,
                                 currentXZoomState,
                                 setCurrentXZoomState,
                                 hoverActive,
                                 setHoverActive,
                                 activeDataPeriod,
                                 activeLoadPeriod,
                                 setActiveDataPeriod,
                                 xAxisViewMode,
                                 setXAxisViewMode,
                                 activeProbeFactor,
                                 setActiveProbeFactor,
                                 date,
                                 setDate
                               }) => {

  const svgRef = useRef();

  const { isDarkMode } = useTheme(false);
  const [wrapperRef, dimensions] = useDimensions();

  const [showPrimaryDropDown, setShowPrimaryDropDown] = useState(false);
  const [showSecondaryDropDown, setShowSecondaryDropDown] = useState(false);

  const DIMENSIONS = { marginTop: 1, marginRight: 1, marginBottom: 1, marginLeft: 40, innerPadding: 10 };
  const updatedDimensions = {
    ...DIMENSIONS, ...dimensions,
    boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
    boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
  };
  const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

  let yAccessor = d => d?.barY;
  let xAccessor = d => new Date(d?.x);

  const yScale = scaleLinear().domain([0, max(data, yAccessor) + 0.6]).range([boundedHeight, innerPadding]).nice();

  const activeMinDate = () => {
    if (activeDataPeriod === 'All') return min(data, xAccessor);
    else return new Date(max(data, xAccessor).setDate(max(data, xAccessor).getDate() - activeDataPeriod));
  };

  const getXAxisViewMode = () => {
    if (xAxisViewMode === 'contextMenu') {
      return [
        new Date(date.getTime() - ((activeDataPeriod / 2) * 24 * 60 * 60 * 1000)),
        new Date(date.getTime() + ((activeDataPeriod / 2) * 24 * 60 * 60 * 1000))];
    } else if (xAxisViewMode === 'topBar') {
      return [activeMinDate(), max(data, xAccessor)];
    }
  };

  const xScale = scaleTime().domain(getXAxisViewMode()).range([0, boundedWidth - innerPadding]);

  if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());

  const zoomMode = () => {
    switch (activeLoadPeriod) {
      case '12 months':
      case 'Full View':
        return 'end';
      default:
        return 'zoom';
    }
  };

  const clipPath = 'url(#clipUsage)';

  useEffect(() => {
    setXAxisViewMode('topBar');
    setActiveDataPeriod('All');
    setCurrentGlobalZoomState(zoomIdentity);
    setCurrentXZoomState(zoomIdentity);
    setCurrentYZoomState(zoomIdentity);
  }, [activeProbeFactor]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        return [mean(p, d => d[0]), mean(p, d => d[1])];
      }
      return [boundedWidth / 2, boundedHeight / 2];
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 50]).on('start', () => {
      setHoverActive(false);
    }).on(zoomMode(), event => {
      const { k: newK, x: newX } = event.transform;
      const { k: prevK, x: prevX } = currentGlobalZoomState;
      const point = center(event, svg);

      const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;

      isZoomingX && setCurrentXZoomState(currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK));
      setCurrentGlobalZoomState(event.transform);
    });

    svg.call(zoomGlobal).on('dblclick.zoom', null);

    selectAll('.mouse-tracker').on('dblclick ', () => {
      svg.call(zoomGlobal.transform, zoomIdentity);
      setCurrentGlobalZoomState(zoomIdentity);
      setCurrentXZoomState(zoomIdentity);
      setCurrentYZoomState(zoomIdentity);
    });
  }, [boundedWidth, boundedHeight, currentXZoomState, currentYZoomState, currentGlobalZoomState, xScale, yScale]);

  return (
    <>
      <ChartHeader chartName={ chartName } />

      <div ref={ wrapperRef }
           style={ { height: chartByName(chartName).height } }>

        <Chart svgRef={ svgRef }
               dimensions={ updatedDimensions }
               chartName={ chartName }
               chartInfo={ chartInfo }>

          { chartType === AGGREGATE &&
            <rect width={ '92%' }
                  height={ '90%' }
                  fill={ 'white' } /> }

          <YAxis yScale={ yScale }
                 data={ data }
                 chartName={ chartName }
                 isDarkMode={ isDarkMode } />

          <Bars data={ data }
                height={ dimensions.height }
                xScale={ xScale }
                yScale={ yScale }
                clipPath={ clipPath } />

          <XAxis xScale={ xScale }
                 hasXAxis={ hasXAxis }
                 chartName={ chartName }
                 chartType={ chartType }
                 isDarkMode={ isDarkMode } />

          <Line data={ data }
                recommendationOffset={ recommendationOffset }
                chartName={ chartName }
                chartType={ chartType }
                xAccessor={ xAccessor }
                yAccessor={ yAccessor }
                xScale={ xScale }
                yScale={ yScale }
                clipPath={ clipPath }
                isDarkMode={ isDarkMode } />

          <rect className={ 'mouse-tracker' }
                width={ dimensions.width }
                height={ dimensions.height }
                x={ -DIMENSIONS.marginLeft }
                y={ -DIMENSIONS.marginTop }
                fill={ 'transparent' }
                opacity={ 0 } />

          <ChartTooltipDot xAccessor={ xAccessor }
                           yAccessor={ yAccessor }
                           xScale={ xScale }
                           yScale={ yScale }
                           data={ data }
                           date={ date }
                           setDate={ setDate }
                           hoverActive={ hoverActive }
                           setHoverActive={ setHoverActive }
                           showPrimaryDropDown={ showPrimaryDropDown }
                           chartName={ chartName }
                           clipPath={ clipPath }
                           xAxisViewMode={ xAxisViewMode } />

          <ChartTooltipText xAccessor={ xAccessor }
                            yAccessor={ yAccessor }
                            xScale={ xScale }
                            yScale={ yScale }
                            data={ data }
                            date={ date }
                            hoverActive={ hoverActive }
                            chartName={ chartName }
                            clipPath={ clipPath } />
        </Chart>

        <ChartContextMenu data={ data }
                          date={ date }
                          xScale={ xScale }
                          yScale={ yScale }
                          xAccessor={ xAccessor }
                          yAccessor={ yAccessor }
                          showPrimaryDropDown={ showPrimaryDropDown }
                          setShowPrimaryDropDown={ setShowPrimaryDropDown }
                          showSecondaryDropDown={ showSecondaryDropDown }
                          setShowSecondaryDropDown={ setShowSecondaryDropDown }
                          setHoverActive={ setHoverActive }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          setXAxisViewMode={ setXAxisViewMode }
                          activeProbeFactor={ activeProbeFactor }
                          setActiveProbeFactor={ setActiveProbeFactor } />
      </div>
    </>
  );
};

export default FieldCombinationChart;
