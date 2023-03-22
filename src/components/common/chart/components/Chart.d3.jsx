import React, { createContext, useContext } from 'react';

import { chartByName } from '../Chart.util';
import { EXTENDED } from '../../../../tools/general/system-variables.util';
import CheckboxFilter from './CheckboxFilter';

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({
                 svgRef,
                 dimensions,
                 chartName,
                 chartType,
                 chartInfo,
                 children,
                 isDarkMode,
                 hiddenLineList,
                 setHiddenLineList,
                 secondaryData
               }) => {
  return (
    <ChartContext.Provider value={ dimensions }>

      <CheckboxFilter
        chartName={ chartName }
        hiddenLineList={ hiddenLineList }
        setHiddenLineList={ setHiddenLineList }
        secondaryData={ secondaryData }
      />

      <svg
        className="chart"
        ref={ svgRef }
        style={ {
          width: '100%',
          height: '110%',
          backgroundColor: chartByName(chartName, isDarkMode).backgroundColor
        } }
      >
        <g transform={ `translate(${ dimensions.marginLeft }, ${ dimensions.marginTop })` }>
          <defs>
            <clipPath id="clipDeficit">
              <rect
                width={ dimensions.boundedWidth }
                height={ dimensions.boundedHeight }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipAggregate">
              <rect
                width={ dimensions.boundedWidth * 1.01 }
                height={ dimensions.boundedHeight * 1.22 }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipUsage">
              <rect
                width={ dimensions.boundedWidth * 0.94 }
                height={ dimensions.width }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipDaily">
              <rect
                width={ dimensions.boundedWidth * 0.94 }
                height={ dimensions.boundedHeight * 1.06 }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipTemperaturesMulti">
              <rect
                width={ dimensions.boundedWidth * 0.99 }
                height={ dimensions.boundedHeight }
                x="0"
                y="0"
              />
            </clipPath>
          </defs>
          { children }
        </g>
      </svg>

      { (chartType !== EXTENDED) && (
        <div
          className="chart__info"
          onContextMenu={ (event) => event.preventDefault() }
        >
          { chartInfo }
        </div>
      ) }
    </ChartContext.Provider>
  );
};

export default Chart;
