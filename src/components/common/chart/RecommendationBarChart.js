import React from 'react';
import { useSelector } from 'react-redux';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const RecommendationBarChart = ({ fieldRainDataForChart }) => {

  const activeTheme = useSelector(state => state.system.theme);

  const mappedData = () => {
    const { reen } = fieldRainDataForChart;
    if (reen) return Object.entries(reen).map(([key, value]) => {
      return {
        'name': key,
        'uv': value
      };
    });
  };

  const formatDates = (tickItem) => {
    if (!tickItem) return;
    if (tickItem?.includes(':')) {
      const date = new Date(tickItem)?.toUTCString()?.split(' ');
      return `${ date[4] } `;
    } else {
      const date = new Date(tickItem)?.toUTCString()?.split(' ');
      return `${ date[1] } ${ date[2] }`;
    }
  };

  return (
    <BarChart width={ 750 } height={ 300 } data={ mappedData() }>
      <CartesianGrid strokeDasharray="3 1" />
      <YAxis tick={ { fill: (activeTheme === 'dark') ? 'white' : 'black' } }
             tickCount={ 10 } />
      <XAxis tick={ { fill: (activeTheme === 'dark') ? 'white' : 'black' } }
             tickFormatter={ (date) => formatDates(date) }
             interval={ 3 }
             fontSize={ 11 }
             dataKey="name" />
      <Tooltip />
      <Bar dataKey="uv" fill="#54a4d9" isAnimationActive={ false } />
    </BarChart>
  );
};

RecommendationBarChart.defaultProps = {};

RecommendationBarChart.propTypes = {};

export default RecommendationBarChart;
