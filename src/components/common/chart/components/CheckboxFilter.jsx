import React, { useEffect, useState } from 'react';

import {
  CANOPY_LINE,
  CANOPY_OUTSIDE_TEMPERATURE,
  DAILY_ETO,
  HUMIDITY_LINE,
  LINE_100MM,
  LINE_200MM,
  LINE_300MM,
  LINE_400MM,
  LINE_600MM,
  LINE_800MM,
  OUTSIDE_LINE,
  RAIN_HUMIDITY,
  RAIN_LINE,
  SOIL_TEMPERATURE
} from '../../../../tools/general/system-variables.util';

import { getClassNames } from '../../../../tools/general/helpers.util';

import CheckboxInput from '../../input/checkbox/CheckboxInput';

import '../chart.scss';

const CheckboxFilter = ({ chartName, hiddenLineList, setHiddenLineList, secondaryData }) => {

  switch (chartName) {
    case DAILY_ETO:
      return <DailyETOCheckboxGroup chartName={ chartName }
                                    secondaryData={ secondaryData }
                                    hiddenLineList={ hiddenLineList }
                                    setHiddenLineList={ setHiddenLineList } />;
    case SOIL_TEMPERATURE:
      return <SoilTemperaturesCheckboxGroup hiddenLineList={ hiddenLineList }
                                            setHiddenLineList={ setHiddenLineList } />;
    case CANOPY_OUTSIDE_TEMPERATURE:
      return <CanopyOutsideCheckboxGroup hiddenLineList={ hiddenLineList }
                                         setHiddenLineList={ setHiddenLineList } />;
    case RAIN_HUMIDITY:
      return <RainHumidityCheckboxGroup hiddenLineList={ hiddenLineList }
                                        setHiddenLineList={ setHiddenLineList } />;
    default :
      return <></>;
  }
};

CheckboxFilter.propTypes = {};

export default CheckboxFilter;

const DailyETOCheckboxGroup = ({ chartName, hiddenLineList, setHiddenLineList, secondaryData }) => {

  const [activeList] = useState(['Actual', 'Forecast']);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (setHiddenLineList) setHiddenLineList(activeList);
  }, [checked]);

  const hideLineClick = (event) => {
    setChecked(event.target.checked);
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter',
      { dailyETO: chartName === DAILY_ETO }) }>
      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ 'Forecast' }
                       checked={ hiddenLineList?.includes('Forecast') }
                       onClick={ e => hideLineClick(e) }
                       forecast />

        { secondaryData &&
        <CheckboxInput constant={ 'Actual' }
                       checked={ hiddenLineList?.includes('Actual') }
                       onClick={ e => hideLineClick(e) }
                       daily
                       actual /> }
      </div>
    </div>
  );
};

DailyETOCheckboxGroup.propTypes = {};

const SoilTemperaturesCheckboxGroup = ({ hiddenLineList, setHiddenLineList }) => {

  const [activeList] = useState([LINE_100MM, LINE_200MM, LINE_300MM, LINE_400MM, LINE_600MM, LINE_800MM]);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (setHiddenLineList) setHiddenLineList(activeList);
  }, [checked]);

  const hideLineClick = (event) => {
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
    setChecked(event.target.checked);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter', { temperatures: true }) }>

      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ LINE_100MM }
                       checked={ hiddenLineList?.includes(LINE_100MM) }
                       onClick={ e => hideLineClick(e) }
                       mm100 />

        <CheckboxInput constant={ LINE_200MM }
                       checked={ hiddenLineList?.includes(LINE_200MM) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       mm200 />

        <CheckboxInput constant={ LINE_300MM }
                       checked={ hiddenLineList?.includes(LINE_300MM) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       mm300 />

        <CheckboxInput constant={ LINE_400MM }
                       checked={ hiddenLineList?.includes(LINE_400MM) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       mm400 />

        <CheckboxInput constant={ LINE_600MM }
                       checked={ hiddenLineList?.includes(LINE_600MM) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       mm600 />

        <CheckboxInput constant={ LINE_800MM }
                       checked={ hiddenLineList?.includes(LINE_800MM) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       mm800 />
      </div>
    </div>
  );
};

SoilTemperaturesCheckboxGroup.propTypes = {};

const CanopyOutsideCheckboxGroup = ({ hiddenLineList, setHiddenLineList }) => {

  const [activeList] = useState([CANOPY_LINE, OUTSIDE_LINE]);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (setHiddenLineList) setHiddenLineList(activeList);
  }, [checked]);

  const hideLineClick = (event) => {
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
    setChecked(event.target.checked);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter', { temperatures: true }) }>

      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ CANOPY_LINE }
                       checked={ hiddenLineList?.includes(CANOPY_LINE) }
                       onClick={ e => hideLineClick(e) }
                       canopy />

        <CheckboxInput constant={ OUTSIDE_LINE }
                       checked={ hiddenLineList?.includes(OUTSIDE_LINE) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       outside />
      </div>

    </div>
  );
};

CanopyOutsideCheckboxGroup.propTypes = {};

const RainHumidityCheckboxGroup = ({ hiddenLineList, setHiddenLineList }) => {

  const [activeList] = useState([RAIN_LINE, HUMIDITY_LINE]);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (setHiddenLineList) setHiddenLineList(activeList);
  }, [checked]);

  const hideLineClick = (event) => {
    if (activeList.includes(event.target.id))
      activeList.splice(activeList.indexOf(event.target.id), 1);
    else activeList.push(event.target.id);
    setChecked(event.target.checked);
  };

  return (
    <div className={ getClassNames('chart__checkbox-filter', { temperatures: true }) }>

      <div className={ 'chart__checkbox-filter__inner' }>

        <CheckboxInput constant={ RAIN_LINE }
                       checked={ hiddenLineList?.includes(RAIN_LINE) }
                       onClick={ e => hideLineClick(e) }
                       daily
                       rain />

        <CheckboxInput constant={ HUMIDITY_LINE }
                       checked={ hiddenLineList?.includes(HUMIDITY_LINE) }
                       onClick={ e => hideLineClick(e) }
                       humidity />
      </div>

    </div>
  );
};

RainHumidityCheckboxGroup.propTypes = {};
