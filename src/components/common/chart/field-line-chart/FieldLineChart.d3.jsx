import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName, ChartHeader } from '../Chart.util';
import { AGGREGATE, DEFICIT } from '../../../../tools/general/system-variables.util';

import useDimensions from '../../../../tools/hooks/useDimensions';

import Chart from './Chart.jsx';
import XAxis from './xAxis';
import YAxis from './yAxis';
import Line from './Line';

const FieldLineChartD3 = ({
                            data,
                            chartName,
                            chartType,
                            chartInfo,
                            hasXAxis
                          }) => {

  const svgRef = useRef();
  const [wrapperRef, dimensions] = useDimensions();
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const DIMENSIONS = { marginTop: 1, marginRight: 1, marginBottom: 1, marginLeft: 40, innerPadding: 10 };

  const updatedDimensions = {
    ...DIMENSIONS, ...dimensions, chartName, backgroundColor: chartByName(chartName).backgroundColor,
    boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
    boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
  };

  const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

  let yAccessor = d => d.y;
  let xAccessor = d => new Date(d.x);

  const yScale = scaleLinear().
    domain([max(data, yAccessor), min(data, yAccessor)]).
    range([boundedHeight - innerPadding, innerPadding]);

  const xScale = scaleTime().
    domain(d3.extent(data, xAccessor)).
    range([0, boundedWidth - innerPadding]);

  if (currentYZoomState) {
    const newYScale = currentYZoomState.rescaleY(yScale);
    yScale.domain(newYScale.domain());
  }

  if (currentXZoomState) {
    const newXScale = currentXZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  useEffect(() => {
    const svg = select(svgRef.current);

    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        return [mean(p, d => d[0]), mean(p, d => d[1])];
      }
      return [boundedWidth / 2, boundedHeight / 2];
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 50]).on('zoom', event => {
      const { k: newK, x: newX, y: newY } = event.transform;
      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
      const point = center(event, svg);

      const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;
      const isZoomingY = point[1] / 10 < boundedHeight;

      isZoomingX && setCurrentXZoomState(
        currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK)
      );

      isZoomingY && setCurrentYZoomState(
        currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK)
      );

      setCurrentGlobalZoomState(event.transform);
    });

    svg.call(zoomGlobal);

    selectAll('.reset-listening-rect').on('contextmenu ', e => {
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
               chartName={ chartName }>

          { chartType === AGGREGATE &&
            <rect width={ '92%' }
                  height={ '90%' }
                  style={ { position: 'absolute', zIndex: 1 } }
                  fill={ 'white' } /> }

          <YAxis scale={ yScale } />
          <XAxis scale={ xScale }
                 hasXAxis={ hasXAxis }
                 chartName={ chartName }
                 chartType={ chartType } />

          <Line data={ data }
                chartType={ chartType }
                xAccessor={ xAccessor }
                yAccessor={ yAccessor }
                xScale={ xScale }
                yScale={ yScale } />

          <rect className="reset-listening-rect"
                width={ dimensions.width }
                height={ dimensions.height }
                x={ -DIMENSIONS.marginLeft }
                y={ -DIMENSIONS.marginTop }
                fill="transparent" />

        </Chart>
      </div>
    </>
  );
};

export default FieldLineChartD3;
