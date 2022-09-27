import React, { useState } from 'react';
import { zoomIdentity } from 'd3';

import { arrayOf, shape } from 'prop-types';

import { FIELD_CHART_MIDBAR, FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { AggregateChartsContainer, DeficitChartsContainer } from './FieldChartView.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';

import './field-chart-view.scss';

const ClientFieldsView = ({
                            mappedFieldList,
                            mappedChartList,
                            mappedMenuList,
                            activeLoadPeriod,
                            setActiveLoadPeriod,
                            setActiveFieldName,
                            activeProbeFactor,
                            setActiveProbeFactor
                          }) => {

  const [showChartsSideBar, setShowChartsSideBar] = useState(true);
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const [hoverActive, setHoverActive] = useState(false);
  const [yAxisShared, setYAxisShared] = useState(false);
  const [date, setDate] = useState(null);
  const [activeDataPeriod, setActiveDataPeriod] = useState('All');
  const [xAxisViewMode, setXAxisViewMode] = useState('topBar');

  return (
    <ContentContainer view={ FIELD_CHARTS }
                      mappedFieldList={ mappedFieldList }
                      setActiveLoadPeriod={ setActiveLoadPeriod }
                      setActiveFieldName={ setActiveFieldName }
                      showChartsSideBar={ showChartsSideBar }>

      <div className="field-chart">
        <MidBar view={ FIELD_CHART_MIDBAR }
                activeDataPeriod={ activeDataPeriod }
                setActiveDataPeriod={ setActiveDataPeriod }
                showChartsSideBar={ showChartsSideBar }
                setShowChartsSideBar={ setShowChartsSideBar }
                mappedFieldList={ mappedFieldList }
                mappedMenuList={ mappedMenuList }
                setActiveFieldName={ setActiveFieldName }
                yAxisShared={ yAxisShared }
                setYAxisShared={ setYAxisShared } />

        <div className="field-chart__container">
          <DeficitChartsContainer mappedChartList={ mappedChartList }
                                  currentGlobalZoomState={ currentGlobalZoomState }
                                  setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                  currentYZoomState={ currentYZoomState }
                                  setCurrentYZoomState={ setCurrentYZoomState }
                                  currentXZoomState={ currentXZoomState }
                                  setCurrentXZoomState={ setCurrentXZoomState }
                                  yAxisShared={ yAxisShared }
                                  hoverActive={ hoverActive }
                                  setHoverActive={ setHoverActive }
                                  activeLoadPeriod={ activeLoadPeriod }
                                  activeDataPeriod={ activeDataPeriod }
                                  setActiveDataPeriod={ setActiveDataPeriod }
                                  xAxisViewMode={ xAxisViewMode }
                                  setXAxisViewMode={ setXAxisViewMode }
                                  activeProbeFactor={ activeProbeFactor }
                                  setActiveProbeFactor={ setActiveProbeFactor }
                                  date={ date }
                                  setDate={ setDate } />

          <AggregateChartsContainer mappedChartList={ mappedChartList }
                                    currentGlobalZoomState={ currentGlobalZoomState }
                                    setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                    currentYZoomState={ currentYZoomState }
                                    setCurrentYZoomState={ setCurrentYZoomState }
                                    currentXZoomState={ currentXZoomState }
                                    setCurrentXZoomState={ setCurrentXZoomState }
                                    yAxisShared={ yAxisShared }
                                    hoverActive={ hoverActive }
                                    setHoverActive={ setHoverActive }
                                    activeLoadPeriod={ activeLoadPeriod }
                                    activeDataPeriod={ activeDataPeriod }
                                    setActiveDataPeriod={ setActiveDataPeriod }
                                    xAxisViewMode={ xAxisViewMode }
                                    setXAxisViewMode={ setXAxisViewMode }
                                    activeProbeFactor={ activeProbeFactor }
                                    setActiveProbeFactor={ setActiveProbeFactor }
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
