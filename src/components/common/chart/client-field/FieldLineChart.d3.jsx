import React, { useEffect, useRef, useState } from 'react';
import { max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName, ChartHeader } from '../Chart.util';
import { AGGREGATE, DEFICIT } from '../../../../tools/general/system-variables.util';

import useDimensions from '../../../../tools/hooks/useDimensions';
import useTheme from '../../../../tools/hooks/useTheme';

import Chart from '../components/Chart.d3.jsx';
import YAxis from '../components/yAxis.d3';
import XAxis from '../components/xAxis.d3';
import Line from '../components/Line.d3';
import ChartTooltipDot from '../components/ChartToolTipDot.d3';
import ChartTooltipText from '../components/ChartToolTipText.d3';
import ChartContextMenu from '../components/ChartContextMenu';

const FieldLineChartD3 = ({
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
                            sharedYScaleData,
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

    const svgRef = useRef();

    const { isDarkMode } = useTheme(false);
    const [wrapperRef, dimensions] = useDimensions();

    const [showPrimaryDropDown, setShowPrimaryDropDown] = useState(false);
    const [showSecondaryDropDown, setShowSecondaryDropDown] = useState(false);

    const DIMENSIONS = {
      marginTop: 0,
      marginRight: 1,
      marginBottom: chartType === DEFICIT ? 0 : 1,
      marginLeft: 40,
      innerPadding: 8
    };
    const updatedDimensions = {
      ...DIMENSIONS, ...dimensions,
      boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
      boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
    };
    const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

    let yAccessor = d => d?.y;
    let xAccessor = d => new Date(d?.x);

    const activeData = yAxisShared ? (!chartName.includes('ET')) ? sharedYScaleData : data : data;

    let yScale = scaleLinear().
      domain(chartName.includes('ET')
        ? [min(activeData, yAccessor), max(activeData, yAccessor)]
        : [max(activeData, yAccessor), min(activeData, yAccessor)]).
      range([boundedHeight - innerPadding, innerPadding]).nice();

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

    if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());
    if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());

    const clipPath = chartName.includes('deficit') ? 'url(#clipDeficit)' :
      chartName.includes('aggregate') ? 'url(#clipAggregate)' : 'url(#clipDaily)';

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
        setXAxisViewMode('topBar');
        setActiveDataPeriod('All');
        svg.call(zoomGlobal.transform, zoomIdentity);
        setCurrentGlobalZoomState(zoomIdentity);
        setCurrentXZoomState(zoomIdentity);
        setCurrentYZoomState(zoomIdentity);
      });
    }, [boundedWidth, boundedHeight, currentXZoomState, currentYZoomState, currentGlobalZoomState, xScale, yScale]);

    return (
      <>
        { chartType !== DEFICIT &&
          <ChartHeader chartName={ chartName }
                       isDarkMode={ isDarkMode } /> }

        <div ref={ wrapperRef }
             style={ { height: chartByName(chartName).height } }
             className={ chartName }>

          <Chart svgRef={ svgRef }
                 dimensions={ updatedDimensions }
                 chartName={ chartName }
                 chartInfo={ chartInfo }
                 isDarkMode={ isDarkMode }>

            { chartType === AGGREGATE &&
              <rect width={ '100%' }
                    height={ '90%' }
                    fill={ isDarkMode ? '#252529' : 'white' } /> }

            <YAxis yScale={ yScale }
                   data={ data }
                   chartName={ chartName }
                   isDarkMode={ isDarkMode } />

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
                              setHoverActive={ setHoverActive }
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
                            setActiveProbeFactor={ setActiveProbeFactor }
                            activeDataPeriod={ activeDataPeriod } />
        </div>
      </>
    );
  }
;

export default FieldLineChartD3;
