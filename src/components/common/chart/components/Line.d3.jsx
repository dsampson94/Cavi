import React from 'react';
import { line, selectAll } from 'd3';

import { AGGREGATE, AGGREGATE_BOTTOM_SOIL, AGGREGATE_TOP_SOIL, USAGE_ETC } from '../../../../tools/general/system-variables.util';

const Line = ({ xAccessor, xScale, yAccessor, yScale, data, chartType, chartName, recommendationOffset, clipPath, isDarkMode }) => {

  let lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  if (chartName === USAGE_ETC) {
    let lineYAccessor = d => d?.lineY;
    lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(lineYAccessor(d)));
  }

  selectAll('.line').on('contextmenu ', event => event.preventDefault());

  const getLineColor = () => {
    if (chartName === AGGREGATE_TOP_SOIL) return 'url(#lineGradientAggregateTop)';
    else if (chartName === AGGREGATE_BOTTOM_SOIL) return 'url(#lineGradientAggregateBottom)';
    else if (chartName === USAGE_ETC && isDarkMode) return 'white';
    else if (chartName === USAGE_ETC && !isDarkMode) return 'black';
    else if (isDarkMode) return '#0090ff';
    else if (!isDarkMode) return '#0000FF';
  };

  return (
    <g>
      { chartName === AGGREGATE_TOP_SOIL && <defs>
        <linearGradient id="lineGradientAggregateTop">
          <stop offset={ `${ recommendationOffset }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ recommendationOffset - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
      </defs> }

      { chartName === AGGREGATE_BOTTOM_SOIL && <defs>
        <linearGradient id="lineGradientAggregateBottom">
          <stop offset={ `${ recommendationOffset }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ recommendationOffset - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
      </defs> }

      <path className={ 'line' }
            d={ lineGenerator(data) }
            clipPath={ clipPath }
            stroke={ getLineColor() }
            style={ {
              fill: 'none',
              strokeWidth: chartType === AGGREGATE ? '1.8px' : '1.2px',
              strokeLinecap: 'round'
            } } />

      <ReferenceLine xScale={ xScale }
                     yScale={ yScale }
                     xAccessor={ xAccessor }
                     clipPath={ clipPath }
                     data={ data }
                     chartName={ chartName }
                     isDarkMode={ isDarkMode } />
    </g>
  );
};

export default Line;

const ReferenceLine = ({ xScale, yScale, xAccessor, clipPath, data, chartName, isDarkMode }) => {

  const width = 1.5;
  const opacity = isDarkMode ? 0.8 : 0.6;

  let idealAccessor = d => d?.ideal;
  let stressAccessor = d => d?.stress;
  let witherAccessor = d => d?.wither;

  const idealLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(idealAccessor(d)));
  const stressLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(stressAccessor(d)));
  const witherLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(witherAccessor(d)));

  switch (chartName) {
    case AGGREGATE_TOP_SOIL:
      return <>
        <path className={ 'line' }
              d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ isDarkMode ? '#54a4d9' : '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    case AGGREGATE_BOTTOM_SOIL:
      return <>
        <path className={ 'line' }
              d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ isDarkMode ? '#54a4d9' : '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    default:
      return <></>;
  }
};

