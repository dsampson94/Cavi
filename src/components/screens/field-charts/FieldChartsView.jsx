import React, { useEffect, useState } from 'react';
import { zoomIdentity } from 'd3';
import { useLocation, useParams } from 'react-router';

import { arrayOf, shape } from 'prop-types';

import { FIELD_CHART_MIDBAR, FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { AggregateChartsContainer, DeficitChartsContainer } from './FieldChartsView.util';
import { daysFromToday } from '../../../tools/general/helpers.util';
import { retrieveUserClientListFromLocalStorage } from '../../../tools/storage/localStorage';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';
import Button from '../../common/button/Button';
import FieldCommentsSlideOverTw from '../../common/slide-over/FieldCommentsSlideOverTw';

import './field-charts-view.scss';

const ClientFieldsView = ({
                            mappedFieldList,
                            mappedChartList,
                            mappedMenuList,
                            mappedVoltChartList,
                            mappedFlowMeterDailyChartList,
                            mappedFlowMeterHourlyList,
                            mappedECChartList,
                            mappedVPDChartList,
                            mappedActualChartList,
                            activeLoadPeriod,
                            setActiveLoadPeriod,
                            setActiveFieldName,
                            activeProbeFactor,
                            setActiveProbeFactor,
                            activeExtendedChart,
                            setActiveExtendedChart
                          }) => {

  const location = useLocation();
  const { fieldName } = useParams();

  const [showChartsModal, setShowChartsModal] = useState(false);
  const [showChartsSideBar, setShowChartsSideBar] = useState(true);
  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const [hoverActive, setHoverActive] = useState(false);
  const [yAxisShared, setYAxisShared] = useState(false);
  const [date, setDate] = useState(null);
  const [activeDataPeriod, setActiveDataPeriod] = useState('All');
  const [xAxisViewMode, setXAxisViewMode] = useState('topBar');

  let isAgent = retrieveUserClientListFromLocalStorage().access.agent;

  useEffect(() => {
    setXAxisViewMode('topBar');
    setActiveDataPeriod('All');
    setCurrentGlobalZoomState(zoomIdentity);
    setCurrentXZoomState(zoomIdentity);
    setCurrentYZoomState(zoomIdentity);
  }, [activeLoadPeriod]);

  const getTopBarValue = () => {
    const recommendations = [];
    mappedFieldList?.forEach(item => {
      if (fieldName === item.fieldName.locationName) {
        recommendations.push(item.fieldName.recommend1);
        recommendations.push(item.fieldName.recommend2);
        recommendations.push(item.fieldName.recommend3);
        recommendations.push(item.fieldName.recommend4);
        recommendations.push(item.fieldName.recommend5);
        recommendations.push(item.fieldName.recommend6);
        recommendations.push(item.fieldName.recommend7);
        recommendations.push(item.fieldName.recommend8);
      }
    });
    return recommendations;
  };

  return (
    <ContentContainer view={ FIELD_CHARTS }
                      mappedFieldList={ mappedFieldList }
                      setActiveLoadPeriod={ setActiveLoadPeriod }
                      setActiveFieldName={ setActiveFieldName }
                      showSideBar={ showChartsSideBar }
                      setShowSideBar={ setShowChartsSideBar }>

      <div className="field-chart">

        <div className={ 'flex w-full' }>
          { location.pathname.includes('field-charts') &&
            <div className={ 'flex w-full h-full' }>
              <Button label={ daysFromToday(0) }
                      lowerLabel={ getTopBarValue()[0] } middatebar />
              <Button label={ daysFromToday(1) }
                      lowerLabel={ getTopBarValue()[1] } middatebar />
              <Button label={ daysFromToday(2) }
                      lowerLabel={ getTopBarValue()[2] } middatebar />
              <Button label={ daysFromToday(3) }
                      lowerLabel={ getTopBarValue()[3] } middatebar />
              <Button label={ daysFromToday(4) }
                      lowerLabel={ getTopBarValue()[4] } middatebar />
              <Button label={ daysFromToday(5) }
                      lowerLabel={ getTopBarValue()[5] } middatebar />
              <Button label={ daysFromToday(6) }
                      lowerLabel={ getTopBarValue()[6] } middatebar />
              <Button label={ daysFromToday(7) }
                      lowerLabel={ getTopBarValue()[7] } middatebar spaced />
            </div> }
        </div>

        <MidBar view={ FIELD_CHART_MIDBAR }
                activeDataPeriod={ activeDataPeriod }
                setActiveDataPeriod={ setActiveDataPeriod }
                showChartsSideBar={ showChartsSideBar }
                setShowChartsSideBar={ setShowChartsSideBar }
                mappedFieldList={ mappedFieldList }
                mappedMenuList={ mappedMenuList }
                setActiveFieldName={ setActiveFieldName }
                yAxisShared={ yAxisShared }
                setYAxisShared={ setYAxisShared }
                mappedChartList={ mappedChartList }
                activeExtendedChart={ activeExtendedChart }
                setActiveExtendedChart={ setActiveExtendedChart }
                isAgent={ isAgent } />

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
                                    mappedVoltChartList={ mappedVoltChartList }
                                    mappedFlowMeterDailyChartList={ mappedFlowMeterDailyChartList }
                                    mappedFlowMeterHourlyList={ mappedFlowMeterHourlyList }
                                    mappedECChartList={ mappedECChartList }
                                    mappedVPDChartList={ mappedVPDChartList }
                                    mappedActualChartList={ mappedActualChartList }
                                    currentGlobalZoomState={ currentGlobalZoomState }
                                    setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                                    currentYZoomState={ currentYZoomState }
                                    setCurrentYZoomState={ setCurrentYZoomState }
                                    currentXZoomState={ currentXZoomState }
                                    setCurrentXZoomState={ setCurrentXZoomState }
                                    showChartsModal={ showChartsModal }
                                    setShowChartsModal={ setShowChartsModal }
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
                                    activeExtendedChart={ activeExtendedChart }
                                    setActiveExtendedChart={ setActiveExtendedChart }
                                    date={ date }
                                    setDate={ setDate } />
        </div>

      </div>

    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
