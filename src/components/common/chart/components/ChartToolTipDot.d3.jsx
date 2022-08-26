import React from 'react';
import { bisector, pointer, selectAll } from 'd3';

import '../chart.scss';

const ChartTooltipDot = ({
                           data,
                           date,
                           setDate,
                           xScale,
                           yScale,
                           xAccessor,
                           yAccessor,
                           hoverActive,
                           setHoverActive,
                           chartName,
                           clipPath,
                           showPrimaryDropDown,
                           xAxisViewMode
                         }) => {

  return <LineDot data={ data }
                  date={ date }
                  setDate={ setDate }
                  xScale={ xScale }
                  yScale={ yScale }
                  xAccessor={ xAccessor }
                  yAccessor={ yAccessor }
                  hoverActive={ hoverActive }
                  setHoverActive={ setHoverActive }
                  chartName={ chartName }
                  clipPath={ clipPath }
                  showPrimaryDropDown={ showPrimaryDropDown }
                  xAxisViewMode={ xAxisViewMode } />;
};

export default ChartTooltipDot;

const LineDot = ({
                   setHoverActive,
                   setDate,
                   xScale,
                   xAccessor,
                   data,
                   date,
                   yScale,
                   yAccessor,
                   hoverActive,
                   clipPath,
                   showPrimaryDropDown,
                   xAxisViewMode
                 }) => {

  selectAll('.mouse-tracker').
    on('touchmouse mousemove', event => {
      setHoverActive(true);
      if (showPrimaryDropDown) return setDate(date);
      if (xAxisViewMode === 'topBar') setDate(xScale.invert(pointer(event)[0] + 10));
    }).on('contextmenu', (event) => {
    if (showPrimaryDropDown) {
      setDate(xScale.invert(pointer(event)[0] + 10));
    }
  }).on('mouseleave', () => {
    setHoverActive(false);
  });

  let dateBisector = bisector(xAccessor).center;
  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  return (<>
    { hoverActive && y && (data[dateBisector(data, date)]?.barY !== -0.1) &&
      <circle className={ 'tool-tip-dot' }
              clipPath={ clipPath }
              cx={ x + 1.5 }
              cy={ y }
              fill={ '#0081ff' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }
  </>);
};
