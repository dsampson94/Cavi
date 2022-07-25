import React from 'react';
import { line } from 'd3';

import { AGGREGATE, DEFICIT } from '../../../../tools/general/system-variables.util';

const Line = ({ xAccessor, xScale, yAccessor, yScale, data, chartType }) => {

  const lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  return (
    <path d={ lineGenerator(data) }
          clipPath={ (chartType === DEFICIT) ? 'url(#clipDeficit)' :
            (chartType === AGGREGATE) ? 'url(#clipAggregate)' : 'url(#clipDaily)' }
          stroke="#0000FF"
          style={ {
            fill: 'none',
            strokeWidth: '1.5px',
            strokeLinecap: 'round'
          } } />
  );
};

export default Line;
