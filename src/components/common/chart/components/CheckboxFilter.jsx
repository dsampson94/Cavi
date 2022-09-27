import React, { useEffect, useState } from 'react';
import { DAILY_ETO, TEMPERATURE_MULTILINE } from '../../../../tools/general/system-variables.util';
import { getClassNames } from '../../../../tools/general/helpers.util';
import CheckboxInput from '../../input/checkbox/CheckboxInput';

const CheckboxFilter = ({ chartName, hiddenLineList, setHiddenLineList }) => {

  switch (chartName) {
    case DAILY_ETO:
      return <DailyETOCheckboxGroup chartName={ chartName }
                                    hiddenLineList={ hiddenLineList }
                                    setHiddenLineList={ setHiddenLineList } />;
    case TEMPERATURE_MULTILINE:
      return <SoilTemperaturesCheckboxGroup chartName={ chartName }
                                            hiddenLineList={ hiddenLineList }
                                            setHiddenLineList={ setHiddenLineList } />;
    default :
      return <></>;
  }
};

CheckboxFilter.propTypes = {};

export default CheckboxFilter;

const DailyETOCheckboxGroup = ({ chartName, hiddenLineList, setHiddenLineList }) => {

  const [activeList] = useState(['Actual', 'Forecast']);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setHiddenLineList(activeList);
  }, [checked]);

  console.log(activeList);

  const hideLineClick = (event) => {
    setChecked(event.target.checked);
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter', { dailyETO: chartName === DAILY_ETO }) }>
      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ 'Forecast' }
                       checked={ hiddenLineList.includes('Forecast') }
                       onClick={ e => hideLineClick(e) } />

        <CheckboxInput constant={ 'Actual' }
                       checked={ hiddenLineList.includes('Actual') }
                       onClick={ e => hideLineClick(e) }
                       daily />
      </div>
    </div>
  );
};

DailyETOCheckboxGroup.propTypes = {};

const SoilTemperaturesCheckboxGroup = ({ chartName, hiddenLineList, setHiddenLineList }) => {

  const [activeList] = useState(['Actual', 'Forecast']);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setHiddenLineList(activeList);
  }, [checked]);

  const hideLineClick = (event) => {
    setChecked(event.target.checked);
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter', { temperatures: chartName === TEMPERATURE_MULTILINE }) }>
      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ '100mm' }
                       checked={ hiddenLineList.includes('100mm') }
                       onClick={ e => hideLineClick(e) } />

        <CheckboxInput constant={ '200mm' }
                       checked={ hiddenLineList.includes('200mm') }
                       onClick={ e => hideLineClick(e) }
                       daily />

        <CheckboxInput constant={ '300mm' }
                       checked={ hiddenLineList.includes('300mm') }
                       onClick={ e => hideLineClick(e) }
                       daily />

        <CheckboxInput constant={ '400mm' }
                       checked={ hiddenLineList.includes('400mm') }
                       onClick={ e => hideLineClick(e) }
                       daily />

        <CheckboxInput constant={ '600mm' }
                       checked={ hiddenLineList.includes('600mm') }
                       onClick={ e => hideLineClick(e) }
                       daily />

        <CheckboxInput constant={ '800mm' }
                       checked={ hiddenLineList.includes('800mm') }
                       onClick={ e => hideLineClick(e) }
                       daily />
      </div>
    </div>
  );
};

SoilTemperaturesCheckboxGroup.propTypes = {};
