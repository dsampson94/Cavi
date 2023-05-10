import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import useTheme from '../../../../tools/hooks/useTheme';

export function FieldPopupLineChart({ height, lines, hasXAxis, chartLabel }) {

  const { isDarkMode } = useTheme(false);

  const uniqueNames = Array.from(
    new Set(lines.flatMap(line => line?.data?.map(item => item.x)))
  );

  const mergedData = uniqueNames.map(x => {
    const dataItem = { x };
    lines.forEach(line => {
      const lineItem = line?.data?.find(item => item.x === x);
      if (lineItem) {
        dataItem[line.dataKey] = lineItem[line.dataKey];
      }
    });
    return dataItem;
  });

  const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-left bg-white border-2 border-gray-300 p-1 -mt-2 ml-2 rounded-lg shadow-xl">

        { payload.map((item, index) => (
            <>
              <p style={ { fontWeight: 'bold', color: 'black' } }>
                { '📅 ' + `${ item.payload.x }` }
              </p>
              <p key={ `payload-${ index }` }
                 className="text-black">
                { '📏 ' + `${ chartLabel }: ${ item.value }mm` }
              </p>
            </>
          )) }
        </div>
      );
    }
    return null;
  };

  const renderXAxisTick = ({ x, y, payload }) => (
    <text x={ x } y={ y } dy={ 16 } fill={ hasXAxis ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'black' : 'white') } textAnchor="middle">
      { payload.value.split(' ')[0] }
    </text>
  );

  return (
    <LineChart
      width={ 420 }
      height={ height }
      data={ mergedData }
      syncId="anyId"
      margin={ { top: 0, right: 0, left: 0, bottom: 0 } }
    >
      <CartesianGrid
        strokeDasharray="3 3"
      />
      { <XAxis dataKey="x" tick={ renderXAxisTick } /> }
      <YAxis reversed />

      <defs>
        <linearGradient id="lineGradientAggregateTop">
          <stop offset={ `${ 67 }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ 67 - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
        <linearGradient id="lineGradientAggregateBottom">
          <stop offset={ `${ 67 }%` } style={ { stopColor: isDarkMode ? 'white' : 'black' } } />
          <stop offset={ `${ 67 - 1 }%` } style={ { stopColor: isDarkMode ? '#47FFFF' : '#00B8B0' } } />
        </linearGradient>
      </defs>
      <Tooltip content={ <CustomTooltipContent /> } />
      { lines.map((line, index) => (
        <Line
          key={ index }
          type="monotone"
          dataKey={ line.dataKey }
          stroke={ line.color }
          strokeWidth={ 2 }
          dot={ false }
        />
      )) }
    </LineChart>
  );
}
