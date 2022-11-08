import React, { createContext, useContext } from 'react';

import { chartByName } from '../Chart.util';
import { EXTENDED } from '../../../../tools/general/system-variables.util';

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({ svgRef, dimensions, chartName, chartType, chartInfo, children, isDarkMode }) => {

  return (
    <ChartContext.Provider value={ dimensions }>
      <svg className="chart"
           ref={ svgRef }
           style={ {
             width: '100%',
             height: '110%',
             backgroundColor: chartByName(chartName, isDarkMode).backgroundColor
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
              <rect width={ '94%' }
                    height={ '115%' }
                    x="0"
                    y="0" />
            </clipPath>
            <clipPath id="clipUsage">
              <rect width={ '94%' }
                    height={ dimensions.width }
                    x="0"
                    y="0" />
            </clipPath>
            <clipPath id="clipDaily">
              <rect width={ '94%' }
                    height={ '98%' }
                    x="0"
                    y="0" />
            </clipPath>
            <clipPath id="clipTemperaturesMulti">
              <rect width={ '99%' }
                    height={ '76%' }
                    x="0"
                    y="0" />
            </clipPath>
          </defs>
          { children }
        </g>
      </svg>

      { (chartType !== EXTENDED) &&
        <div className="chart__info"
             onContextMenu={ event => event.preventDefault() }>
          { chartInfo }
        </div> }

    </ChartContext.Provider>
  );
};

export default Chart;
