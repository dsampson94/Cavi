import React from 'react';
import { useHistory, useParams } from 'react-router';

import {
  AGGREGATE,
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CHART_TOP_BAR_MENU,
  DAILY_ETO,
  DEFICIT,
  DEFICIT_100MM,
  DEFICIT_200MM,
  DEFICIT_300MM,
  DEFICIT_400MM,
  DEFICIT_600MM,
  DEFICIT_800MM,
  SETTINGS_GEAR,
  USAGE_ETC
} from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import Button from '../../common/button/Button';
import SVGIcon from '../../common/icon/SVGIcon';
import DropDownMenu from '../../common/drop-down/DropDownMenu';
import FieldLineChartD3 from '../../common/chart/field-line/FieldLineChart.d3';

export const FieldChartTopBar = ({
                                   showChartsSideBar,
                                   setShowChartsSideBar,
                                   mappedChartList,
                                   mappedFieldList,
                                   mappedMenuList,
                                   setActiveFieldName
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
          <p>{ 'Deficit per layer (mm)' }</p>
        </div>
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
                        chartInfo={ mappedChartList?.[10][1] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_200MM }
                        data={ mappedChartList?.[1] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[10][2] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_300MM }
                        data={ mappedChartList?.[2] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[10][3] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_400MM }
                        data={ mappedChartList?.[3] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[10][4] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_600MM }
                        data={ mappedChartList?.[4] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[10][5] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        date={ date }
                        setDate={ setDate } />

      <FieldLineChartD3 chartType={ DEFICIT }
                        chartName={ DEFICIT_800MM }
                        data={ mappedChartList?.[5] }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        chartInfo={ mappedChartList?.[10][6] }
                        currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
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
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[6]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          date={ date }
                          setDate={ setDate } />

        <FieldLineChartD3 chartType={ AGGREGATE }
                          chartName={ AGGREGATE_BOTTOM_SOIL }
                          data={ mappedChartList?.[7] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[7]?.length * 100) }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          date={ date }
                          setDate={ setDate } />
      </div>

      <div className="field-chart__right__bottom">
        <FieldLineChartD3 chartType={ USAGE_ETC }
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
                          date={ date }
                          setDate={ setDate } />

        <FieldLineChartD3 chartType={ DAILY_ETO }
                          chartName={ DAILY_ETO }
                          data={ mappedChartList?.[9] }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          date={ date }
                          setDate={ setDate }
                          hasXAxis />
      </div>
    </div>
  );
};

RightSideCharts.propTypes = {};
