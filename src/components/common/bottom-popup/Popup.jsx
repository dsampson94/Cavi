import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { DashboardPopupScreen } from './DashboardPopupScreen';
import { UnitPopupScreen } from './UnitPopupScreen';
import { DailyDataPopupScreen } from './DailyDataPopupScreen';
import { DetailPopupScreen } from './DetailPopupScreen';
import { GraphsPopupScreen } from './GraphsPopupScreen';
import { SprayConditionsPopupScreen } from './SprayConditionsPopupScreen';
import { FireDangerIndexPopupScreen } from './FireDangerIndexPopupScreen';
import TabBarBottom from '../tab-bar/TabBarBottom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Popup({ mappedWeatherList1, mappedWeatherList2, mappedDailyDataList, mappedRainfallList, onUnitClick, onWeatherObjectClick }) {
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState('60px');
  const [originalHeight, setOriginalHeight] = useState('60px');

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setShow(true);
  }, [activeTab]);

  const handleClick = () => {
    setActiveTab(0);
    if (height === '400px') {
      setHeight(originalHeight);
    } else {
      setOriginalHeight(height);
      setHeight('400px');
    }
  };

  const handleWeatherStationClick = (weatherObj) => {
    if (weatherObj?.value?.wsnaam) {
      onWeatherObjectClick(weatherObj);
      setShow(true);
      setHeight('400px');
      setActiveTab(1);
    } else return null;
  };

  const toggleShow = () => setShow(!show);

  const tabs = [
    {
      name: 'Dashboard',
      component: <DashboardPopupScreen mappedWeatherList={ mappedWeatherList1 }
                                       handleWeatherStationClick={ handleWeatherStationClick } />
    },
    {
      name: 'Unit',
      component: <UnitPopupScreen mappedWeatherList2={ mappedWeatherList2 }
                                  mappedRainfallList={ mappedRainfallList } />
    },
    {
      name: 'Daily Data',
      component: <DailyDataPopupScreen mappedDailyDataList={ mappedDailyDataList }
                                       setActiveTab={ setActiveTab } />
    },
    {
      name: 'Detail',
      component: <DetailPopupScreen />
    },
    {
      name: 'Graphs',
      component: <GraphsPopupScreen />
    },
    {
      name: 'Spray Conditions',
      component: <SprayConditionsPopupScreen />
    },
    {
      name: 'Fire Danger Index',
      component: <FireDangerIndexPopupScreen />
    }
  ];

  return (
    <div className="fixed bottom-0 flex-col w-full z-50 overflow-auto">
      <div className="top-0 left-0 bg-gray-100 border-gray-500 z-40 dark:border-white border-t-2 rounded-md cursor-resize flex dark:bg-dark-mode-grey">
        <button className={ classNames(!show ? 'pb-1' : 'hover:pb-0.5', 'text-black rounded-md dark:text-white px-2 text-xs font-semibold') }
                onClick={ toggleShow }>
          { show ? 'Hide' : 'Show Local Weather' }
        </button>

        { show && <>
          { height === '400px' ? (
            <button className="text-black rounded-md text-xs px-1 font-semibold">
              <ChevronDownIcon className="w-6 h-6 text-black dark:text-white mt-0.5 hover:pb-0.5" onClick={ handleClick } />
            </button>
          ) : (
            <button className="text-black rounded-md text-xs px-1 font-semibold">
              <ChevronUpIcon className="w-6 h-6 text-black dark:text-white mt-0.5 hover:pb-0.5" onClick={ handleClick } />
            </button>
          ) }
        </> }
      </div>

      <div className={ `flex flex-col bottom-0 left-0 w bg-gray-100 dark:bg-dark-mode-grey slide-up px-4 ${ show ? 'show pb-4' : '' }` }
           style={ { height: show ? height : '0px', transition: 'height 0.3s' } }>

        { show && tabs[activeTab].component }

      </div>
      { height === '400px' && show &&
      <div className="bg-gray-200 dark:bg-dark-mode-grey -mt-1 z-50">
        <TabBarBottom tabs={ tabs }
                      activeTab={ activeTab }
                      setActiveTab={ setActiveTab }
                      onUnitClick={ onUnitClick } />
      </div> }
    </div>
  );
}