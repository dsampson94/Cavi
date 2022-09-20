import React, { useCallback, useEffect, useState } from 'react';

import {
  CALIBRATE_OPTION,
  CONTEXT_MENU,
  EXPORT_OPTION,
  IRRIGATION_OR_DELETE_OPTION,
  PERIOD_OPTION
} from '../../../../tools/general/system-variables.util';

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

  useEffect(() => {
    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

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
      handleOptionClick(secondaryMenu, PERIOD_OPTION);
    } else if (event.target.id === 'dropdown-menu-2') {
      handleOptionClick(secondaryMenu, CALIBRATE_OPTION);
    } else if (event.target.id === 'dropdown-menu-2-input') {
      setShowSecondaryDropDown(true);
    } else if (event.target.id === 'dropdown-menu-3') {
      handleOptionClick(secondaryMenu, IRRIGATION_OR_DELETE_OPTION);
    } else if (event.target.id === 'dropdown-menu-4') {
      handleOptionClick(secondaryMenu, EXPORT_OPTION);
    }
  };

  const handleOptionClick = (secondaryMenu, optionId) => {
    if (secondaryMenu === optionId && showSecondaryDropDown) setShowSecondaryDropDown(false);
    else setShowSecondaryDropDown(true);
    setSecondaryMenu(optionId);
  };

  if (anchorPoint?.x < (window.screen.width / 100 * 9)) return null;
  if (anchorPoint?.y < (window.screen.width / 100 * 9)) return null;

  return (
    <>
      { showPrimaryDropDown &&
        <PrimaryMenu handleLeftClick={ handleLeftClick }
                     setHoverActive={ setHoverActive }
                     shouldDisplayFurtherUp={ shouldDisplayFurtherUp }
                     isLessThanHalfWidth={ isLessThanHalfWidth }
                     shouldDisplayLeft={ shouldDisplayLeft }
                     anchorPoint={ anchorPoint } /> }

      { showSecondaryDropDown &&
        <SecondaryMenu handleLeftClick={ handleLeftClick }
                       setHoverActive={ setHoverActive }
                       setActiveProbeFactor={ setActiveProbeFactor }
                       setShowPrimaryDropDown={ setShowPrimaryDropDown }
                       setXAxisViewMode={ setXAxisViewMode }
                       setActiveDataPeriod={ setActiveDataPeriod }
                       activeDataPeriod={ activeDataPeriod }
                       activeProbeFactor={ activeProbeFactor }
                       shouldDisplayFurtherUp={ shouldDisplayFurtherUp }
                       isLessThanHalfWidth={ isLessThanHalfWidth }
                       shouldDisplayLeft={ shouldDisplayLeft }
                       anchorPoint={ anchorPoint }
                       secondaryMenu={ secondaryMenu } /> }
    </>
  );
};

const PrimaryMenu = ({ handleLeftClick, setHoverActive, shouldDisplayFurtherUp, isLessThanHalfWidth, shouldDisplayLeft, anchorPoint }) => {
  return (
    <div className="dropdown__popup"
         onMouseMove={ () => setHoverActive(true) }
         style={ {
           top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
           left: shouldDisplayLeft ? anchorPoint.x - 150 : anchorPoint.x
         } }>

      { isLessThanHalfWidth && <div>
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
      </div> }

      { !isLessThanHalfWidth && <div>
        <div id={ 'dropdown-menu-1' }>{ 'Start here and show...' }</div>
        <div id={ 'dropdown-menu-2' } onClick={ handleLeftClick }>{ 'Calibrate Visually' }</div>
        <div id={ 'dropdown-menu-3' }>{ 'Delete readings...' }</div>
        <div>{ 'Check for new readings from here...' }</div>
      </div> }
    </div>
  );
};

const SecondaryMenu = ({
                         handleLeftClick,
                         setHoverActive,
                         setActiveProbeFactor,
                         setShowPrimaryDropDown,
                         setXAxisViewMode,
                         setActiveDataPeriod,
                         activeDataPeriod,
                         activeProbeFactor,
                         shouldDisplayFurtherUp,
                         isLessThanHalfWidth,
                         shouldDisplayLeft,
                         anchorPoint,
                         secondaryMenu
                       }) => {

  return (
    <div className="dropdown__popup"
         onMouseMove={ () => setHoverActive(true) }
         style={ {
           top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
           left: shouldDisplayLeft ? anchorPoint.x - 322 : (isLessThanHalfWidth ? anchorPoint.x + 134 : anchorPoint.x + 202),
           width: (!isLessThanHalfWidth && secondaryMenu === 2) ? '230px' : '170px'
         } }>

      { isLessThanHalfWidth && <div>
        { secondaryMenu === PERIOD_OPTION &&
          <PeriodSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                               setXAxisViewMode={ setXAxisViewMode }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               handleLeftClick={ handleLeftClick } /> }

        { secondaryMenu === CALIBRATE_OPTION &&
          <CalibrateSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor } /> }

        { secondaryMenu === IRRIGATION_OR_DELETE_OPTION && <>
          <div>{ 'Capture new Irrigation' }</div>
          <div>{ 'View Irrigations' }</div>
        </> }

        { secondaryMenu === EXPORT_OPTION && <>
          <div>{ 'Raingauge readings to Excel' }</div>
          <div>{ 'Email Readings to myself ' }</div>
        </> }
      </div> }

      { !isLessThanHalfWidth && <div>
        { secondaryMenu === PERIOD_OPTION &&
          <PeriodSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                               setXAxisViewMode={ setXAxisViewMode }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               handleLeftClick={ handleLeftClick } /> }

        { secondaryMenu === CALIBRATE_OPTION &&
          <CalibrateSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor } /> }

        { secondaryMenu === IRRIGATION_OR_DELETE_OPTION && <>
          <div id={ 'dropdown-menu-1' } onClick={ handleLeftClick }>{ 'Delete all readings up to this point' }</div>
          <div>{ 'Set start point to delete readings' }</div>
          <div>{ 'Delete all readings from start point to here' }</div>
        </> }
      </div> }
    </div>
  );
};

const PeriodSecondaryMenu = ({
                               setShowPrimaryDropDown,
                               setXAxisViewMode,
                               setActiveDataPeriod,
                               activeDataPeriod
                             }) => {

  const handlePeriodClick = (period) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode(CONTEXT_MENU);
    setActiveDataPeriod(period);
  };

  return (
    <>
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
             placeholder={ '1' }
             min={ '1' }
             onChange={ ({ target }) => setActiveDataPeriod(target.value) } />
    </>
  );
};

const CalibrateSecondaryMenu = ({
                                  setShowPrimaryDropDown,
                                  setXAxisViewMode,
                                  activeProbeFactor,
                                  setActiveProbeFactor
                                }) => {

  const handleFactorClick = (factor) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode(CONTEXT_MENU);
    setActiveProbeFactor(factor);
  };

  return (
    <>
      <p>{ 'Calibrate y-axis:' }</p>
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
             placeholder={ '0 - 5' }
             value={ activeProbeFactor }
             onChange={ ({ target }) => handleFactorClick(target.value) } />
    </>
  );
};
