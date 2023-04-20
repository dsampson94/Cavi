import React from 'react';
import { line, selectAll } from 'd3';

import {
  AGGREGATE,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CANOPY_LINE,
  CANOPY_OUTSIDE_TEMPERATURE,
  DAILY,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_ETO,
  ETO_WEATHER,
  EXTENDED,
  HUMIDITY_LINE,
  HUMIDITY_WEATHER,
  LINE_100MM,
  LINE_200MM,
  LINE_300MM,
  LINE_400MM,
  LINE_600MM,
  LINE_800MM,
  OUTSIDE_LINE,
  RAIN_HUMIDITY,
  RAIN_LINE,
  SOIL_TEMPERATURE,
  TEMP_WEATHER,
  TEMPERATURE_MULTILINE,
  WEATHER_POPUP_MULTILINE
} from '../../../../tools/general/system-variables.util';

const Line = ({
                data,
                secondaryData,
                xAccessor,
                xScale,
                yAccessor,
                yScale,
                chartType,
                chartName,
                recommendationOffset,
                clipPath,
                isDarkMode,
                hiddenLineList
              }) => {

  switch (chartType) {
    case DEFICIT:
    case AGGREGATE:
    case EXTENDED:
    case DAILY:
      return <FieldChartLine data={ data }
                             secondaryData={ secondaryData }
                             recommendationOffset={ recommendationOffset }
                             chartName={ chartName }
                             chartType={ chartType }
                             xAccessor={ xAccessor }
                             yAccessor={ yAccessor }
                             xScale={ xScale }
                             yScale={ yScale }
                             clipPath={ clipPath }
                             isDarkMode={ isDarkMode }
                             hiddenLineList={ hiddenLineList } />;

    case TEMPERATURE_MULTILINE:
      return <TemperatureChartLine data={ data }
                                   recommendationOffset={ recommendationOffset }
                                   chartName={ chartName }
                                   chartType={ chartType }
                                   xAccessor={ xAccessor }
                                   yAccessor={ yAccessor }
                                   xScale={ xScale }
                                   yScale={ yScale }
                                   clipPath={ clipPath }
                                   isDarkMode={ isDarkMode }
                                   hiddenLineList={ hiddenLineList } />;

    case WEATHER_POPUP_MULTILINE:
      return <WeatherPopupChartLine data={ data }
                                    recommendationOffset={ recommendationOffset }
                                    chartName={ chartName }
                                    chartType={ chartType }
                                    xAccessor={ xAccessor }
                                    yAccessor={ yAccessor }
                                    xScale={ xScale }
                                    yScale={ yScale }
                                    clipPath={ clipPath }
                                    isDarkMode={ isDarkMode }
                                    hiddenLineList={ hiddenLineList } />;

    default:
      return <TemperatureChartLine data={ data }
                                   recommendationOffset={ recommendationOffset }
                                   chartName={ chartName }
                                   chartType={ chartType }
                                   xAccessor={ xAccessor }
                                   yAccessor={ yAccessor }
                                   xScale={ xScale }
                                   yScale={ yScale }
                                   clipPath={ clipPath }
                                   isDarkMode={ isDarkMode }
                                   hiddenLineList={ hiddenLineList } />;
  }
};

export default Line;

const FieldChartLine = ({
                          data,
                          secondaryData,
                          xAccessor,
                          xScale,
                          yAccessor,
                          yScale,
                          chartType,
                          chartName,
                          recommendationOffset,
                          clipPath,
                          isDarkMode,
                          hiddenLineList
                        }) => {

  let lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  if (chartName === DEFICIT_ETO) {
    let lineYAccessor = d => d?.lineY;
    lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(lineYAccessor(d)));
  }

  selectAll('.line').on('contextmenu ', event => event.preventDefault());

  const getLineColor = (color) => {
    if (color) return color;
    if (chartName === AGGREGATE_TOP_SOIL) return 'url(#lineGradientAggregateTop)';
    else if (chartName === AGGREGATE_BOTTOM_SOIL) return 'url(#lineGradientAggregateBottom)';
    else if ((chartName === DEFICIT_ETO || chartName === DAILY_ETO) && isDarkMode) return 'white';
    else if ((chartName === DEFICIT_ETO || chartName === DAILY_ETO) && !isDarkMode) return 'black';
    else if (isDarkMode) return '#0090ff';
    else if (!isDarkMode) return '#0000FF';
  };

  return (
    <g>
      { chartName === AGGREGATE_TOP_SOIL && <defs>
        <linearGradient id="lineGradientAggregateTop">
          <stop offset={ `${ recommendationOffset }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ recommendationOffset - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
      </defs> }

      { chartName === AGGREGATE_BOTTOM_SOIL && <defs>
        <linearGradient id="lineGradientAggregateBottom">
          <stop offset={ `${ recommendationOffset }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ recommendationOffset - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
      </defs> }

      <path className={ 'line' }
            d={ lineGenerator(data) }
            clipPath={ clipPath }
            stroke={ getLineColor() }
            style={ {
              display: chartType === DAILY ? hiddenLineList?.includes('Forecast') ? 'flex' : 'none' : 'flex',
              fill: 'none',
              strokeWidth: chartType === AGGREGATE ? '1.8px' : '1.8px',
              strokeLinecap: 'round'
            } } />

      { secondaryData &&
      <path className={ 'secondaryLine' }
            d={ lineGenerator(secondaryData) }
            clipPath={ clipPath }
            stroke={ getLineColor('#2AE851') }
            style={ {
              display: chartType === DAILY ? hiddenLineList?.includes('Actual') ? 'flex' : 'none' : 'flex',
              fill: 'none',
              strokeWidth: chartType === AGGREGATE ? '1.8px' : '1.8px',
              strokeLinecap: 'round'
            } } /> }

      <ReferenceLine xScale={ xScale }
                     yScale={ yScale }
                     xAccessor={ xAccessor }
                     clipPath={ clipPath }
                     data={ data }
                     chartName={ chartName }
                     isDarkMode={ isDarkMode } />
    </g>
  );
};

