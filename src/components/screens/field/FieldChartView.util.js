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
import FieldLineChart from '../../common/chart/FieldLineChart';
import SVGIcon from '../../common/icon/SVGIcon';
import DropDownMenu from '../../common/drop-down/DropDownMenu';
import FieldLineChartD3 from '../../common/chart/FieldLineChart.d3';

export const FieldChartTopBar = ({
                                   showChartsSideBar,
                                   setShowChartsSideBar,
                                   mappedChartList,
                                   mappedFieldList,
                                   mappedMenuList,
                                   setActiveFieldName
                                 }) => {

  const history = useHistory();
  const { groupName, clientName, fieldName } = useParams();
  const getTheme = retrieveActiveThemeFromLocalStorage();

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

export const LeftSideCharts = ({ mappedChartList }) => {

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__left">
      <FieldLineChart mappedChartList={ mappedChartList?.[0] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_100MM }
                      chartInfo={ mappedChartList?.[10][1] }
                      hasToolbar />

      <FieldLineChart mappedChartList={ mappedChartList?.[1] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_200MM }
                      chartInfo={ mappedChartList?.[10][2] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[2] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_300MM }
                      chartInfo={ mappedChartList?.[10][3] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[3] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_400MM }
                      chartInfo={ mappedChartList?.[10][4] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[4] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_600MM }
                      chartInfo={ mappedChartList?.[10][5] } />

      <FieldLineChart mappedChartList={ mappedChartList?.[5] }
                      chartType={ DEFICIT }
                      chartName={ DEFICIT_800MM }
                      chartInfo={ mappedChartList?.[10][6] }
                      hasXAxis />
    </div>
  );
};

LeftSideCharts.propTypes = {};

export const RightSideCharts = ({ mappedChartList }) => {

  if (!mappedChartList) return null;

  return (
    <div className="field-chart__right">
      <div className="field-chart__right__top">
        <FieldLineChart mappedChartList={ mappedChartList?.[6] }
                        recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[6]?.length * 100) }
                        chartType={ AGGREGATE }
                        chartName={ AGGREGATE_TOP_SOIL } />

        <FieldLineChart mappedChartList={ mappedChartList?.[7] }
                        recommendationOffset={ (mappedChartList?.[8]?.length / mappedChartList?.[7]?.length * 100) }
                        chartType={ AGGREGATE }
                        chartName={ AGGREGATE_BOTTOM_SOIL } />
      </div>

      <div className="field-chart__right__bottom">
        <FieldLineChart mappedChartList={ mappedChartList?.[9] }
                        chartType={ USAGE_ETC }
                        chartName={ USAGE_ETC } />

        <FieldLineChart mappedChartList={ mappedChartList?.[9] }
                        chartType={ DAILY_ETO }
                        chartName={ DAILY_ETO }
                        hasXAxis />
      </div>
    </div>
  );
};

RightSideCharts.propTypes = {};
