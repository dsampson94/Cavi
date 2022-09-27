import React, { useEffect, useRef, useState } from 'react';
import { max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { chartByName } from '../Chart.util';

import useDimensions from '../../../../tools/hooks/useDimensions';
import useTheme from '../../../../tools/hooks/useTheme';

import Chart from '../components/Chart.d3.jsx';
import YAxis from '../components/yAxis.d3';
import XAxis from '../components/xAxis.d3';
import ChartTooltipDot from '../components/ChartToolTipDot.d3';
import ChartTooltipText from '../components/ChartToolTipText.d3';
import ChartContextMenu from '../../context-menu/ChartContextMenu';
import Line from '../components/Line.d3';
import CheckboxFilter from '../components/CheckboxFilter';

const TemperaturesLineChart = ({
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
    const [hiddenLineList, setHiddenLineList] = useState([]);

    const DIMENSIONS = {
      marginTop: 3,
      marginRight: 1,
      marginBottom: 30,
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

    let yScale = scaleLinear().
      domain([max(data?.[0], yAccessor), min(data?.[0], yAccessor)]).
      range([boundedHeight - innerPadding, innerPadding]).nice();

    const activeMinDate = () => {
      if (activeDataPeriod === 'All') return min(data?.[0], xAccessor);
      else return new Date(max(data?.[0], xAccessor).setDate(max(data?.[0], xAccessor).getDate() - activeDataPeriod));
    };

    const getXAxisViewMode = () => {
      if (xAxisViewMode === 'contextMenu') {
        return [
          new Date(date.getTime() - ((activeDataPeriod / 2) * 24 * 60 * 60 * 1000)),
          new Date(date.getTime() + ((activeDataPeriod / 2) * 24 * 60 * 60 * 1000))];
      } else if (xAxisViewMode === 'topBar') {
        return [activeMinDate(), max(data?.[0], xAccessor)];
      }
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
        <div ref={ wrapperRef }
             style={ { height: chartByName(chartName).height } }
             className={ chartName }>

          <Chart svgRef={ svgRef }
                 dimensions={ updatedDimensions }
                 chartName={ chartName }
                 chartInfo={ chartInfo }
                 isDarkMode={ isDarkMode }>

            <YAxis yScale={ yScale }
                   data={ data }
                   chartName={ chartName }
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

          <CheckboxFilter chartName={ chartName }
                          hiddenLineList={ hiddenLineList }
                          setHiddenLineList={ setHiddenLineList } />

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
                            switchAtMidWidth={ false } />
        </div>
      </>
    );
  }
;

export default TemperaturesLineChart;
