import React, { useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceArea, Tooltip, XAxis, YAxis } from 'recharts';
import { retrieveActiveThemeFromLocalStorage } from '../../../../tools/storage/localStorage';

export function WeatherPopupLineChart({ height, lines }) {

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode] = useState(!(getTheme === 'dark'));

  const isNightTime = (date) => {
    const hour = new Date(date).getHours();
    return hour < 6 || hour >= 19;
  };

  const uniqueNames = Array.from(
    new Set(lines.flatMap(line => line.data.map(item => item.name)))
  );

  const mergedData = uniqueNames.map(name => {
    const dataItem = { name };
    lines.forEach(line => {
      const lineItem = line.data.find(item => item.name === name);
      if (lineItem) {
        dataItem[line.dataKey] = lineItem[line.dataKey];
      }
    });
    dataItem.isNight = isNightTime(dataItem.name);
    return dataItem;
  });

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isNight = isNightTime(label);
      return (
        <div style={ { textAlign: 'left', backgroundColor: 'white', border: 'none', borderRadius: '10px', padding: '8px' } }>
          <p style={ { fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' } }>
            { `${ label }${ isNight ? ' (Night)' : '' }` }
          </p>
          { payload.map((item, index) => (
            <p key={ `payload-${ index }` }
               style={ { color: item.color, fontWeight: 'bold' } }>
              { `${ item.name }: ${ item.value }` }
            </p>
          )) }
        </div>
      );
    }
    return null;
  };

  const formatXAxisTick = (tickItem) => {
    const date = new Date(tickItem);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${ hours }:${ minutes }`;
  };

  const nightTimeAreas = () => {
    const areas = [];
    let start = null;
    for (let i = 0; i < mergedData.length; i++) {
      const dataItem = mergedData[i];
      if (dataItem.isNight) {
        if (start === null) {
          start = dataItem.name;
        }
      } else {
        if (start !== null) {
          areas.push(
            <ReferenceArea
              key={ areas.length }
              x1={ start }
              x2={ dataItem.name }
              fill="darkblue"
              opacity={ 0.2 }
            />
          );
          start = null;
        }
      }
    }
    if (start !== null) {
      areas.push(
        <ReferenceArea
          key={ areas.length }
          x1={ start }
          x2={ mergedData[mergedData.length - 1].name }
          fill="darkblue"
          opacity={ 0.2 }
        />
      );
    }
    return areas;
  };

  return (
    <LineChart
      width={ 380 }
      height={ height }
      data={ mergedData }
      margin={ { top: 30, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid
        strokeDasharray="3 3"
      />
      <XAxis dataKey="name" tickFormatter={ formatXAxisTick } />
      <YAxis />
      <Tooltip content={ <CustomTooltipContent /> } />
      { nightTimeAreas() }
      { lines.map((line, index) => (
        <Line
          key={ index }
          type="monotone"
          dataKey={ line.dataKey }
          stroke={ line.color }
          dot={ false }
        />
      )) }
    </LineChart>
  );
}
