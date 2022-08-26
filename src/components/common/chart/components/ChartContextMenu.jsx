import React, { useCallback, useEffect, useState } from 'react';

import { bisector } from 'd3';

import '../chart.scss';

const ChartContextMenu = ({
                            data,
                            date,
                            xAccessor,
                            yAccessor,
                            xScale,
                            yScale,
                            showPrimaryDropDown,
                            setShowPrimaryDropDown,
                            showSecondaryDropDown,
                            setShowSecondaryDropDown,
                            setHoverActive,
                            setActiveDataPeriod,
                            setXAxisViewMode
                          }) => {

  return <ContextMenu data={ data }
                      date={ date }
                      xScale={ xScale }
                      yScale={ yScale }
                      xAccessor={ xAccessor }
                      yAccessor={ yAccessor }
                      showPrimaryDropDown={ showPrimaryDropDown }
                      setShowPrimaryDropDown={ setShowPrimaryDropDown }
                      showSecondaryDropDown={ showSecondaryDropDown }
                      setShowSecondaryDropDown={ setShowSecondaryDropDown }
                      setHoverActive={ setHoverActive }
                      setActiveDataPeriod={ setActiveDataPeriod }
                      setXAxisViewMode={ setXAxisViewMode } />;
};

export default ChartContextMenu;

const ContextMenu = ({
                       data,
                       date,
                       xAccessor,
                       yAccessor,
                       xScale,
                       yScale,
                       showPrimaryDropDown,
                       setShowPrimaryDropDown,
                       showSecondaryDropDown,
                       setShowSecondaryDropDown,
                       setHoverActive,
                       setActiveDataPeriod,
                       setXAxisViewMode
                     }) => {

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [secondaryMenu, setSecondaryMenu] = useState(null);

  let dateBisector = bisector(xAccessor).center;
  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  const screenMidWidth = window.innerWidth / 2 + 50;
  const screenMidHeight = window.screen.height / 2 - 10;
  const isLessThanHalfWidth = (anchorPoint.x > screenMidWidth && anchorPoint.y < screenMidHeight);

  const handleContextMenu = useCallback((event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShowPrimaryDropDown(true);
      setShowSecondaryDropDown(false);
    },
    [setShowPrimaryDropDown, setAnchorPoint]
  );

  const handleLeftClick = (event) => {
    if (!event.target.id.includes('dropdown')) {
      setShowPrimaryDropDown(false);
      setShowSecondaryDropDown(false);
    } else if (event.target.id === 'dropdown-menu-1') {
      setShowSecondaryDropDown(!showSecondaryDropDown);
      setSecondaryMenu(1);
    } else if (event.target.id === 'dropdown-menu-2') {
      setShowSecondaryDropDown(!showSecondaryDropDown);
      setSecondaryMenu(2);
    } else if (event.target.id === 'dropdown-menu-3') {
      setShowSecondaryDropDown(!showSecondaryDropDown);
      setSecondaryMenu(3);
    }
  };

  const handlePeriodClick = (period) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode('contextMenu');
    setActiveDataPeriod(period);
  };

  useEffect(() => {
    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  if (anchorPoint?.x < (window.screen.width / 100 * 9)) return null;
  if (anchorPoint?.y < (window.screen.width / 100 * 9)) return null;

  return (
    <>
      { showPrimaryDropDown &&
        <div className="dropdown__popup"
             onMouseMove={ () => setHoverActive(true) }
             style={ { top: anchorPoint.y - 20, left: anchorPoint.x } }>

          { isLessThanHalfWidth ?
            <div>
              <div id={ 'dropdown-menu-1' } onClick={ handleLeftClick }>{ 'Start here and show...' }</div>
              <hr />
              <div>{ 'Calibrate Visually' }</div>
              <div id={ 'dropdown-menu-2' } onClick={ handleLeftClick }>{ 'Irrigations...' }</div>
              <hr />
              <div id={ 'dropdown-menu-3' } onClick={ handleLeftClick }>{ 'Export...' }</div>
              <hr />
              <div>{ 'Upload photo here' }</div>
              <hr />
              <div>{ 'Simulate from here...' }</div>
              <div>{ 'Seasonal Reflection...' }</div>
              <div>{ 'Show last year also' }</div>
              <div>{ 'Fix Spikes (ML)' }</div>
            </div>
            :
            <div>
              <div id={ 'dropdown-menu-1' }>{ 'Start here and show...' }</div>
              <div id={ 'dropdown-menu-2' }>{ 'Delete readings...' }</div>
              <div>{ 'Check for new readings from here...' }</div>
            </div> }
        </div> }

      { showSecondaryDropDown &&
        <div className="dropdown__popup"
             onMouseMove={ () => setHoverActive(true) }
             style={ {
               top: anchorPoint.y - 20,
               left: (isLessThanHalfWidth ? anchorPoint.x + 134 : anchorPoint.x + 202)
             } }>

          { isLessThanHalfWidth ?
            <div>
              { secondaryMenu === 1 && <>
                <div id={ 'option' } onClick={ () => handlePeriodClick(1) }>{ '1' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(7) }>{ '7' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(14) }>{ '14' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(28) }>{ '28' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(56) }>{ '56' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(100) }>{ '100' }</div>
              </> }

              { secondaryMenu === 2 && <>
                <div>{ 'Capture new Irrigation' }</div>
                <div>{ 'View Irrigations' }</div>
              </> }

              { secondaryMenu === 3 && <>
                <div>{ 'Raingauge readings to Excel' }</div>
                <div>{ 'Email Readings to myself ' }</div>
              </> }

            </div>
            :
            <div>
              { secondaryMenu === 1 && <>
                <div id={ 'option' } onClick={ () => handlePeriodClick(1) }>{ '1' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(7) }>{ '7' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(14) }>{ '14' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(28) }>{ '28' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(56) }>{ '56' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(100) }>{ '100' }</div>
              </> }

              { secondaryMenu === 2 && <>
                <div id={ 'dropdown-menu-1' } onClick={ handleLeftClick }>{ 'Delete all readins up to this point' }</div>
                <div>{ 'Set start point to delete readings' }</div>
                <div>{ 'Delete all readings from start point to here' }</div>
              </> }
            </div> }
        </div> }
    </>
  );
};
