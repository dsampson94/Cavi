import React, { useState } from 'react';
import { zoomIdentity } from 'd3';

import { arrayOf, shape } from 'prop-types';

import { FIELD_TEMPERATURES } from '../../../tools/general/system-variables.util';

import { TemperatureChartsContainer } from './FieldTemperaturesChartView.util';

import ContentContainer from '../../common/content-container/ContentContainer';

import './field-temperatures-chart-view.scss';

const FieldTemperaturesChartView = ({
                                      mappedFieldList,
                                      mappedTemperaturesList,
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
  const [date, setDate] = useState(null);
  const [activeDataPeriod, setActiveDataPeriod] = useState('All');
  const [xAxisViewMode, setXAxisViewMode] = useState('topBar');

  return (
    <ContentContainer view={ FIELD_TEMPERATURES }
                      mappedFieldList={ mappedFieldList }
                      setActiveLoadPeriod={ setActiveLoadPeriod }
                      setActiveFieldName={ setActiveFieldName }
                      showSideBar={ showChartsSideBar }
                      setShowSideBar={ setShowChartsSideBar }>

      <div className="field-temperatures">

        <TemperatureChartsContainer mappedTemperaturesList={ mappedTemperaturesList }
                                    currentGlobalZoomState={ currentGlobalZoomState }
                                    setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                    currentYZoomState={ currentYZoomState }
                                    setCurrentYZoomState={ setCurrentYZoomState }
                                    currentXZoomState={ currentXZoomState }
                                    setCurrentXZoomState={ setCurrentXZoomState }
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
    </ContentContainer>
  );
};

FieldTemperaturesChartView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default FieldTemperaturesChartView;
