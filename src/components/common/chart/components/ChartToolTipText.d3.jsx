import React from 'react';

import { bisector } from 'd3';

import { DAILY_ETO, USAGE_ETC } from '../../../../tools/general/system-variables.util';

import '../chart.scss';

const ChartTooltipText = ({
                            data,
                            date,
                            xAccessor,
                            yAccessor,
                            xScale,
                            yScale,
                            hoverActive,
                            setHoverActive,
                            chartName,
                            clipPath
                          }) => {

  return <TooltipText data={ data }
                      date={ date }
                      xScale={ xScale }
                      yScale={ yScale }
                      xAccessor={ xAccessor }
                      yAccessor={ yAccessor }
                      hoverActive={ hoverActive }
                      setHoverActive={ setHoverActive }
                      chartName={ chartName }
                      clipPath={ clipPath } />;
};

export default ChartTooltipText;

const TooltipText = ({ xAccessor, yAccessor, xScale, yScale, data, date, hoverActive, setHoverActive, chartName, clipPath }) => {

  let dateBisector = bisector(xAccessor).center;

  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  let hoveredObject = data[dateBisector(data, date)];

  let toolTipText = () => {
    if (chartName.includes('deficit')) {
      return `${ hoveredObject?.y }mm ${ hoveredObject?.percent }% @ ${ hoveredObject?.temp }C @ ${ hoveredObject?.x }`;
    } else if (chartName === USAGE_ETC) {
      return ` Etc: ${ hoveredObject?.barY } Set: ${ hoveredObject?.lineY.toFixed(3) } @ ${ hoveredObject?.x }`;
    } else if (chartName === DAILY_ETO) {
      return `Forecast: ${ hoveredObject?.y }mm ${ hoveredObject?.x }`;
    } else {
      return `${ hoveredObject?.y }mm ${ hoveredObject?.x }`;
    }
  };

  return (<>
      { hoverActive && hoveredObject?.y &&
        <g className="tooltip-container"
           clipPath={ clipPath }>
          <rect className="tooltip-container__rect"
                fill={ 'white' }
                x={ x + 10 }
                y={ y - 25 }
                height={ 15 }
                width={ chartName.includes('deficit') ? 235 : chartName === USAGE_ETC ? 210 : chartName === DAILY_ETO ? 180 : 145 }
                rx={ '5' }
                ry={ '5' } />

          <text className="tooltip-container__text"
                x={ x + 15 }
                y={ y - 13 }
                fontSize={ '11' }
                fill={ 'blue' }>
            { toolTipText() }
          </text>
        </g> }
    </>
  );
};
