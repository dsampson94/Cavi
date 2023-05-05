import React, { useEffect, useState } from 'react';
import { FieldPopupLineChart } from '../chart/chart/FieldPopupLineChart';
import useTheme from '../../../tools/hooks/useTheme';
import RadioInput from '../input/radio/RadioInput';

import { VscClose } from 'react-icons/vsc';

import {
  FOUR_WEEKS_LABEL,
  FULL_VIEW_LABEL,
  RADIO_GROUP,
  SIX_MONTHS_LABEL,
  THREE_MONTHS_LABEL,
  TWELVE_MONTHS_LABEL,
  TWO_MONTHS_LABEL,
  TWO_WEEKS_LABEL
} from '../../../tools/general/system-variables.util';

export const QuickView = ({
                            mappedChartList,
                            quickViewIsOpen,
                            activeFieldName,
                            setQuickViewIsOpen,
                            mappedQuickViewList,
                            activeLoadPeriod,
                            setActiveLoadPeriod
                          }) => {

  const { isDarkMode } = useTheme(false);

  return (
    <>
      { quickViewIsOpen &&
      <div className="fixed top-0 left-0 z-50 w-full ml-24 h-full flex items-center justify-center">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl p-6">

          <div className="-translate-y-4">
            { activeFieldName }
          </div>

          <div className="w-full h-0 flex flex-row-reverse -translate-y-8">
            <button className="relative top-0 right-0 w-2 text-gray-900 hover:text-gray-700 dark:text-gray-400 justify-right"
                    onClick={ () => setQuickViewIsOpen(false) }>
              <VscClose />
            </button>

            { mappedChartList &&
            <ViewDataRow setActiveLoadPeriod={ setActiveLoadPeriod } /> }

          </div>

          <div className="flex flex-col 2xl:flex-row overflow-auto w-[350px] md:w-[800px] xl:w-[1020px] 2xl:w-[1270px]
        h-[180px] md:h-[300px] xl:h-[370px] 2xl:h-[500px]">

            <div className="flex flex-col w-1/2">
              <FieldPopupLineChart height={ 83 }
                                   chartLabel={ '100mm' }
                                   lines={ [
                                     { data: mappedChartList?.[0], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 83 }
                                   chartLabel={ '200mm' }
                                   lines={ [
                                     { data: mappedChartList?.[1], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 83 }
                                   chartLabel={ '300mm' }
                                   lines={ [
                                     { data: mappedChartList?.[2], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 83 }
                                   chartLabel={ '400mm' }
                                   lines={ [
                                     { data: mappedChartList?.[3], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 83 }
                                   chartLabel={ '500mm' }
                                   lines={ [
                                     { data: mappedChartList?.[4], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
              <FieldPopupLineChart height={ 84 }
                                   chartLabel={ '600mm' }
                                   hasXAxis
                                   lines={ [
                                     { data: mappedChartList?.[5], dataKey: 'y', color: isDarkMode ? 'white' : 'darkblue' }
                                   ] } />
            </div>

            <div className="flex flex-col w-1/2">
              <FieldPopupLineChart height={ 249 }
                                   chartLabel={ '0 - 400mm' }
                                   lines={ [
                                     { data: mappedChartList?.[6], dataKey: 'y', color: 'url(#lineGradientAggregateTop)' }
                                   ] } />

              <FieldPopupLineChart height={ 249 }
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

export const ViewDataRow = ({ setActiveLoadPeriod }) => {

  const [selectedPeriod, setSelectedPeriod] = useState(TWO_WEEKS_LABEL);

  useEffect(() => {
    setActiveLoadPeriod(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="field-charts-side-bar__view-mode">
      <div className="flex -mt-[2px] mr-[32px]">
        <RadioInput constant={ TWO_WEEKS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWO_WEEKS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ FOUR_WEEKS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === FOUR_WEEKS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput label={ TWO_MONTHS_LABEL }
                    constant={ TWO_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWO_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ THREE_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === THREE_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ SIX_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === SIX_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ TWELVE_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWELVE_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ FULL_VIEW_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === FULL_VIEW_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
      </div>
    </div>
  );
};
