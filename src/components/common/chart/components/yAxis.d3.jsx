import React from 'react';

import { useDimensionsContext } from './Chart.d3';

const YAxis = ({ yScale, chartName, isDarkMode }) => {

  const dimensions = useDimensionsContext();
  let ticks = yScale.ticks(5);

  return (
    <g className="y-axis"
       style={ { userSelect: 'none' } }>

      <line className="y-axis__line"
            y2={ dimensions.boundedHeight }
            stroke={ isDarkMode ? 'white' : '#252529' } />

      <line className="y-axis__line"
            x1={ dimensions.boundedWidth }
            x2={ dimensions.boundedWidth }
            y2={ dimensions.boundedHeight }
            stroke={ isDarkMode ? 'white' : '#252529' } />

      { ticks.map((t, index) => (
        <React.Fragment key={ `y-${ chartName }-${ t }-${ index }-container` }>

          <line className="y-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
                x2={ -10 }
                y1={ yScale(t) }
                y2={ yScale(t) } />

          { t === 0 &&
            <line className="y-axis__tick"
                  stroke={ isDarkMode ? 'white' : 'black' }
                  x2={ dimensions.boundedWidth }
                  y1={ yScale(t) }
                  y2={ yScale(t) }
                  opacity={ 0.8 } /> }

          <line className="y-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#dad9d5' }
                x2={ dimensions.boundedWidth }
                y1={ yScale(t) }
                y2={ yScale(t) } />

          <g className="y-axis__tick__label"
             style={ { fontSize: 11 } }
             fill={ isDarkMode ? 'white' : 'black' }
             transform={ `translate(-28, ${ yScale(t) + 3 })` }>
            <text>
              { t }
            </text>
          </g>

        </React.Fragment>
      )) }
    </g>
  );
};

export default YAxis;
