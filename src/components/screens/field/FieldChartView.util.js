import React from 'react';
import { useHistory, useParams } from 'react-router';

import {
  AGGREGATE,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_100MM,
  DEFICIT_200MM,
  DEFICIT_300MM,
  DEFICIT_400MM,
  DEFICIT_600MM,
  DEFICIT_800MM,
  DOUBLE_DROPDOWN,
  SETTINGS_GEAR,
  TOGGLE_YAXIS,
  USAGE_ETC
} from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import Button from '../../common/button/Button';
import SVGIcon from '../../common/icon/SVGIcon';
import DropDownMenu from '../../common/drop-down/DropDownMenu';
import FieldLineChartD3 from '../../common/chart/client-field/FieldLineChart.d3';
import FieldCombinationChart from '../../common/chart/client-field/FieldCombinationChart.d3';
import TextInput from '../../common/input/text/TextInput';

export const LeftSideCharts = ({
                                 mappedChartList,
                                 hoverActive,
                                 setHoverActive,
                                 currentGlobalZoomState,
                                 setCurrentGlobalZoomState,
                                 currentYZoomState,
                                 setCurrentYZoomState,
                                 currentXZoomState,
                                 setCurrentXZoomState,
                                 yAxisShared,
                                 activeLoadPeriod,
                                 activeDataPeriod,
                                 setActiveDataPeriod,
                                 xAxisViewMode,
                                 setXAxisViewMode,
                                 date,
                                 setDate
                               }) => {

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__left">
      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_100MM }
                        data={ mappedChartList?.[0] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][1] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_200MM }
                        data={ mappedChartList?.[1] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][2] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_300MM }
                        data={ mappedChartList?.[2] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][3] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_400MM }
                        data={ mappedChartList?.[3] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][4] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_600MM }
                        data={ mappedChartList?.[4] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][5] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_800MM }
                        data={ mappedChartList?.[5] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[11][6] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        sharedYScaleData={ mappedChartList?.[0] }
                        yAxisShared={ yAxisShared }
                        activeLoadPeriod={ activeLoadPeriod }
                        activeDataPeriod={ activeDataPeriod }
                        setActiveDataPeriod={ setActiveDataPeriod }
                        xAxisViewMode={ xAxisViewMode }
                        setXAxisViewMode={ setXAxisViewMode }
                        date={ date }
                        setDate={ setDate }
                        hasXAxis />
    </div>
  );
};

LeftSideCharts.propTypes = {};

