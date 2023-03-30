import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 }
];

export function WeatherPopupLineChart({ height }) {
  return (
    <LineChart
      width={ 300 }
      height={ height }
      data={ data }
      margin={ { top: 20, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend layout="vertical" align="center" verticalAlign="top" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={ { r: 8 } } />
    </LineChart>
  );
}
