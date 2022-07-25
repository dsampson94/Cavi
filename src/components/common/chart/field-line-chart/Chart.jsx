import React, { createContext, useContext } from 'react';
import { chartByName } from '../Chart.util';

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({ svgRef, dimensions, chartName, children }) => {

  return (
    <ChartContext.Provider value={ dimensions }>

      <svg className="chart"
           ref={ svgRef }
           style={ {
             width: '100%',
             height: '110%',
             backgroundColor: chartByName(chartName).backgroundColor
           } }>

        <g transform={ `translate(${ dimensions.marginLeft }, ${ dimensions.marginTop })` }>
          <defs>
            <clipPath id="clipDeficit">
              <rect width={ dimensions.boundedWidth }
                    height={ dimensions.boundedHeight }
                    x="0"
                    y="0" />
            </clipPath>
            <clipPath id="clipAggregate">
              <rect width={ dimensions.boundedWidth + 30 }
                    height={ dimensions.boundedHeight + 26 }
                    x="0"
                    y="0" />
            </clipPath>
            <clipPath id="clipDaily">
              <rect width={ dimensions.boundedWidth + 30 }
                    height={ dimensions.boundedHeight + 10 }
                    x="0"
                    y="0" />
            </clipPath>
          </defs>
          { children }
        </g>
      </svg>

    </ChartContext.Provider>
  );
};

export default Chart;