const TemperatureChartLine = ({ xAccessor, xScale, yAccessor, yScale, data, chartName, clipPath, isDarkMode, hiddenLineList }) => {

  let lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  selectAll('.line').on('contextmenu ', event => event.preventDefault());

  switch (chartName) {
    case SOIL_TEMPERATURE:
      return (
        <g>
          { hiddenLineList.includes(LINE_100MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ isDarkMode ? '#0090ff' : '#0000FF' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(LINE_200MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[1]) }
                clipPath={ clipPath }
                stroke={ '#f37b2c' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(LINE_300MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[2]) }
                clipPath={ clipPath }
                stroke={ '#ea3a3d' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(LINE_400MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[3]) }
                clipPath={ clipPath }
                stroke={ '#47FFFF' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(LINE_600MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[4]) }
                clipPath={ clipPath }
                stroke={ '#1ad598' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(LINE_800MM) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[5]) }
                clipPath={ clipPath }
                stroke={ 'green' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }
        </g>
      );
    case CANOPY_OUTSIDE_TEMPERATURE:
      return (
        <g>
          { hiddenLineList.includes(CANOPY_LINE) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ isDarkMode ? '#0090ff' : '#0000FF' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(OUTSIDE_LINE) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[1]) }
                clipPath={ clipPath }
                stroke={ '#f37b2c' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }
        </g>
      );
    case RAIN_HUMIDITY:
      return (
        <g>
          { hiddenLineList.includes(RAIN_LINE) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ isDarkMode ? '#0090ff' : '#0000FF' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }

          { hiddenLineList.includes(HUMIDITY_LINE) &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[1]) }
                clipPath={ clipPath }
                stroke={ '#f37b2c' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }
        </g>
      );
  }
};

const WeatherPopupChartLine = ({ xAccessor, xScale, yAccessor, yScale, data, chartName, clipPath, isDarkMode, hiddenLineList }) => {

  let lineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(yAccessor(d)));

  selectAll('.line').on('contextmenu ', event => event.preventDefault());

  switch (chartName) {
    case ETO_WEATHER:
      return (
        <g>
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ isDarkMode ? '#ea3a3d' : '#ea3a3d' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } />

          <path className={ 'line' }
                d={ lineGenerator(data?.[1]) }
                clipPath={ clipPath }
                stroke={ '#2AE851' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } />
        </g>
      );
    case TEMP_WEATHER:
      return (
        <g>
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ isDarkMode ? '#0090ff' : '#0000FF' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } />

          { data?.[1] &&
          <path className={ 'line' }
                d={ lineGenerator(data?.[1]) }
                clipPath={ clipPath }
                stroke={ '#f37b2c' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } /> }
        </g>
      );
    case HUMIDITY_WEATHER:
      return (
        <g>
          <path className={ 'line' }
                d={ lineGenerator(data?.[0]) }
                clipPath={ clipPath }
                stroke={ '#ea3a3d' }
                style={ {
                  fill: 'none',
                  strokeWidth: '1.8px',
                  strokeLinecap: 'round'
                } } />
        </g>
      );
    default:
      return (
        <g>
        </g>
      );
  }
};

const ReferenceLine = ({ xScale, yScale, xAccessor, clipPath, data, chartName, isDarkMode }) => {

  const width = 1.8;
  const opacity = isDarkMode ? 0.8 : 0.6;

  let idealAccessor = d => d?.ideal;
  let stressAccessor = d => d?.stress;
  let witherAccessor = d => d?.wither;

  const idealLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(idealAccessor(d)));
  const stressLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(stressAccessor(d)));
  const witherLineGenerator = line().x(d => xScale(xAccessor(d))).y(d => yScale(witherAccessor(d)));

  switch (chartName) {
    case AGGREGATE_TOP_SOIL:
      return <>
        <path className={ 'line' }
              d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ isDarkMode ? '#54a4d9' : '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    case AGGREGATE_BOTTOM_SOIL:
      return <>
        <path className={ 'line' }
              d={ idealLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ isDarkMode ? '#54a4d9' : '#0000FF' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ stressLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ '#FFA500' }
              strokeWidth={ width }
              opacity={ opacity } />

        <path className={ 'line' }
              d={ witherLineGenerator(data) }
              clipPath={ clipPath }
              stroke={ 'red' }
              strokeWidth={ width }
              opacity={ opacity } />
      </>;
    default:
      return <></>;
  }
};

