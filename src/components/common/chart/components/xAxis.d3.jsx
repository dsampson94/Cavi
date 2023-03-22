import React from 'react';

import { chartByName } from '../Chart.util';

import { useDimensionsContext } from './Chart.d3';

const XAxis = ({ xScale, hasXAxis, chartName, isDarkMode }) => {

  const dimensions = useDimensionsContext();
  const ticks = xScale.ticks(5);

  return (
    <g className="x-axis"
       transform={ `translate(0, ${ dimensions.boundedHeight })` }
       style={ {
         userSelect: 'none',
         backgroundColor: chartByName(chartName).backgroundColor
       } }>

      <line x2={ dimensions.boundedWidth }
            className="x-axis__line"
            stroke={ isDarkMode ? 'white' : '#252529' } />

      <line x2={ dimensions.boundedWidth }
            y1={ -dimensions.boundedHeight }
            y2={ -dimensions.boundedHeight }
            className="x-axis__line"
            stroke={ isDarkMode ? 'white' : '#252529' } />

      { hasXAxis &&
      <line className="x-axis__tick"
            stroke={ isDarkMode ? 'white' : 'black' }
            x1={ xScale(new Date()) }
            x2={ xScale(new Date()) }
            y1={ 1 }
            y2={ 7 } /> }

      { ticks.map((date, index) => (
        <React.Fragment key={ `x-${ chartName }-${ date }-${ index }-container` }>

          <line className="x-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ 10 } />

          <line className="x-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#dad9d5' }
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ -dimensions.boundedHeight + 10 } />

          { hasXAxis &&
          <g className="x-axis__tick__label"
             style={ { fontSize: 11 } }
             transform={ `translate(${ xScale(date) - 23 }, 23)` }
             fill={ isDarkMode ? 'white' : 'black' }>
            <text children={ `${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }` } />
          </g> }

        </React.Fragment>
      )) }
    </g>
  );
};

export default XAxis;
