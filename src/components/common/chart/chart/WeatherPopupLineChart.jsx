import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export function WeatherPopupLineChart({ height, lines }) {

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
    return dataItem;
  });

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={ { textAlign: 'center', backgroundColor: 'white', border: 'none', borderRadius: '10px', padding: '1px' } }>
          <p>
            { `${ label }` }
          </p>
          { payload.map((item, index) => (
            <p key={ `payload-${ index }` }
               style={ { color: item.color } }>
              { `${ item.name }: ${ item.value }` }
            </p>
          )) }
        </div>
      );
    }
    return null;
  };

  const formatXAxisTick = (tickItem) => {
    const time = new Date(tickItem).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return time;
  };

  return (
    <LineChart
      width={ 380 }
      height={ height }
      data={ mergedData }
      margin={ { top: 30, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tickFormatter={ formatXAxisTick } />
      <YAxis />
      <Tooltip
        content={ <CustomTooltipContent /> }
      />

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
