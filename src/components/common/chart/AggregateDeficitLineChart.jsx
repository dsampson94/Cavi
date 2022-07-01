import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { shape } from 'prop-types';

import './chart.scss';

const AggregateDeficitLineChart = ({ mappedChartList, chart }) => {

  const activeTheme = useSelector(state => state?.system?.theme);

  const options = {
    chart: {
      id: chart,
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
        offsetY: 9,
        autoSelected: 'zoom'
      }
    },
    yaxis: {
      reversed: true,
      decimalsInFloat: 1,
      axisBorder: {
        show: true,
        color: '#78909C'
      },
      axisTicks: {
        show: true,
        color: '#78909C'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      },
      axisBorder: {
        show: true,
        color: '#78909C'
      },
      tooltip: {
        enabled: true,
        formatter: function(val) {
          return `${ new Date(val).toLocaleDateString() } ${ new Date(val).toLocaleTimeString() }`;
        }
      }
    },
    stroke: {
      width: [1, 1, 1],
      curve: 'smooth'
    },
    tooltip: {
      enabled: true,
      intersect: false,
      theme: false,
      style: {
        fontSize: '10px'
      },
      x: {
        show: false
      },
      fixed: {
        enabled: true,
        position: 'topRight',
        offsetX: -15,
        offsetY: 25
      }
    }
  };

  const series = [
    {
      name: chart,
      data: mappedChartList
    }
  ];

  return (
    <div style={ { height: '24%' } }>
      <Chart type={ 'line' }
             options={ options }
             series={ series }
             width={ '100%' }
             height={ '120%' } />
    </div>
  );
};

AggregateDeficitLineChart.propTypes = {
  fieldRainDataForChart: shape({})
};

export default AggregateDeficitLineChart;
