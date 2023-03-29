import React from 'react';
import { useSelector } from 'react-redux';

import { shape } from 'prop-types';

import { Bar, BarChart, CartesianGrid, ReferenceArea, Tooltip, XAxis, YAxis } from 'recharts';

const RecommendationBarChart = ({ fieldRainDataForChart }) => {

  const activeTheme = useSelector(state => state.system.theme);

  const mappedData = () => {
    const { reen } = fieldRainDataForChart;
    if (reen) return Object.entries(reen).map(([key, value]) => {
      return {
        'name': key,
        'val': value
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

  const isNightTime = (date) => {
    const hour = new Date(date).getHours();
    return hour < 9 || hour >= 21;
  };

  const nightTimeAreas = () => {
    const data = mappedData();
    const nightTimePeriods = [];
    for (let i = 0; i < data.length; i++) {
      if (!data[i]?.name?.includes(':')) return null;
      if (isNightTime(data[i].name)) {
        if (nightTimePeriods.length === 0 || data[i - 1] && !isNightTime(data[i - 1].name)) {
          nightTimePeriods.push({ start: data[i].name });
        }
      } else if (nightTimePeriods.length > 0 && isNightTime(data[i - 1]?.name)) {
        nightTimePeriods[nightTimePeriods.length - 1].end = data[i - 1].name;
      }
    }
    if (nightTimePeriods.length > 0 && !nightTimePeriods[nightTimePeriods.length - 1].end) {
      nightTimePeriods[nightTimePeriods.length - 1].end = data[data.length - 1].name;
    }
    return nightTimePeriods.map((period, index) => (
      <ReferenceArea key={ index } x1={ period.start } x2={ period.end } fill="slate" opacity={ 0.4 } />
    ));
  };

  return (
    <BarChart width={ 750 } height={ 300 } data={ mappedData() }>
      <CartesianGrid strokeDasharray={ '3 1' } />

      <YAxis tick={ { fill: activeTheme === 'dark' ? 'white' : 'black' } } tickCount={ 10 } />

      <XAxis
        tick={ { fill: activeTheme === 'dark' ? 'white' : 'black' } }
        tickFormatter={ (date) => formatDates(date) }
        interval={ 3 }
        fontSize={ 11 }
        dataKey={ 'name' }
      />

      <Tooltip labelClassName="dark:text-black" />

      { nightTimeAreas() }

      <Bar dataKey={ 'val' } fill={ '#54a4d9' } isAnimationActive={ false } />
    </BarChart>

  );
};

RecommendationBarChart.propTypes = {
  fieldRainDataForChart: shape({})
};

export default RecommendationBarChart;
