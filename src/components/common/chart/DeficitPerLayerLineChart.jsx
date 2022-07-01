import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { shape } from 'prop-types';


import './chart.scss';

const DeficitPerLayerLineChart = ({ mappedChartList, chart, hasXAxis }) => {

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
      labels: {
        show: true,
        align: 'right',
        style: {
          fontSize: '7px'
        }
      },
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
        enabled: false
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
        show: true,
        formatter: function(val) {
          return `${ new Date(val).toLocaleDateString() } ${ new Date(val).toLocaleTimeString() }`;
        }
      },
      y: {
        title: {
          formatter: (seriesName) => seriesName
        }
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
    <div style={ { height: '16%', marginLeft: -10 } }>
      <Chart type={ 'line' }
             options={ options }
             series={ series }
             width={ '100%' }
             height={ '120%' } />
    </div>
  );
};

DeficitPerLayerLineChart.propTypes = {
  fieldRainDataForChart: shape({})
};

export default DeficitPerLayerLineChart;
