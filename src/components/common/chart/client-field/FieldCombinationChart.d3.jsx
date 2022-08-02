import React, { useEffect, useRef } from 'react';
import { extent, max, mean, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName, ChartHeader } from '../Chart.util';
import { AGGREGATE, DEFICIT } from '../../../../tools/general/system-variables.util';

import useDimensions from '../../../../tools/hooks/useDimensions';

import Chart from '../components/Chart.d3';
import XAxis from '../components/xAxis.d3';
import YAxis from '../components/yAxis.d3';
import Line from '../components/Line.d3';
import ChartTooltipDot from '../components/ChartToolTipDot.d3';
import ChartTooltipText from '../components/ChartToolTipText.d3';
import Bars from '../components/Bars';

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
                                 date,
                                 setDate
                               }) => {

  const svgRef = useRef();
  const [wrapperRef, dimensions] = useDimensions();
  const DIMENSIONS = { marginTop: 1, marginRight: 1, marginBottom: 1, marginLeft: 40, innerPadding: 10 };
  const updatedDimensions = {
    ...DIMENSIONS, ...dimensions,
    boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
    boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
  };
  const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

  let yAccessor = d => d?.barY;
  let xAccessor = d => new Date(d?.x);

  const yScale = scaleLinear().
    domain([0, max(data, yAccessor)]).
    range([boundedHeight - innerPadding, innerPadding]);

  const xScale = scaleTime().
    domain(extent(data, xAccessor)).
    range([0, boundedWidth - innerPadding]);

  if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());
  if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());

  const clipPath = chartName.includes('deficit') ? 'url(#clipDeficit)' :
    chartName.includes('aggregate') ? 'url(#clipAggregate)' : 'url(#clipDaily)';

  useEffect(() => {
    const svg = select(svgRef.current);

    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        return [mean(p, d => d[0]), mean(p, d => d[1])];
      }
      return [boundedWidth / 2, boundedHeight / 2];
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 40]).on('zoom', event => {
      const { k: newK, x: newX, y: newY } = event.transform;
      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
      const point = center(event, svg);

      const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;
      const isZoomingY = point[1] / 10 < boundedHeight;

      isZoomingX && setCurrentXZoomState(currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK));
      isZoomingY && setCurrentYZoomState(currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK));
      setCurrentGlobalZoomState(event.transform);
    });

    svg.call(zoomGlobal);

    selectAll('.mouse-tracker').on('contextmenu ', e => {
      e.preventDefault();
      svg.call(zoomGlobal.transform, zoomIdentity);
      setCurrentGlobalZoomState(zoomIdentity);
      setCurrentXZoomState(zoomIdentity);
      setCurrentYZoomState(zoomIdentity);
    });

  }, [boundedWidth, boundedHeight, currentXZoomState, currentYZoomState, currentGlobalZoomState, xScale, yScale]);

  return (
    <>
      { chartType !== DEFICIT && <div style={ { marginTop: '1.8%' } }>
        <ChartHeader chartName={ chartName } />
      </div> }

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
                 chartName={ chartName } />

          <XAxis xScale={ xScale }
                 hasXAxis={ hasXAxis }
                 chartName={ chartName }
                 chartType={ chartType } />

          <Line data={ data }
                recommendationOffset={ recommendationOffset }
                chartName={ chartName }
                chartType={ chartType }
                xAccessor={ xAccessor }
                yAccessor={ yAccessor }
                xScale={ xScale }
                yScale={ yScale }
                clipPath={ clipPath } />

          <Bars data={ data }
                height={ dimensions.height }
                xScale={ xScale }
                yScale={ yScale }
                clipPath={ clipPath } />

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
                           clipPath={ clipPath } />

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
      </div>
    </>
  );
};

export default FieldCombinationChart;
