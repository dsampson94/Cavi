import React from 'react';

import { chartByName } from '../Chart.util';
import { AGGREGATE } from '../../../../tools/general/system-variables.util';

import { useDimensionsContext } from './Chart.d3';

const XAxis = ({ xScale, hasXAxis, chartName, chartType }) => {

  const dimensions = useDimensionsContext();
  const ticks = xScale.ticks(5);

  return (
    <g className="x-axis"
       transform={ `translate(0, ${ dimensions.boundedHeight })` }
       style={ {
         backgroundColor: chartByName(chartName).backgroundColor
       } }>

      <line x2={ chartType === AGGREGATE ? '92%' : dimensions.boundedWidth }
            className="x-axis__line"
            stroke="#252529" />

      { ticks.map((date, index) => (
        <React.Fragment key={ `x-${ chartName }-${ date }-${ index }-container` }>

          <line className="x-axis__tick"
                stroke="#bdc3c7"
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ 10 } />

          <line className="x-axis__tick"
                stroke="#dad9d5"
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ -dimensions.boundedHeight - -10 } />

          { hasXAxis &&
            <text className="x-axis__tick__label"
                  style={ { fontSize: 12 } }
                  transform={ `translate(${ xScale(date) - 26 }, 23)` }>
              { date.toLocaleDateString() }
            </text> }

        </React.Fragment>
      )) }
    </g>
  );
};

export default XAxis;
