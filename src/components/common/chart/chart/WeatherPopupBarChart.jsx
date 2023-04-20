import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { retrieveActiveThemeFromLocalStorage } from '../../../../tools/storage/localStorage';

export function WeatherPopupBarChart({ data }) {

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode] = useState(!(getTheme === 'dark'));

  function getFullMonthName(shortMonthName) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const index = monthNames.findIndex(name => name.startsWith(shortMonthName));
    if (index !== -1) {
      return monthNames[index];
    } else {
      return null;
    }
  }

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const fullMonthName = getFullMonthName(label);
      return (
        <div style={ { textAlign: 'left', backgroundColor: 'white', border: 'none', borderRadius: '10px', padding: '8px' } }>
          { fullMonthName && (
            <p style={ { fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' } }>
              { fullMonthName }
            </p>
          ) }
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


  return (
    <BarChart
      width={ 380 }
      height={ 350 }
      data={ data }
      margin={ { top: 50, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={ <CustomTooltipContent /> } />
      <Bar dataKey={ new Date().getFullYear() - 1 } label="Last Year" fill="#65cef7" />
      <Bar dataKey={ new Date().getFullYear() } label="This Year" fill="#1b6dff" />
    </BarChart>
  );
}
