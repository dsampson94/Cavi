import React, { useState } from 'react';
import { zoomIdentity } from 'd3';

import { arrayOf, shape } from 'prop-types';

import { FIELD_TEMPERATURES, FIELD_TEMPERATURES_MIDBAR } from '../../../tools/general/system-variables.util';

import { TemperatureChartsContainer } from './FieldTemperaturesChartView.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';

import './field-temperatures-chart-view.scss';

const FieldTemperaturesChartView = ({
                                      mappedFieldList,
                                      mappedTemperaturesList,
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
    <ContentContainer view={ FIELD_TEMPERATURES }
                      mappedFieldList={ mappedFieldList }
                      setActiveLoadPeriod={ setActiveLoadPeriod }
                      setActiveFieldName={ setActiveFieldName }
                      showChartsSideBar={ showChartsSideBar }>

      <div className="field-temperatures">
        <MidBar view={ FIELD_TEMPERATURES_MIDBAR }
                activeDataPeriod={ activeDataPeriod }
                setActiveDataPeriod={ setActiveDataPeriod }
                showChartsSideBar={ showChartsSideBar }
                setShowChartsSideBar={ setShowChartsSideBar }
                mappedFieldList={ mappedFieldList }
                mappedMenuList={ mappedMenuList }
                setActiveFieldName={ setActiveFieldName }
                yAxisShared={ yAxisShared }
                setYAxisShared={ setYAxisShared }
                setXAxisViewMode={ setXAxisViewMode } />

        <div className={ 'field-temperatures__container' }>
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
        <div className="field-temperatures__lower" />

      </div>
    </ContentContainer>
  );
};

FieldTemperaturesChartView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default FieldTemperaturesChartView;
