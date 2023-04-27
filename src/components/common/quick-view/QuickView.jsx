import React from 'react';
import { FieldPopupLineChart } from '../chart/chart/FieldPopupLineChart';
import useTheme from '../../../tools/hooks/useTheme';

export const QuickView = ({
                            mappedChartList,
                            quickViewIsOpen,
                            activeFieldName,
                            setQuickViewIsOpen,
                            mappedQuickViewList
                          }) => {

  const { isDarkMode } = useTheme(false);

  return (
    <>
      { quickViewIsOpen &&
      <div className="fixed top-0 left-0 z-50 w-full ml-24 h-full flex items-center justify-center"
           onClick={ () => setQuickViewIsOpen(false) }>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl p-6">

          <div className="-translate-y-2">
            { activeFieldName }
          </div>

          <div className="w-full h-0 flex flex-row-reverse -translate-y-8">
            <button className="relative top-0 right-0 w-24 text-gray-900 hover:text-gray-700 dark:text-gray-400 justify-right"
                    onClick={ () => setQuickViewIsOpen(false) }>X
            </button>
          </div>

          <div className="flex flex-col 2xl:flex-row overflow-auto w-[350px] md:w-[800px] xl:w-[1020px] 2xl:w-[1270px]
        h-[180px] md:h-[300px] xl:h-[370px] 2xl:h-[500px]">

            <div className="flex flex-col w-1/2">
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '100mm' }
                                   lines={ [
                                     { data: mappedChartList?.[0], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '200mm' }
                                   lines={ [
                                     { data: mappedChartList?.[1], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '300mm' }
                                   lines={ [
                                     { data: mappedChartList?.[2], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '400mm' }
                                   lines={ [
                                     { data: mappedChartList?.[3], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '500mm' }
                                   lines={ [
                                     { data: mappedChartList?.[4], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 80 }
                                   chartLabel={ '600mm' }
                                   hasXAxis
                                   lines={ [
                                     { data: mappedChartList?.[5], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
            </div>

            <div className="flex flex-col w-1/2">
              <FieldPopupLineChart height={ 242 }
                                   chartLabel={ '0 - 400mm' }
                                   lines={ [
                                     { data: mappedChartList?.[6], dataKey: 'y', color: 'url(#lineGradientAggregateTop)' }
                                   ] } />

              <FieldPopupLineChart height={ 242 }
                                   chartLabel={ '400 - 800mm' }
                                   hasXAxis
                                   lines={ [
                                     { data: mappedChartList?.[7], dataKey: 'y', color: 'url(#lineGradientAggregateBottom)' }
                                   ] } />
            </div>
          </div>

        </div>
      </div> }
    </>
  );
};
