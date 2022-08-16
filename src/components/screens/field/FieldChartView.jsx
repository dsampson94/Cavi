import React, { useState } from 'react';
import { zoomIdentity } from 'd3';

import { arrayOf, shape } from 'prop-types';

import { FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';
import { FieldChartTopBar, LeftSideCharts, RightSideCharts } from './FieldChartView.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import ContentContainer from '../../common/content-container/ContentContainer';

import './field-chart-view.scss';

const ClientFieldsView = ({ mappedFieldList, mappedChartList, mappedMenuList, setActiveLoadPeriod, setActiveFieldName }) => {

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [showChartsSideBar, setShowChartsSideBar] = useState(true);
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const [hoverActive, setHoverActive] = useState(false);
  const [yAxisShared, setYAxisShared] = useState(false);
  const [date, setDate] = useState(null);
  const [activeDataPeriod, setActiveDataPeriod] = useState('All');

  return (
    <ContentContainer view={ FIELD_CHARTS }
                      mappedFieldList={ mappedFieldList }
                      setActiveLoadPeriod={ setActiveLoadPeriod }
                      setActiveFieldName={ setActiveFieldName }
                      showChartsSideBar={ showChartsSideBar }>

      <div className="field-chart">
        <FieldChartTopBar mappedChartList={ mappedChartList }
                          activeDataPeriod={ activeDataPeriod }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          showChartsSideBar={ showChartsSideBar }
                          setShowChartsSideBar={ setShowChartsSideBar }
                          mappedFieldList={ mappedFieldList }
                          mappedMenuList={ mappedMenuList }
                          setActiveFieldName={ setActiveFieldName }
                          yAxisShared={ yAxisShared }
                          setYAxisShared={ setYAxisShared } />

        <div className={ getClassNames('field-chart__container', { dark: (getTheme === 'dark') }) }>
          <LeftSideCharts mappedChartList={ mappedChartList }
                          currentGlobalZoomState={ currentGlobalZoomState }
                          setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                          currentYZoomState={ currentYZoomState }
                          setCurrentYZoomState={ setCurrentYZoomState }
                          currentXZoomState={ currentXZoomState }
                          setCurrentXZoomState={ setCurrentXZoomState }
                          yAxisShared={ yAxisShared }
                          hoverActive={ hoverActive }
                          setHoverActive={ setHoverActive }
                          activeDataPeriod={ activeDataPeriod }
                          date={ date }
                          setDate={ setDate } />

          <RightSideCharts mappedChartList={ mappedChartList }
                           currentGlobalZoomState={ currentGlobalZoomState }
                           setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                           currentYZoomState={ currentYZoomState }
                           setCurrentYZoomState={ setCurrentYZoomState }
                           currentXZoomState={ currentXZoomState }
                           setCurrentXZoomState={ setCurrentXZoomState }
                           yAxisShared={ yAxisShared }
                           hoverActive={ hoverActive }
                           setHoverActive={ setHoverActive }
                           activeDataPeriod={ activeDataPeriod }
                           date={ date }
                           setDate={ setDate } />
        </div>

        <div className="field-chart__lower" />

      </div>
    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
