import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import TabBar from '../tab-bar/TabBar';

export function Popup({ mappedWeatherList }) {
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(60);
  const [originalHeight, setOriginalHeight] = useState('auto');

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleClick = () => {
    if (height === 1000) {
      setHeight(originalHeight);
    } else {
      setOriginalHeight(height);
      setHeight(1000);
    }
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const tabs = [
    {
      name: 'Dashboard',
      tabIndex: 0
    },
    {
      name: 'Unit',
      tabIndex: 1
    },
    {
      name: 'Daily Data',
      tabIndex: 2
    },
    {
      name: 'Detail',
      tabIndex: 3
    },
    {
      name: 'Graphs',
      tabIndex: 4
    },
    {
      name: 'Spray Conditions',
      tabIndex: 5
    },
    {
      name: 'Fire Danger Index',
      tabIndex: 6
    }
  ];

  return (
    <>
      <div className="top-0 left-0 w-full bg-gray-100 border-gray-500 dark:border-white border-t-2 rounded-md cursor-resize flex dark:bg-dark-mode-grey">
        <button className="text-black rounded-md dark:text-white mb-2 px-2 pt-1 pl-1 text-sm font-semibold hover:bg-gray-400 "
                onClick={ toggleShow }>
          { show ? 'Hide' : 'Show Local Weather' }
        </button>
        { show && <>
          { height === 1000 ? (
            <button className="text-black rounded-md mb-2 px-2 text-sm font-semibold hover:bg-gray-400">
              <ChevronDownIcon className="w-6 h-6 text-black dark:text-white mt-0.5" onClick={ handleClick } />
            </button>
          ) : (
            <button className="text-black rounded-md mb-2 px-2 text-sm font-semibold hover:bg-gray-400">
              <ChevronUpIcon className="w-6 h-6 text-black dark:text-white mt-0.5" onClick={ handleClick } />
            </button>
          ) }
        </> }
      </div>

      <div className={ `flex flex-col bottom-0 left-0 w-full bg-gray-100 dark:bg-dark-mode-grey slide-up px-4 ${ show ? 'show pb-4' : '' }` }
           style={ { height: show ? height : '0px', transition: 'height 0.3s' } }>

        { show &&
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full w-3/4 pr-3 md:w-full">
          { mappedWeatherList?.map((weatherObj) => (
            <div key={ weatherObj?.key } className="border border-black text-white border-2 h-12 rounded-md bg-gradient-to-br from-blue-400 to-blue-800">
              <h3 className="text-center text-sm pt-0.5 whitespace-nowrap">{ weatherObj?.value?.displayname }</h3>
              <p className="text-center text-sm whitespace-nowrap">{ weatherObj?.value?.displaysummary }</p>
            </div>
          )) }
        </div> }
      </div>
      { height === 1000 && show &&
      <div className="px-1 bg-gray-200">
        <TabBar tabs={ tabs } />
      </div> }
    </>
  );
}
