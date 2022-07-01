import React from 'react';
import { useParams } from 'react-router';

import Button from '../../common/button/Button';
import DeficitPerLayerLineChart from '../../common/chart/DeficitPerLayerLineChart';
import ETCBarChart from '../../common/chart/ETCBarChart';
import AggregateDeficitLineChart from '../../common/chart/AggregateDeficitLineChart';
import DailyETOLineChart from '../../common/chart/DailyETOLineChart';

export const FieldChartTopBar = ({ showChartsSideBar, setShowChartsSideBar }) => {

  const { fieldName } = useParams();

  return (
    <div className="field-chart__top-bar">

      <div className="field-chart__top-bar--left">
        <Button label={ 'Fields' }
                onClick={ () => setShowChartsSideBar(!showChartsSideBar) }
                spaced />
        <div>{ 'Deficit per layer (mm)' }</div>
        <div>{ '+' }</div>
        <div>{ '-' }</div>
        <div>{ '0 to middle' }</div>
        <div>{ 'reset zoom' }</div>
        <Button label={ 'square' }
                spaced
                white />
        <Button label={ '<' }
                spaced
                white />
        <Button label={ '>' }
                spaced
                white />
      </div>

      <div className="field-chart__top-bar--center">
        <div>{ fieldName }</div>
      </div>

      <div className="field-chart__top-bar--right">
        <Button label={ '>' }
                white small />
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

export const LeftSideCharts = ({ mappedChartList }) => {

  return (
    <div className="field-chart__left">
      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[0] }
                                chart={ '1' } />

      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[1] }
                                chart={ '2' } />

      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[2] }
                                chart={ '3' } />

      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[3] }
                                chart={ '4' } />

      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[4] }
                                chart={ '5' } />

      <DeficitPerLayerLineChart mappedChartList={ mappedChartList?.[5] }
                                chart={ '6' }
                                hasXAxis={ true } />
    </div>
  );
};

LeftSideCharts.propTypes = {};

export const RightSideCharts = ({ mappedChartList }) => {

  return (
    <div className="field-chart__right">
      <AggregateDeficitLineChart mappedChartList={ mappedChartList?.[6] }
                                 chart={ 'Topsoil' } />

      <AggregateDeficitLineChart mappedChartList={ mappedChartList?.[7] }
                                 chart={ 'Bottomsoil' } />

      <ETCBarChart mappedChartList={ [] }
                   chart={ 'eto1' } />

      <DailyETOLineChart mappedChartList={ mappedChartList?.[8] }
                         chart={ 'eto2' } />
    </div>
  );
};

RightSideCharts.propTypes = {};
