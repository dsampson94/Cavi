import React from 'react';

import { bisector } from 'd3';

import useContextMenu from '../../../../tools/hooks/useContextMenu';

import '../chart.scss';

const ChartContextMenu = ({
                            data,
                            date,
                            xAccessor,
                            yAccessor,
                            xScale,
                            yScale,
                            hoverActive,
                            chartName,
                            showDropDown,
                            anchorPoint,
                            setHoverActive
                          }) => {

  return <ContextMenu data={ data }
                      date={ date }
                      xScale={ xScale }
                      yScale={ yScale }
                      xAccessor={ xAccessor }
                      yAccessor={ yAccessor }
                      hoverActive={ hoverActive }
                      chartName={ chartName }
                      showDropDown={ showDropDown }
                      anchorPoint={ anchorPoint }
                      setHoverActive={ setHoverActive } />;
};

export default ChartContextMenu;

const ContextMenu = ({
                       xAccessor,
                       yAccessor,
                       xScale,
                       yScale,
                       data,
                       date,
                       hoverActive,
                       chartName,
                       clipPath,
                       setHoverActive
                     }) => {

  const { showDropDown, anchorPoint } = useContextMenu();

  if (anchorPoint?.x < (window.screen.width / 100 * 9)) return null;
  if (anchorPoint?.y < (window.screen.width / 100 * 9)) return null;

  let dateBisector = bisector(xAccessor).center;
  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  const screenMidWidth = window.screen.width / 2 - 80;
  const screenMidHeight = window.screen.height / 2 - 80;

  return (
    <> { showDropDown &&
      <div className="dropdown__popup"
           onMouseMove={ () => setHoverActive(true) }
           style={ { top: anchorPoint.y - 20, left: anchorPoint.x } }>

        { (anchorPoint.x > screenMidWidth && anchorPoint.y < screenMidHeight) ?
          <>
            <div>{ 'Start here and show...' }</div>
            <div>{ 'Calibrate Visually' }</div>
            <div>{ 'Irrigations...' }</div>
            <div>{ 'Export...' }</div>
            <div>{ 'Simulate from here...' }</div>
            <div>{ 'Seasonal Reflection...' }</div>
            <div>{ 'Show last year also' }</div>
            <div>{ 'Fix Spikes (ML)' }</div>
          </>
          :
          <>
            <div>{ 'Start here and show...' }</div>
            <div>{ 'Delete readings...' }</div>
            <div>{ 'Check for new readings from here...' }</div>
          </> }
      </div> }
    </>
  );
};
