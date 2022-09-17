import React, { useCallback, useEffect, useState } from 'react';

import { bisector } from 'd3';

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
                            setXAxisViewMode,
                            activeProbeFactor,
                            setActiveProbeFactor,
                            activeDataPeriod
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
                      setXAxisViewMode={ setXAxisViewMode }
                      activeProbeFactor={ activeProbeFactor }
                      setActiveProbeFactor={ setActiveProbeFactor }
                      activeDataPeriod={ activeDataPeriod } />;
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
                       setXAxisViewMode,
                       activeProbeFactor,
                       setActiveProbeFactor,
                       activeDataPeriod
                     }) => {

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [secondaryMenu, setSecondaryMenu] = useState(null);

  let dateBisector = bisector(xAccessor).center;
  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  const screenMidWidth = window.innerWidth / 2 + 50;
  const screenMidHeight = window.screen.height / 2 - 10;
  const isLessThanHalfWidth = (anchorPoint.x > screenMidWidth && anchorPoint.y < screenMidHeight);

  const screenInvertMenuWidth = window.innerWidth * 4 / 5;
  const screenInvertMenuHeight = window.innerHeight * 3 / 5;

  const shouldDisplayLeft = (anchorPoint.x > screenInvertMenuWidth);
  const shouldDisplayFurtherUp = (anchorPoint.y > screenInvertMenuHeight);

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
    } else if (event.target.id === 'dropdown-menu-2-input') {
      setShowSecondaryDropDown(true);
    } else if (event.target.id === 'dropdown-menu-3') {
      setShowSecondaryDropDown(!showSecondaryDropDown);
      setSecondaryMenu(3);
    } else if (event.target.id === 'dropdown-menu-4') {
      setShowSecondaryDropDown(!showSecondaryDropDown);
      setSecondaryMenu(4);
    }
  };

  const handlePeriodClick = (period) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode('contextMenu');
    setActiveDataPeriod(period);
  };

  const handleFactorClick = (factor) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode('contextMenu');
    setActiveProbeFactor(factor);
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
             style={ {
               top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
               left: shouldDisplayLeft ? anchorPoint.x - 150 : anchorPoint.x
             } }>

          { isLessThanHalfWidth ?
            <div>
              <div id={ 'dropdown-menu-1' } onClick={ handleLeftClick }>{ 'Start here and show...' }</div>
              <hr />
              <div id={ 'dropdown-menu-2' } onClick={ handleLeftClick }>{ 'Calibrate Visually' }</div>
              <div id={ 'dropdown-menu-3' } onClick={ handleLeftClick }>{ 'Irrigations...' }</div>
              <hr />
              <div id={ 'dropdown-menu-4' } onClick={ handleLeftClick }>{ 'Export...' }</div>
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
               top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
               left: shouldDisplayLeft ? anchorPoint.x - 322 :
                 (isLessThanHalfWidth ? anchorPoint.x + 134 : anchorPoint.x + 202),
               width: '170px'
             } }>

          { isLessThanHalfWidth ?
            <div>
              { secondaryMenu === 1 && <>
                <p>{ 'Days:' }</p>
                <hr />
                <div id={ 'option' } onClick={ () => handlePeriodClick(1) }>{ '1' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(7) }>{ '7' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(14) }>{ '14' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(28) }>{ '28' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(56) }>{ '56' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(100) }>{ '100' }</div>
                <hr />
                <input id={ 'dropdown-menu-2-input' }
                       type={ 'number' }
                       autoFocus
                       value={ activeDataPeriod }
                       placeholder={ '0' }
                       min={ '0' }
                       onChange={ ({ target }) => setActiveDataPeriod(target.value) } />
              </> }

              { secondaryMenu === 2 && <>
                <p>{ 'Recalibrate y-axis:' }</p>
                <hr />
                <div id={ 'option' } onClick={ () => handleFactorClick(0.5) }>{ '0.50x' }</div>
                <div id={ 'option' } onClick={ () => handleFactorClick(0.65) }>{ '0.65x' }</div>
                <div id={ 'option' } onClick={ () => handleFactorClick(0.8) }>{ '0.80x' }</div>
                <div id={ 'option' } onClick={ () => handleFactorClick(1.2) }>{ '1.20x' }</div>
                <div id={ 'option' } onClick={ () => handleFactorClick(2) }>{ '2.00x' }</div>
                <hr />
                <input id={ 'dropdown-menu-2-input' }
                       type={ 'number' }
                       autoFocus
                       step={ 0.1 }
                       min={ '0' }
                       max={ '5' }
                       placeholder={'0 - 5'}
                       value={ activeProbeFactor }
                       onChange={ ({ target }) => handleFactorClick(target.value) } />
              </> }

              { secondaryMenu === 3 && <>
                <div>{ 'Capture new Irrigation' }</div>
                <div>{ 'View Irrigations' }</div>
              </> }

              { secondaryMenu === 4 && <>
                <div>{ 'Raingauge readings to Excel' }</div>
                <div>{ 'Email Readings to myself ' }</div>
              </> }

            </div>
            :
            <div>
              { secondaryMenu === 1 && <>
                <p>{ 'Days:' }</p>
                <hr />
                <div id={ 'option' } onClick={ () => handlePeriodClick(1) }>{ '1' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(7) }>{ '7' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(14) }>{ '14' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(28) }>{ '28' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(56) }>{ '56' }</div>
                <div id={ 'option' } onClick={ () => handlePeriodClick(100) }>{ '100' }</div>
                <hr />
                <input id={ 'dropdown-menu-2-input' }
                       type={ 'number' }
                       autoFocus
                       value={ activeDataPeriod }
                       min={ '0' }
                       onChange={ ({ target }) => setActiveDataPeriod(target.value) } />
              </> }

              { secondaryMenu === 3 && <>
                <div id={ 'dropdown-menu-1' } onClick={ handleLeftClick }>{ 'Delete all readings up to this point' }</div>
                <div>{ 'Set start point to delete readings' }</div>
                <div>{ 'Delete all readings from start point to here' }</div>
              </> }
            </div> }
        </div> }
    </>
  );
};
