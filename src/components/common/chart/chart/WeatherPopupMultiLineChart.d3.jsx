import React, { useEffect, useRef, useState } from 'react';
import { max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName } from '../Chart.util';
import { isEmpty } from '../../../../tools/general/helpers.util';

import useDimensions from '../../../../tools/hooks/useDimensions';
import useTheme from '../../../../tools/hooks/useTheme';

import Chart from '../components/Chart.d3.jsx';
import YAxis from '../components/yAxis.d3';
import XAxis from '../components/xAxis.d3';
import ChartTooltipDot from '../components/ChartToolTipDot.d3';
import ChartTooltipText from '../components/ChartToolTipText.d3';
import Line from '../components/Line.d3';
import { ETO_WEATHER } from '../../../../tools/general/system-variables.util';

const WeatherPopupMultiLineChart = ({
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
                                      activeLoadPeriod,
                                      activeDataPeriod,
                                      setActiveDataPeriod,
                                      xAxisViewMode,
                                      setXAxisViewMode,
                                      date,
                                      setDate,
                                      toggleInitialList
                                    }) => {
    const svgRef = useRef();

    const { isDarkMode } = useTheme(false);
    const [wrapperRef, dimensions] = useDimensions();

    const [hiddenLineList, setHiddenLineList] = useState(toggleInitialList);

    const DIMENSIONS = {
      marginTop: 1,
      marginRight: 1,
      marginBottom: 0,
      marginLeft: 40,
      innerPadding: 10
    };
    const updatedDimensions = {
      ...DIMENSIONS, ...dimensions,
      boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
      boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
    };
    const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

    let yAccessor = d => d?.y;
    let xAccessor = d => new Date(d?.x);

    const yAxisPaddingFactor = 0.8;
    const yMin = Array.isArray(data?.[0]) ? min(data?.[0], yAccessor) : null;
    const yMax = Array.isArray(data?.[0]) ? max(data?.[0], yAccessor) : null;
    const yPadding = (yMax - yMin) * yAxisPaddingFactor;

    let yScale = scaleLinear().domain([yMin - yPadding, yMax + yPadding]).range([boundedHeight - innerPadding, innerPadding]).nice();

    const activeMinDate = () => {
      if (activeDataPeriod === 'All') return Array.isArray(data?.[0]) ? min(data?.[0], xAccessor) : null;
      else return new Date(Array.isArray(data?.[0]) ? max(data?.[0], xAccessor).setDate(max(data?.[0], xAccessor).getDate() - activeDataPeriod) : null);
    };

    const getXAxisViewMode = () => {
      return [activeMinDate(), Array.isArray(data?.[0]) ? max(data?.[0], xAccessor) : null];
    };

    const xScale = scaleTime().domain(getXAxisViewMode()).range([0, boundedWidth - innerPadding]);

    if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());
    if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());

    const clipPath = 'url(#clipTemperaturesMulti)';

    const zoomMode = () => {
      switch (activeLoadPeriod) {
        case '12 months':
        case 'Full View':
          return 'end';
        default:
          return 'zoom';
      }
    };

    useEffect(() => {
      setXAxisViewMode('topBar');
      setCurrentGlobalZoomState(zoomIdentity);
      setCurrentXZoomState(zoomIdentity);
      setCurrentYZoomState(zoomIdentity);
    }, []);

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
        const { k: newK, x: newX, y: newY } = event.transform;
        const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
        const point = center(event, svg);

        const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;
        const isZoomingY = point[1] / 10 < boundedHeight;

        isZoomingX && setCurrentXZoomState(currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK));
        isZoomingY && setCurrentYZoomState(currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK));
        setCurrentGlobalZoomState(event.transform);
      });

      svg.call(zoomGlobal).on('dblclick.zoom', null);

      selectAll('.mouse-tracker').on('dblclick ', () => {
        setActiveDataPeriod('All');
        svg.call(zoomGlobal.transform, zoomIdentity);
        setCurrentGlobalZoomState(zoomIdentity);
        setCurrentXZoomState(zoomIdentity);
        setCurrentYZoomState(zoomIdentity);
      });
    }, [boundedWidth, boundedHeight, currentXZoomState, currentYZoomState, currentGlobalZoomState, xScale, yScale]);

    return (
      <>
        { !isEmpty(data?.[0]) ?
          <div ref={ wrapperRef }
               style={ { height: chartByName(chartName).height } }
               className={ chartName }>

            <Chart svgRef={ svgRef }
                   dimensions={ updatedDimensions }
                   chartName={ chartName }
                   chartInfo={ chartInfo }
                   isDarkMode={ isDarkMode }
                   hiddenLineList={ hiddenLineList }
                   setHiddenLineList={ setHiddenLineList }>

              <YAxis yScale={ yScale }
                     chartName={ chartName }
                     chartType={ chartType }
                     isDarkMode={ isDarkMode } />

              <XAxis xScale={ xScale }
                     hasXAxis={ hasXAxis }
                     chartName={ chartName }
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
                    isDarkMode={ isDarkMode }
                    hiddenLineList={ hiddenLineList } />

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
                               chartName={ chartName }
                               chartType={ chartType }
                               clipPath={ clipPath }
                               xAxisViewMode={ xAxisViewMode }
                               hiddenLineList={ hiddenLineList } />

              <ChartTooltipText xAccessor={ xAccessor }
                                yAccessor={ yAccessor }
                                xScale={ xScale }
                                yScale={ yScale }
                                data={ data?.[0] }
                                date={ date }
                                hoverActive={ hoverActive }
                                setHoverActive={ setHoverActive }
                                chartName={ chartName }
                                chartType={ chartType }
                                clipPath={ clipPath }
                                hiddenLineList={ hiddenLineList }
                                secondaryData={ data?.[1] } />
            </Chart>

          </div>
          :
          <div ref={ wrapperRef }
               style={ { height: chartByName(chartName).height } }
               className={ chartName }>
          </div> }
      </>
    );
  }
;

export default WeatherPopupMultiLineChart;
