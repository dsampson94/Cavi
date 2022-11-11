import React from 'react';
import { bisector, pointer, selectAll } from 'd3';

import {
  CANOPY_LINE,
  CANOPY_OUTSIDE_TEMPERATURE,
  DAILY_ETO,
  HUMIDITY_LINE,
  LINE_100MM,
  LINE_200MM,
  LINE_300MM,
  LINE_400MM,
  LINE_600MM,
  LINE_800MM,
  OUTSIDE_LINE,
  RAIN_HUMIDITY,
  RAIN_LINE,
  SOIL_TEMPERATURE,
  TEMPERATURE_MULTILINE
} from '../../../../tools/general/system-variables.util';

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
                           chartType,
                           clipPath,
                           showPrimaryDropDown,
                           xAxisViewMode,
                           hiddenLineList,
                           secondaryData
                         }) => {

  switch (chartType) {
    case TEMPERATURE_MULTILINE:
      return <TemperatureMultiLineDot data={ data }
                                      date={ date }
                                      setDate={ setDate }
                                      xScale={ xScale }
                                      yScale={ yScale }
                                      xAccessor={ xAccessor }
                                      yAccessor={ yAccessor }
                                      hoverActive={ hoverActive }
                                      setHoverActive={ setHoverActive }
                                      clipPath={ clipPath }
                                      showPrimaryDropDown={ showPrimaryDropDown }
                                      xAxisViewMode={ xAxisViewMode }
                                      hiddenLineList={ hiddenLineList }
                                      chartName={ chartName } />;

    default:
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
                      xAxisViewMode={ xAxisViewMode }
                      hiddenLineList={ hiddenLineList }
                      secondaryData={ secondaryData } />;
  }
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
                   chartName,
                   showPrimaryDropDown,
                   xAxisViewMode,
                   hiddenLineList,
                   secondaryData
                 }) => {

  let dateBisector = bisector(xAccessor).center;

  let hoveredObject = data[dateBisector(data, date)];

  let x1 = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y1 = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  let x2;
  let y2;

  if (secondaryData) {
    x2 = xScale(xAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
    y2 = yScale(yAccessor(secondaryData[Math.max(0, dateBisector(secondaryData, date))]));
  }

  selectAll('.mouse-tracker').on('touchmouse mousemove', event => {
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

  const renderDot = (chart) => {
    if (hoveredObject?.barY === -0.1) return false;
    if (chartName === DAILY_ETO && hiddenLineList?.includes(chart) && hoverActive && y1) return true;
    else return chartName !== DAILY_ETO && hoverActive && y1;
  };

  return (<>
    { renderDot(chartName === DAILY_ETO && 'Forecast') &&
    <circle className={ 'tool-tip-dot' }
            clipPath={ clipPath }
            cx={ x1 + 1.5 }
            cy={ y1 }
            fill={ '#0081ff' }
            stroke={ 'white' }
            strokeWidth={ 2 }
            r={ 5 } /> }

    { chartName === DAILY_ETO && renderDot('Actual') && secondaryData &&
    <circle className={ 'tool-tip-dot-' }
            clipPath={ clipPath }
            cx={ x2 + 1.5 }
            cy={ y2 }
            fill={ '#0081ff' }
            stroke={ 'white' }
            strokeWidth={ 2 }
            r={ 5 } /> }
  </>);
};


const TemperatureMultiLineDot = ({
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
                                   xAxisViewMode,
                                   hiddenLineList,
                                   chartName
                                 }) => {

  let x1;
  let y1;

  let x2;
  let y2;

  let x3;
  let y3;

  let x4;
  let y4;

  let x5;
  let y5;

  let x6;
  let y6;

  let dateBisector = bisector(xAccessor).center;

  if (data?.[0]) {
    x1 = xScale(xAccessor(data?.[0][Math.max(0, dateBisector(data?.[0], date))]));
    y1 = yScale(yAccessor(data?.[0][Math.max(0, dateBisector(data?.[0], date))]));
  }
  if (data?.[1]) {
    x2 = xScale(xAccessor(data?.[1][Math.max(0, dateBisector(data?.[1], date))]));
    y2 = yScale(yAccessor(data?.[1][Math.max(0, dateBisector(data?.[1], date))]));
  }
  if (data?.[2]) {
    x3 = xScale(xAccessor(data?.[2][Math.max(0, dateBisector(data?.[2], date))]));
    y3 = yScale(yAccessor(data?.[2][Math.max(0, dateBisector(data?.[2], date))]));
  }
  if (data?.[3]) {
    x4 = xScale(xAccessor(data?.[3][Math.max(0, dateBisector(data?.[3], date))]));
    y4 = yScale(yAccessor(data?.[3][Math.max(0, dateBisector(data?.[3], date))]));
  }
  if (data?.[4]) {
    x5 = xScale(xAccessor(data?.[4][Math.max(0, dateBisector(data?.[4], date))]));
    y5 = yScale(yAccessor(data?.[4][Math.max(0, dateBisector(data?.[4], date))]));
  }
  if (data?.[5]) {
    x6 = xScale(xAccessor(data?.[5][Math.max(0, dateBisector(data?.[5], date))]));
    y6 = yScale(yAccessor(data?.[5][Math.max(0, dateBisector(data?.[5], date))]));
  }

  selectAll('.mouse-tracker').on('touchmouse mousemove', event => {
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

  const renderDot = (chart, show) => {
    if (!show) return false;
    if (!hiddenLineList?.includes(chart)) return false;
    else return hoverActive;
  };

  if (chartName === SOIL_TEMPERATURE)
    return (<>
      { renderDot(LINE_100MM, y1) &&
      <circle className={ 'tool-tip-dot' }
              clipPath={ clipPath }
              cx={ x1 + 1.5 }
              cy={ y1 }
              fill={ '#0000FF' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(LINE_200MM, y2) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x2 + 1.5 }
              cy={ y2 }
              fill={ '#f37b2c' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(LINE_300MM, y3) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x3 + 1.5 }
              cy={ y3 }
              fill={ '#ea3a3d' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(LINE_400MM, y4) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x4 + 1.5 }
              cy={ y4 }
              fill={ '#47FFFF' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(LINE_600MM, y5) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x5 + 1.5 }
              cy={ y5 }
              fill={ '#1ad598' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(LINE_800MM, y6) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x6 + 1.5 }
              cy={ y6 }
              fill={ 'green' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }
    </>);
  else if (chartName === CANOPY_OUTSIDE_TEMPERATURE)
    return (<>
      { renderDot(CANOPY_LINE, y1) &&
      <circle className={ 'tool-tip-dot' }
              clipPath={ clipPath }
              cx={ x1 + 1.5 }
              cy={ y1 }
              fill={ '#0000FF' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(OUTSIDE_LINE, y2) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x2 + 1.5 }
              cy={ y2 }
              fill={ '#f37b2c' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }
    </>);
  else if (chartName === RAIN_HUMIDITY)
    return (<>
      { renderDot(RAIN_LINE, y1) &&
      <circle className={ 'tool-tip-dot' }
              clipPath={ clipPath }
              cx={ x1 + 1.5 }
              cy={ y1 }
              fill={ '#0000FF' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }

      { renderDot(HUMIDITY_LINE, y2) &&
      <circle className={ 'tool-tip-dot-' }
              clipPath={ clipPath }
              cx={ x2 + 1.5 }
              cy={ y2 }
              fill={ '#f37b2c' }
              stroke={ 'white' }
              strokeWidth={ 2 }
              r={ 5 } /> }
    </>);
};
