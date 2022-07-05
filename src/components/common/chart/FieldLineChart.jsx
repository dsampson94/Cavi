import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { shape } from 'prop-types';

import { AGGREGATE, DAILY_ETO, DEFICIT, USAGE_ETC } from '../../../tools/general/system-variables.util';

import './chart.scss';

const FieldLineChart = ({ mappedChartList, chart, type, hasXAxis, hasToolbar }) => {

  const activeTheme = useSelector(state => state?.system?.theme);

  const [options] = useState({
    chart: {
      id: 'chart',
      group: 'charts',
      animations: {
        enabled: false
      },
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: hasToolbar,
        offsetY: 5,
        offsetX: '50%',
        autoSelected: 'pan'
      }
    },
    grid: {
      show: true,
      borderColor: (activeTheme === 'dark') ? 'rgba(160, 180, 190, 0.40)' : ' #dad9d5',
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
      }
    },
    yaxis: {
      reversed: true,
      decimalsInFloat: 1,
      labels: {
        show: true,
        align: 'right',
        maxWidth: 19,
        style: {
          colors: (activeTheme === 'dark') ? 'white' : 'black',
          fontSize: '7px'
        }
      },
      axisBorder: {
        show: true,
        color: (activeTheme === 'dark') ? 'white' : '#78909C'
      },
      axisTicks: {
        show: true,
        color: (activeTheme === 'dark') ? 'white' : '#78909C'
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
          fontSize: '10px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: (activeTheme === 'dark') ? 'white' : '#78909C'
      },
      axisTicks: {
        show: true,
        color: (activeTheme === 'dark') ? 'white' : '#78909C'
      },
      tooltip: {
        enabled: false
      }
    },
    stroke: {
      width: 1.8,
      curve: 'straight'
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '10px'
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const value = series[seriesIndex][dataPointIndex];
        const depth = chart?.split(' ')[1].slice(1, -1);
        const date = w?.globals?.initialSeries[0].data[dataPointIndex].x;
        if (type === 'deficit')
          return '<div class="custom_tooltip--deficit">' +
            '<span>' + `${ value }mm ${ depth } ${ date } ` + '</span>' +
            '</div>';
        else
          return '<div class="custom_tooltip--aggregate">' +
            '<span>' + `${ value }mm ${ depth } ${ date } ` + '</span>' +
            '</div>';
      },
      fixed: {
        enabled: true,
        position: 'topRight',
        offsetX: -10,
        offsetY: 22
      }
    }
  });

  const chartHeight = () => {
    switch (type) {
      case DEFICIT :
        return { div: (hasXAxis ? '18%' : '15.1%'), chart: '135%' };
      case AGGREGATE :
        return { div: '24%', chart: '120%' };
      case USAGE_ETC :
        return { div: '23%', chart: '120%' };
      case DAILY_ETO :
        return { div: '24.1%', chart: '120%' };
    }
  };

  return (
    <div style={ { height: chartHeight()?.div } }>
      <Chart type={ 'line' }
             options={ options }
             width={ '100%' }
             height={ chartHeight()?.chart }
             series={ [
               {
                 name: chart,
                 data: mappedChartList
               }] } />
    </div>
  );
};

FieldLineChart.propTypes = {
  fieldRainDataForChart: shape({})
};

export default FieldLineChart;
