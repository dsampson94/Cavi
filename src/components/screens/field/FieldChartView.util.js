import React from 'react';
import { useParams } from 'react-router';

import { AGGREGATE, DAILY_ETO, DEFICIT, USAGE_ETC } from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import Button from '../../common/button/Button';
import FieldLineChart from '../../common/chart/FieldLineChart';

export const FieldChartTopBar = ({ showChartsSideBar, setShowChartsSideBar }) => {

  const { fieldName } = useParams();
  const getTheme = retrieveActiveThemeFromLocalStorage();

  return (
    <div className={ getClassNames('field-chart__top-bar', { dark: (getTheme === 'dark') }) }>

      <div className="field-chart__top-bar--left">
        <div className="field-chart__top-bar--left-inner">
          <Button label={ 'Fields' }
                  onClick={ () => setShowChartsSideBar(!showChartsSideBar) }
                  chartbar
                  spaced />
          <Button label={ '<' }
                  spaced
                  small
                  chartbar
                  white />
          <Button label={ '>' }
                  spaced
                  small
                  chartbar
                  white />
        </div>
        <p>{ 'Deficit per layer (mm)' }</p>
      </div>

      <div className="field-chart__top-bar--center">
        <div>{ fieldName }</div>
      </div>

      <div className="field-chart__top-bar--right">
        <Button label={ '>' }
                white
                small
                chartbar />
        <div>{ 'All readings' }</div>
        <div>{ '100' }</div>
        <div>{ '56' }</div>
        <div>{ '28' }</div>
        <div>{ '21' }</div>
        <div>{ '14' }</div>
        <div>{ '7' }</div>
        <div>{ '1' }</div>
        <div>{ 'Days:' }</div>
      </div>
    </div>
  );
};

FieldChartTopBar.propTypes = {};

export const LeftSideCharts = ({ mappedChartList, mappedDepthList }) => {

  return (
    <div className="field-chart__left">
      <FieldLineChart mappedChartList={ mappedChartList?.[0] }
                      chart={ mappedDepthList?.[1] }
                      type={ DEFICIT }
                      hasToolbar />

      <FieldLineChart mappedChartList={ mappedChartList?.[1] }
                      type={ DEFICIT }
                      chart={ mappedDepthList?.[2] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[2] }
                      type={ DEFICIT }
                      chart={ mappedDepthList?.[3] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[3] }
                      type={ DEFICIT }
                      chart={ mappedDepthList?.[4] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[4] }
                      type={ DEFICIT }
                      chart={ mappedDepthList?.[5] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[5] }
                      type={ DEFICIT }
                      chart={ mappedDepthList?.[6] }
                      hasXAxis />
    </div>
  );
};

LeftSideCharts.propTypes = {};

export const RightSideCharts = ({ mappedChartList }) => {

  return (
    <div className="field-chart__right">
      <FieldLineChart mappedChartList={ mappedChartList?.[6] }
                      type={ AGGREGATE }
                      chart={ '0 - 400mm' } />

      <FieldLineChart mappedChartList={ mappedChartList?.[7] }
                      type={ AGGREGATE }
                      chart={ '400 - 800mm' } />

      <FieldLineChart mappedChartList={ mappedChartList?.[7] }
                      type={ USAGE_ETC }
                      chart={ 'Usage ETc' } />

      <FieldLineChart mappedChartList={ mappedChartList?.[8] }
                      type={ DAILY_ETO }
                      chart={ 'Daily ETo' }
                      hasXAxis />
    </div>
  );
};

RightSideCharts.propTypes = {};
