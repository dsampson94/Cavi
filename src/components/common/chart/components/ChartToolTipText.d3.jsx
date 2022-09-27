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

  const getXPos = () => {
    return { rect: x + 15, text: x + 20 };
  };

  const getYPos = () => {
    if (y < 40) return { rect: y, text: y + 13 };
    else return { rect: y - 20, text: y - 7 };
  };

  return (<>
      { hoverActive && hoveredObject?.y &&
        <g className="tooltip-container"
           clipPath={ clipPath }>
          <rect className="tooltip-container__rect"
                fill={ 'white' }
                x={ getXPos().rect }
                y={ getYPos().rect }
                height={ 18 }
                width={ chartName.includes('deficit') ? 260 : chartName === USAGE_ETC ? 232 : chartName === DAILY_ETO ? 200 : 169 }
                rx={ '5' }
                ry={ '5' } />

          <text className="tooltip-container__text"
                x={ getXPos().text }
                y={ getYPos().text }
                fontSize={ '12' }
                fontWeight={ 800 }>
            { toolTipText() }
          </text>
        </g> }
    </>
  );
};
