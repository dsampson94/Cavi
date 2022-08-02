import React from 'react';
import { line } from 'd3';

import { AGGREGATE, AGGREGATE_BOTTOM_SOIL, AGGREGATE_TOP_SOIL, DEFICIT, USAGE_ETC } from '../../../../tools/general/system-variables.util';

const Line = ({ xAccessor, xScale, yAccessor, yScale, data, chartType, chartName, recommendationOffset, clipPath }) => {

  let lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  if (chartName === USAGE_ETC) {
    let lineYAccessor = d => d?.lineY;
    lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(lineYAccessor(d)));
  }

  return (
    <g>
      { chartType !== DEFICIT && <defs>
        <linearGradient id="line-gradient">
          <stop offset={ `${ recommendationOffset }%` } style={ { stopColor: 'black', stopOpacity: '1' } } />
          <stop offset={ `${ recommendationOffset - 1 }%` } style={ { stopColor: '#00B8B0', stopOpacity: '1' } } />
        </linearGradient>
      </defs> }

      <path d={ lineGenerator(data) }
            clipPath={ clipPath }
            stroke={ chartType === AGGREGATE ? 'url(#line-gradient)' : chartName === USAGE_ETC ? 'black' : '#0000FF' }
            style={ {
              fill: 'none',
              strokeWidth: chartType === AGGREGATE ? '1.8px' : '1.2px',
              strokeLinecap: 'round'
            } } />

      <WarningLine xScale={ xScale }
                   yScale={ yScale }
                   xAccessor={ xAccessor }
                   clipPath={ clipPath }
                   data={ data }
                   chartName={ chartName } />
    </g>
  );
};

export default Line;

const WarningLine = ({ xScale, yScale, xAccessor, clipPath, data, chartName }) => {

  const width = 1.5;
  const opacity = 0.4;

  let idealAccessor = d => d?.ideal;
  let stressAccessor = d => d?.stress;
  let witherAccessor = d => d?.wither;

  const idealLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(idealAccessor(d)));
  const stressLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(stressAccessor(d)));
  const witherLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(witherAccessor(d)));

  switch (chartName) {
    case AGGREGATE_TOP_SOIL:
      return <>
        <path d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    case AGGREGATE_BOTTOM_SOIL:
      return <>
        <path d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    default:
      return <></>;
  }
};

