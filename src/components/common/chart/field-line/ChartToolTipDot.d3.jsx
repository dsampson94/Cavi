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
                           clipPath
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
                  clipPath={ clipPath } />;
};

export default ChartTooltipDot;

const LineDot = ({ setHoverActive, setDate, xScale, xAccessor, data, date, yScale, yAccessor, hoverActive, clipPath }) => {

  let dateBisector = bisector(xAccessor).center;

  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  selectAll('.mouse-tracker').
    on('touchmouse mousemove', event => {
      setHoverActive(true);
      setDate(xScale.invert(pointer(event)[0]));
    }).on('mouseleave', () => {
    setHoverActive(false);
  });

  return (<>
    { hoverActive && x && y &&
      <circle className={ 'tool-tip-dot' }
              clipPath={ clipPath }
              cx={ x }
              cy={ y }
              fill={ '#0081ff' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }
  </>);
};
