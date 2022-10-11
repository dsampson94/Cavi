import React from 'react';

import { bisector } from 'd3';

import { DAILY_ETO, DEFICIT_ETO, EC, EXTENDED, VOLT_READINGS } from '../../../../tools/general/system-variables.util';

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
                            chartType,
                            clipPath,
                            hiddenLineList,
                            secondaryData
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
                      chartType={ chartType }
                      clipPath={ clipPath }
                      hiddenLineList={ hiddenLineList }
                      secondaryData={ secondaryData } />;
};

export default ChartTooltipText;

const TooltipText = ({
                       xAccessor,
                       yAccessor,
                       xScale,
                       yScale,
                       data,
                       date,
                       hoverActive,
                       chartName,
                       chartType,
                       clipPath,
                       hiddenLineList,
                       secondaryData
                     }) => {

  let dateBisector = bisector(xAccessor).center;

  let x1 = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y1 = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  let x2;
  let y2;

  let hoveredObject = data[dateBisector(data, date)];

  let secondaryHoveredObject;

  if (secondaryData) {
    x2 = xScale(xAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
    y2 = yScale(yAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
    secondaryHoveredObject = secondaryData[dateBisector(secondaryData, date)];
  }

  let toolTipText = (chart) => {
    if (chartName.includes('deficit')) {
      return `${ hoveredObject?.y }mm ${ hoveredObject?.percent }% @ ${ hoveredObject?.temp }C @ ${ hoveredObject?.x }`;
    } else if (chartName === DEFICIT_ETO) {
      return ` Etc: ${ hoveredObject?.barY } Set: ${ hoveredObject?.lineY.toFixed(3) } @ ${ hoveredObject?.x }`;
    } else if (chartName === VOLT_READINGS) {
      return ` Volts: ${ hoveredObject?.y } @ ${ hoveredObject?.x }`;
    } else if (chartName === EC) {
      return ` mS/cm: ${ hoveredObject?.y } @ ${ hoveredObject?.x }`;
    } else if (chartName === DAILY_ETO) {
      if (chart === 'Actual') return `Actual: ${ secondaryHoveredObject?.y }mm ${ secondaryHoveredObject?.x }`;
      else return `Forecast: ${ hoveredObject?.y }mm ${ hoveredObject?.x }`;
    } else if (hoveredObject.barY && hoverActive) {
      return `${ hoveredObject?.barY }mm ${ hoveredObject?.x }`;
    } else {
      return `${ hoveredObject?.y }mm ${ hoveredObject?.x }`;
    }
  };

  const getXPos = (chart) => {
    if (chartName === DAILY_ETO && hiddenLineList?.includes(chart)) return {
      rect1: x1 + 15,
      text1: x1 + 20,
      rect2: x2 + 15,
      text2: x2 + 20
    };
    else return { rect1: x1 + 15, text1: x1 + 20 };
  };

  const getYPos = (chart) => {
    if (chartName === DAILY_ETO && hiddenLineList?.includes(chart)) return {
      rect1: (y1 - y2 < 15) ? y1 - 20 : y1 + 0,
      text1: (y1 - y2 < 15) ? y1 - 7 : y1 + 13,
      rect2: (y1 - y2 < 15) ? y1 + 10 : y2 - 30,
      text2: (y1 - y2 < 15) ? y1 + 24 : y2 - 18
    };
    else if (y1 < 40) return { rect1: y1, text1: y1 + 13 };
    else return { rect1: y1 - 20, text1: y1 - 7 };
  };

  const renderText = (chart) => {
    if (chartName === DAILY_ETO) {
      return !!(hiddenLineList?.includes(chart) && hoverActive && hoveredObject?.y);
    } else if (chart !== 'Actual' && hoverActive && hoveredObject?.y) {
      return true;
    } else if (hoveredObject?.barY && hoverActive) return true;

  };

  return (<>
      { renderText('Forecast') &&
      <g className="tooltip-container"
         clipPath={ clipPath }>
        <rect className="tooltip-container__rect"
              fill={ 'white' }
              x={ getXPos('Forecast').rect1 }
              y={ getYPos('Forecast').rect1 }
              height={ 18 }
              width={ chartName.includes('deficit') ? 260 : chartType === EXTENDED ? 200 : chartName === DAILY_ETO ? 200 : 169 }
              rx={ '5' }
              ry={ '5' } />

        <text className="tooltip-container__text"
              x={ getXPos('Forecast').text1 }
              y={ getYPos('Forecast').text1 }
              fontSize={ '12' }
              fontWeight={ 800 }>
          { toolTipText('Forecast') }
        </text>
      </g> }

      { renderText('Actual') && secondaryData &&
      <g className="tooltip-container"
         clipPath={ clipPath }>
        <rect className="tooltip-container__rect"
              fill={ 'white' }
              x={ getXPos('Actual').rect2 }
              y={ getYPos('Actual').rect2 }
              height={ 18 }
              width={ chartName.includes('deficit') ? 260 : chartName === DEFICIT_ETO ? 232 : chartName === DAILY_ETO ? 200 : 169 }
              rx={ '5' }
              ry={ '5' } />

        <text className="tooltip-container__text"
              x={ getXPos('Actual').text2 }
              y={ getYPos('Actual').text2 }
              fontSize={ '12' }
              fontWeight={ 800 }>
          { toolTipText('Actual') }
        </text>
      </g> }
    </>
  );
};
