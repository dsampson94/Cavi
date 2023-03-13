import React, { useCallback, useEffect, useState } from 'react';

import {
  CALIBRATE_OPTION,
  CONTEXT_MENU,
  EXPORT_OPTION,
  IRRIGATION_OR_DELETE_OPTION,
  MENU_0,
  MENU_1,
  MENU_2,
  MENU_2_INPUT,
  MENU_2_INPUT_BUTTON,
  MENU_3,
  MENU_4,
  PERIOD_OPTION,
  RECOMMENDATIONS_OPTION
} from '../../../tools/general/system-variables.util';

import SubmitInput from '../input/submit/SubmitInput';
import NumberInput from '../input/number/NumberInput';

import './chart-context-menu.scss';

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
                            activeDataPeriod,
                            switchAtMidWidth
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
                      activeDataPeriod={ activeDataPeriod }
                      switchAtMidWidth={ switchAtMidWidth } />;
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
                       activeDataPeriod,
                       switchAtMidWidth
                     }) => {

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [secondaryMenu, setSecondaryMenu] = useState(null);

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
    let eventId = event.target.id;
    if (!eventId.includes('dropdown')) {
      setShowPrimaryDropDown(false);
      setShowSecondaryDropDown(false);
    } else if (eventId === MENU_0) {
      handleOptionClick(secondaryMenu, RECOMMENDATIONS_OPTION);
    } else if (eventId === MENU_1) {
      handleOptionClick(secondaryMenu, PERIOD_OPTION);
    } else if (eventId === MENU_2) {
      handleOptionClick(secondaryMenu, CALIBRATE_OPTION);
    } else if (eventId === MENU_2_INPUT) {
      setShowSecondaryDropDown(true);
    } else if (eventId === MENU_2_INPUT_BUTTON) {
      setShowSecondaryDropDown(true);
    } else if (eventId === MENU_3) {
      handleOptionClick(secondaryMenu, IRRIGATION_OR_DELETE_OPTION);
    } else if (eventId === MENU_4) {
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
                   anchorPoint={ anchorPoint }
                   switchAtMidWidth={ switchAtMidWidth } /> }

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

const PrimaryMenu = ({
                       handleLeftClick,
                       setHoverActive,
                       shouldDisplayFurtherUp,
                       isLessThanHalfWidth,
                       shouldDisplayLeft,
                       anchorPoint,
                       switchAtMidWidth
                     }) => {
  return (
    <div className="context-menu__popup"
         onMouseMove={ () => setHoverActive(true) }
         style={ {
           top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
           left: shouldDisplayLeft ? anchorPoint.x - 150 : anchorPoint.x
         } }>

      { switchAtMidWidth && isLessThanHalfWidth && <div>
        <div id={ MENU_1 } onClick={ handleLeftClick }>{ 'Start here and show...' }</div>
        <div id={ MENU_0 } onClick={ handleLeftClick }>{ 'Start at recommendations...' }</div>

        <hr />
        <div id={ MENU_2 } onClick={ handleLeftClick }>{ 'Calibrate Visually' }</div>
        <div id={ MENU_3 } onClick={ handleLeftClick }>{ 'Irrigations...' }</div>
        <hr />
        <div id={ MENU_4 } onClick={ handleLeftClick }>{ 'Export...' }</div>
        <hr />
        <div>{ 'Upload photo here' }</div>
        <hr />
        <div>{ 'Simulate from here...' }</div>
        <div>{ 'Seasonal Reflection...' }</div>
        <div>{ 'Show last year also' }</div>
        <div>{ 'Fix Spikes (ML)' }</div>
      </div> }

      { switchAtMidWidth && !isLessThanHalfWidth && <div>
        <div id={ MENU_1 }>{ 'Start here and show...' }</div>
        <div id={ MENU_2 } onClick={ handleLeftClick }>{ 'Calibrate Visually' }</div>
        <div id={ MENU_3 }>{ 'Delete readings...' }</div>
        <div>{ 'Check for new readings from here...' }</div>
      </div> }

      { !switchAtMidWidth && <div>
        <div id={ MENU_1 }>{ 'Start here and show...' }</div>
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

  const secondaryMenuXPos = () => {
    return shouldDisplayLeft ?
      secondaryMenu === IRRIGATION_OR_DELETE_OPTION
        ? isLessThanHalfWidth
          ? anchorPoint.x - 341
          : anchorPoint.x - 381
        : anchorPoint.x - 341
      : isLessThanHalfWidth
        ? anchorPoint.x + 174
        : anchorPoint.x + 203;
  };

  return (
    <div className="context-menu__popup"
         onMouseMove={ () => setHoverActive(true) }
         style={ {
           top: shouldDisplayFurtherUp ? anchorPoint.y - 120 : anchorPoint.y - 20,
           left: secondaryMenuXPos(),
           width: (!isLessThanHalfWidth && secondaryMenu === IRRIGATION_OR_DELETE_OPTION) ? '230px' : '190px'
         } }>

      { isLessThanHalfWidth && <div>
        { secondaryMenu === PERIOD_OPTION &&
        <PeriodSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                             setXAxisViewMode={ setXAxisViewMode }
                             setActiveDataPeriod={ setActiveDataPeriod }
                             activeDataPeriod={ activeDataPeriod }
                             handleLeftClick={ handleLeftClick } /> }

        { secondaryMenu === RECOMMENDATIONS_OPTION &&
        <PeriodSecondaryMenu setShowPrimaryDropDown={ setShowPrimaryDropDown }
                             setXAxisViewMode={ setXAxisViewMode }
                             setActiveDataPeriod={ setActiveDataPeriod }
                             activeDataPeriod={ activeDataPeriod }
                             handleLeftClick={ handleLeftClick }
                             secondaryMenu={ RECOMMENDATIONS_OPTION } /> }

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
                               activeDataPeriod,
                               secondaryMenu
                             }) => {

  const handlePeriodClick = (period) => {
    if (secondaryMenu === RECOMMENDATIONS_OPTION) {
      setActiveDataPeriod(period);
    } else {
      setShowPrimaryDropDown(false);
      setXAxisViewMode(CONTEXT_MENU);
      setActiveDataPeriod(period);
    }
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

      <NumberInput id={ 'dropdown-menu-2-input' }
                   autoFocus
                   period
                   placeholder={ '1' }
                   min={ '1' }
                   value={ activeDataPeriod }
                   onChange={({ target }) => handlePeriodClick(target.value) } />
    </>
  );
};

const CalibrateSecondaryMenu = ({
                                  setShowPrimaryDropDown,
                                  setXAxisViewMode,
                                  activeProbeFactor,
                                  setActiveProbeFactor
                                }) => {

  const [factorInputValue, setFactorInputValue] = useState(undefined);

  const handleFactorInput = (factor) => {
    setFactorInputValue(factor);
  };

  const handleFactorSubmit = (factor) => {
    setShowPrimaryDropDown(false);
    setXAxisViewMode(CONTEXT_MENU);
    setActiveProbeFactor(factor);
  };

  return (
    <>
      <p>{ 'Calibrate y-axis:' }</p>

      <hr />
      <div id={ 'option' } onClick={ () => handleFactorSubmit(0.5) }>{ '0.50x' }</div>
      <div id={ 'option' } onClick={ () => handleFactorSubmit(0.65) }>{ '0.65x' }</div>
      <div id={ 'option' } onClick={ () => handleFactorSubmit(0.8) }>{ '0.80x' }</div>
      <div id={ 'option' } onClick={ () => handleFactorSubmit(1.2) }>{ '1.20x' }</div>
      <div id={ 'option' } onClick={ () => handleFactorSubmit(2) }>{ '2.00x' }</div>
      <hr />

      <div className={ 'calibration-container' }>
        <NumberInput id={ 'dropdown-menu-2-input' }
                     autoFocus
                     calibrate
                     step={ 0.01 }
                     min={ '0' }
                     max={ '5' }
                     placeholder={ '0 - 5' }
                     value={ activeProbeFactor }
                     onChange={ ({ target }) => handleFactorInput(target.value) } />

        <SubmitInput value={ 'Calibrate' }
                     onClick={ () => handleFactorSubmit(factorInputValue) }
                     calibrate />
      </div>
    </>
  );
};
