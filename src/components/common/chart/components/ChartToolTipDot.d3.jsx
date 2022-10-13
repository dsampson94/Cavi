import React from 'react';
import { bisector, pointer, selectAll } from 'd3';

import { DAILY_ETO } from '../../../../tools/general/system-variables.util';

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
                           xAxisViewMode,
                           hiddenLineList,
                           secondaryData
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
                  xAxisViewMode={ xAxisViewMode }
                  hiddenLineList={ hiddenLineList }
                  secondaryData={ secondaryData } />;
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
