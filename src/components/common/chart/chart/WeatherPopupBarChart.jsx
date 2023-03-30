import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 }
];

export function WeatherPopupBarChart() {
  return (
    <BarChart
      width={ 300 }
      height={ 260 }
      data={ data }
      margin={ { top: 0, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend layout="vertical" align="center" verticalAlign="top" />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
