import React from 'react';
import { line } from 'd3';

import { AGGREGATE, DEFICIT } from '../../../../tools/general/system-variables.util';

const Line = ({ xAccessor, xScale, yAccessor, yScale, data, chartType, recommendationOffset, clipPath }) => {

  const lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

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
            stroke={ (chartType === AGGREGATE) ? 'url(#line-gradient)' : '#0000FF' }
            style={ {
              fill: 'none',
              strokeWidth: (chartType === AGGREGATE) ? '1.8px' : '1.2px',
              strokeLinecap: 'round'
            } } />
    </g>
  );
};

export default Line;