export const RightSideCharts = ({
                                  mappedChartList,
                                  hoverActive,
                                  setHoverActive,
                                  currentGlobalZoomState,
                                  setCurrentGlobalZoomState,
                                  currentYZoomState,
                                  setCurrentYZoomState,
                                  currentXZoomState,
                                  setCurrentXZoomState,
                                  yAxisShared,
                                  activeLoadPeriod,
                                  activeDataPeriod,
                                  setActiveDataPeriod,
                                  xAxisViewMode,
                                  setXAxisViewMode,
                                  date,
                                  setDate
                                }) => {

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__right">
      <div className="field-chart__right__top">
        <FieldLineChartD3 chartType={ AGGREGATE }
                          chartName={ AGGREGATE_TOP_SOIL }
                          data={ mappedChartList?.[6] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          chartInfo={ AGGREGATE_TOP_SOIL.slice(10) }
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[6]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          sharedYScaleData={ mappedChartList?.[6] }
                          yAxisShared={ yAxisShared }
                          activeLoadPeriod={ activeLoadPeriod }
                          activeDataPeriod={ activeDataPeriod }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          xAxisViewMode={ xAxisViewMode }
                          setXAxisViewMode={ setXAxisViewMode }
                          date={ date }
                          setDate={ setDate } />

        <FieldLineChartD3 chartType={ AGGREGATE }
                          chartName={ AGGREGATE_BOTTOM_SOIL }
                          data={ mappedChartList?.[7] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          chartInfo={ AGGREGATE_BOTTOM_SOIL.slice(10) }
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[7]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          sharedYScaleData={ mappedChartList?.[6] }
                          yAxisShared={ yAxisShared }
                          activeLoadPeriod={ activeLoadPeriod }
                          activeDataPeriod={ activeDataPeriod }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          xAxisViewMode={ xAxisViewMode }
                          setXAxisViewMode={ setXAxisViewMode }
                          date={ date }
                          setDate={ setDate } />
      </div>

      <div className="field-chart__right__bottom">
        <FieldCombinationChart chartType={ USAGE_ETC }
                               chartName={ USAGE_ETC }
                               data={ mappedChartList?.[9] }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               activeLoadPeriod={ activeLoadPeriod }
                               activeDataPeriod={ activeDataPeriod }
                               setActiveDataPeriod={ setActiveDataPeriod }
                               xAxisViewMode={ xAxisViewMode }
                               setXAxisViewMode={ setXAxisViewMode }
                               date={ date }
                               setDate={ setDate } />

        <FieldLineChartD3 chartType={ DAILY_ETO }
                          chartName={ DAILY_ETO }
                          data={ mappedChartList?.[10] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          activeLoadPeriod={ activeLoadPeriod }
                          activeDataPeriod={ activeDataPeriod }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          xAxisViewMode={ xAxisViewMode }
                          setXAxisViewMode={ setXAxisViewMode }
                          date={ date }
                          setDate={ setDate }
                          hasXAxis />
      </div>
    </div>
  );
};

RightSideCharts.propTypes = {};

export const FieldChartTopBar = ({
                                   mappedChartList,
                                   activeDataPeriod,
                                   setActiveDataPeriod,
                                   showChartsSideBar,
                                   setShowChartsSideBar,
                                   mappedFieldList,
                                   mappedMenuList,
                                   setActiveFieldName,
                                   yAxisShared,
                                   setYAxisShared,
                                   setXAxisViewMode
                                 }) => {

  const history = useHistory();
  const getTheme = retrieveActiveThemeFromLocalStorage();
  const { groupName, clientName, fieldName } = useParams();

  if (!mappedChartList) return null;

  const viewClient = (direction) => {
    mappedFieldList.forEach((item, index) => {
      if (item.fieldName.locationName === fieldName) {
        const field = mappedFieldList[index + direction].fieldName;
        setActiveFieldName(field.locationName);
        handleFieldClick(history, groupName, clientName, field);
      }
    });
  };

  const handleFieldClick = (history, groupName, clientName, field) => {
    history.push(`/client/${ groupName }/${ clientName }/field/${ field?.locationName }/${ field?.probeNumber }`);
  };

  const onHandleChangeNumeric = (event) => {
    if (Number(event.target.value)) setActiveDataPeriod(event.target.value);
  };

  const handlePeriodClick = (period) => {
    setXAxisViewMode('topBar');
    setActiveDataPeriod(period);
  };

  return (
    <div className={ getClassNames('field-chart__top-bar', { dark: (getTheme === 'dark') }) }>
      <div className="field-chart__top-bar--left">
        <div className="field-chart__top-bar--left-inner">
          <Button label={ 'Fields' }
                  onClick={ () => setShowChartsSideBar(!showChartsSideBar) }
                  chartbar
                  spaced />
          <Button label={ '<' }
                  onClick={ () => viewClient(-1) }
                  spaced
                  tiny
                  chartbar
                  white />
          <Button label={ '>' }
                  onClick={ () => viewClient(1) }
                  spaced
                  tiny
                  chartbar
                  white />
          <div className="field-chart__top-bar--left__settings">
            <DropDownMenu menu={ CHART_TOP_BAR_MENU } menuData={ mappedMenuList } />
            <SVGIcon name={ SETTINGS_GEAR } tiny fill={ '#6E8192' } />
          </div>
          <div className="field-chart__top-bar--left__settings"
               onClick={ () => setYAxisShared(!yAxisShared) }>
            <SVGIcon name={ TOGGLE_YAXIS } tiny fill={ '#6E8192' } />
          </div>
          <p>{ 'Deficit per layer (mm)' }</p>
        </div>
      </div>

      <div className="field-chart__top-bar--center">
        <div>{ fieldName }</div>
      </div>

      <div className="field-chart__top-bar--right">
        <div className="field-chart__top-bar--right-tool-container">
          <div className="field-chart__top-bar--right-icon-container">
            <SVGIcon name={ DOUBLE_DROPDOWN } />
            <DropDownMenu menu={ CHART_ACTIVE_PERIOD }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          period />
          </div>
          <TextInput placeholder={ activeDataPeriod }
                     onChange={ onHandleChangeNumeric }
                     chartbar />
        </div>

        <div className="field-chart__top-bar--right-days-container">
          <div onClick={ () => handlePeriodClick('All') }>{ 'All readings' }</div>
          <div onClick={ () => handlePeriodClick(100) }>{ '100' }</div>
          <div onClick={ () => handlePeriodClick(56) }>{ '56' }</div>
          <div onClick={ () => handlePeriodClick(28) }>{ '28' }</div>
          <div onClick={ () => handlePeriodClick(21) }>{ '21' }</div>
          <div onClick={ () => handlePeriodClick(14) }>{ '14' }</div>
          <div onClick={ () => handlePeriodClick(7) }>{ '7' }</div>
          <div onClick={ () => handlePeriodClick(1) }>{ '1' }</div>
          <p style={ { fontSize: '10px', marginTop: '5px' } }>{ 'Days:' }</p>
        </div>
      </div>
    </div>
  );
};

FieldChartTopBar.propTypes = {};
