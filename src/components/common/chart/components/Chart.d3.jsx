import React, { createContext, useContext } from 'react';

import { chartByName } from '../Chart.util';
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
          height: '100%',
          paddingTop: '1px',
          borderRadius: '12px',
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
                width={ dimensions.boundedWidth * 1.04 }
                height={ dimensions.boundedHeight * 1.52 }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipUsage">
              <rect
                width={ dimensions.boundedWidth * 1.04 }
                height={ dimensions.height * 1.395 }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="clipDaily">
              <rect
                width={ dimensions.boundedWidth * 1.04 }
                height={ dimensions.boundedHeight * 1.42 }
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
            <clipPath id="weatherPopupBarAndLineTop">
              <rect
                width={ dimensions.boundedWidth * 0.99 }
                height={ dimensions.boundedHeight }
                x="0"
                y="0"
              />
            </clipPath>
            <clipPath id="weatherPopupBarAndLineBottom">
              <rect
                width={ dimensions.boundedWidth * 0.99 }
                height={ dimensions.boundedHeight }
                x="0"
                y="0"
              />
            </clipPath>
          </defs>

          { children }

          <text
            y="17%"
            x="92%"
            text-anchor="end"
            fill={ 'cornflowerblue' }
            onContextMenu={ (event) => event.preventDefault() }
          >
            { chartInfo }
          </text>
        </g>
      </svg>

    </ChartContext.Provider>
  );
};

export default Chart;
