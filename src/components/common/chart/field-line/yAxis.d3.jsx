import React from 'react';

import { useDimensionsContext } from './Chart.d3';

const YAxis = ({ yScale, chartName }) => {

  const dimensions = useDimensionsContext();
  const ticks = yScale.ticks(5);

  return (
    <g className="y-axis">

      <line key="y-axis__line"
            className="y-axis__line"
            y2={ dimensions.boundedHeight }
            stroke="#252529" />

      { ticks.map((t, index) => (
        <React.Fragment key={ `y-${ chartName }-${ t }-${ index }-container` }>

          <line className="y-axis__tick"
                x2={ -10 }
                y1={ yScale(t) }
                y2={ yScale(t) }
                stroke="#bdc3c7" />

          <line className="y-axis__tick"
                x2={ dimensions.boundedWidth }
                y1={ yScale(t) }
                y2={ yScale(t) }
                stroke="#dad9d5" />

          <text className="y-axis__tick__label"
                style={ { fontSize: 12 } }
                transform={ `translate(-28, ${ yScale(t) + 3 })` }>
            { t }
          </text>

        </React.Fragment>
      )) }
    </g>
  );
};

export default YAxis;
