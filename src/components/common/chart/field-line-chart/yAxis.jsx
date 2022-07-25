import React from 'react';

import { useDimensionsContext } from './Chart';

const YAxis = ({ scale: yScale }) => {

  const dimensions = useDimensionsContext();
  const ticks = yScale.ticks(5);

  return (
    <g className="y-axis">

      <line key="y-axis__line"
            className="y-axis__line"
            y2={ dimensions.boundedHeight }
            stroke="#252529" />

      { ticks.map((t, index) => (
        <React.Fragment key={ `y-${ t }-container-${ index }` }>

          <line className="y-axis__tick"
                key={ `y-axis__tick-${ index }-${ t }` }
                x2={ -10 }
                y1={ yScale(t) }
                y2={ yScale(t) }
                stroke="#bdc3c7" />

          <line className="y-axis__tick"
                key={ `y-axis__tick-${ index }-${ t }` }
                style={ { position: 'relative', zIndex: 2 } }
                x2={ dimensions.boundedWidth }
                y1={ yScale(t) }
                y2={ yScale(t) }
                stroke="#dad9d5" />

          <text key={ `y-axis__tick__label-${ index }-${ t }` }
                className="y-axis__tick__label"
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
