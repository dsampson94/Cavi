import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { shape } from 'prop-types';

import {
  AGGREGATE,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_100MM,
  DEFICIT_200MM,
  DEFICIT_300MM,
  DEFICIT_400MM,
  DEFICIT_600MM,
  DEFICIT_800MM,
  USAGE_ETC
} from '../../../tools/general/system-variables.util';

import { ChartHeader } from './Chart.util';

import './chart.scss';

const FieldLineChart = ({ mappedChartList, chartType, chartName, chartInfo, recommendationOffset, hasXAxis, hasToolbar }) => {

  const activeTheme = useSelector(state => state?.system?.theme);

  const chartByName = () => {
    switch (chartName) {
      case DEFICIT_100MM :
        return { header: '' };
      case DEFICIT_200MM :
        return { header: '' };
      case DEFICIT_300MM :
        return { header: '' };
      case DEFICIT_400MM :
        return { header: '' };
      case DEFICIT_600MM :
        return { header: '' };
      case DEFICIT_800MM :
        return { header: '' };
      case AGGREGATE_TOP_SOIL :
        return { header: 'Topsoil', marginBottom: '1%', backgroundColor: '#ABD4EF' };
      case AGGREGATE_BOTTOM_SOIL :
        return { header: 'Bottomsoil', backgroundColor: '#C1EAC7' };
      case USAGE_ETC :
        return { header: USAGE_ETC };
      case DAILY_ETO :
        return { header: DAILY_ETO };
    }
  };

  const chartByType = () => {
    switch (chartType) {
      case DEFICIT :
        return { div: (hasXAxis ? '17.4%' : '15.2%'), chart: '135%', offsetY: '0', tooltipOffsetY: '22', titleOffsetY: 6 };
      case AGGREGATE :
        return { div: '50%', chart: '105%', offsetY: '-22', tooltipOffsetY: '2', titleOffsetY: 8 };
      case USAGE_ETC :
        return { div: '51%', chart: '105%', offsetY: '-22', tooltipOffsetY: '2', titleOffsetY: 9 };
      case DAILY_ETO :
        return { div: '50.5%', chart: '105%', offsetY: '-25', tooltipOffsetY: '2', titleOffsetY: 9 };
    }
  };

  const [options] = useState({
    title: {
      text: chartByName()?.header,
      align: 'center',
      offsetX: 0,
      offsetY: chartByType().titleOffsetY,
      floating: true,
      style: {
        fontSize: '10px',
        fontWeight: 'bold',
        color: (activeTheme === 'dark') ? (chartType === AGGREGATE) ? '#263238' : 'white' : '#263238'
      }
    },
    chart: {
      id: chartName,
      group: 'charts',
      offsetY: chartByType().offsetY,
      offsetX: -1,
      animations: {
        enabled: false
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      },
      toolbar: {
        show: hasToolbar,
        offsetY: 5,
        offsetX: '0%',
        autoSelected: 'pan'
      }
    },
    grid: {
      show: true,
      borderColor: (activeTheme === 'dark') ? 'rgba(160, 180, 190, 0.40)' : '#dad9d5',
      strokeDashArray: 0.5,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      row: {
        colors: ['#e5e5e5', 'white'],
        opacity: 1
      },
      column: {
        colors: ['white', 'white']
      }
    },
    // annotations: {
    //   position: 'back',
    //   yaxis: [
    //     {
    //       y: 0,
    //       borderColor: 'black'
    //     }
    //   ]
    // },
    yaxis: {
      reversed: (chartType === DEFICIT || chartType === AGGREGATE),
      decimalsInFloat: 1,
      tickAmount: 6,
      // min: (type === DEFICIT) ? -20 : undefined,
      // max: (type === DEFICIT) ? 20 : undefined,
      labels: {
        show: true,
        align: 'right',
        maxWidth: 28,
        style: {
          colors: (chartType === AGGREGATE) ?
            (activeTheme === 'dark') ? 'black' : 'black'
            : (activeTheme === 'dark') ? 'white' : 'black',
          fontSize: '8.5px'
        }
      },
      axisBorder: {
        show: true,
        color: (chartType === AGGREGATE) ? 'black' :
          (activeTheme === 'dark') ? 'black' : 'black'
      },
      axisTicks: {
        show: true,
        color: (chartType === AGGREGATE) ? 'black' :
          (activeTheme === 'dark') ? 'white' : 'black'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: hasXAxis,
        hideOverlappingLabels: true,
        formatter: function(value) {
          return new Date(value).toLocaleString().split(',')[0];
        },
        style: {
          colors: (activeTheme === 'dark') ? 'white' : 'black',
          fontSize: '9px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: (chartType === AGGREGATE) ? 'black' :
          (activeTheme === 'dark') ? 'black' : 'black'
      },
      axisTicks: {
        show: true,
        color: (chartType === AGGREGATE) ? 'black' :
          (activeTheme === 'dark') ? 'white' : 'black'
      },
      tooltip: {
        enabled: false
      }
    },
    fill: (chartType === AGGREGATE) ? {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          {
            offset: recommendationOffset + 1,
            color: 'black'
          },
          {
            offset: recommendationOffset,
            color: '#00B8B0'
          }
        ]
      }
    } : {},
    stroke: {
      width: 1.8,
      colors: (chartType === DEFICIT) ? '#2222FF' : '#000',
      curve: 'straight'
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '10px'
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const value = series[seriesIndex][dataPointIndex];
        const depth = chartInfo?.split(' ')[1].slice(1, -1);
        const date = w?.globals?.initialSeries[0].data[dataPointIndex].x;
        if (chartType === 'deficit') {
          if (value !== null)
            return '<div class="custom_tooltip--deficit">' +
              '<span>' + ` ${ value + 'mm' } ${ depth } ${ date } ` + '</span>' +
              '</div>';
          else
            return '<div class="custom_tooltip--aggregate">' +
              '<span>' + ` ${ depth } ${ date } ` + '</span>' +
              '</div>';
        } else {
          return '<div class="custom_tooltip--aggregate">' +
            '<span>' + `${ value }mm ${ date } ` + '</span>' +
            '</div>';
        }
      },
      fixed: {
        enabled: true,
        position: 'topRight',
        offsetX: -10,
        offsetY: chartByType()?.tooltipOffsetY
      }
    }
  });

  return (
    <div style={ {
      height: chartByType()?.div,
      marginTop: chartByName().marginTop,
      marginBottom: chartByName().marginBottom,
      backgroundColor: chartByName().backgroundColor,
      borderRadius: '10px'
    } }>

      <ChartHeader chartName={ chartName } />

      <Chart type={ 'line' }
             options={ options }
             width={ '100%' }
             height={ chartByType()?.chart }
             series={ [
               {
                 name: chartName,
                 data: mappedChartList
               }] } />
    </div>
  );
};

FieldLineChart.propTypes = {
  fieldRainDataForChart: shape({})
};

export default FieldLineChart;
