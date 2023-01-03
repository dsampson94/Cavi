import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import { daysFromToday, getClassNames } from '../../../tools/general/helpers.util';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  CLIENT_FIELDS_MIDBAR,
  DASHBOARD,
  DOUBLE_DROPDOWN,
  DROPDOWN_ALL,
  FIELD_CHART_MIDBAR,
  FIELD_REPORTS,
  FIELD_SETUP_MIDBAR,
  FIELD_TEMPERATURES_MIDBAR,
  MID_BAR_ASSISTANT,
  MID_BAR_CHART,
  MID_BAR_EMAIL_READINGS,
  MID_BAR_IRRICOMS,
  MID_BAR_LAST_READINGS,
  MID_BAR_MONITOR,
  MID_BAR_NEGLECTED_FIELDS,
  MID_BAR_OVERVIEW,
  PREVIOUS,
  PREVIOUS_RECOMMENDATIONS,
  SETTINGS_GEAR,
  TOGGLE_YAXIS
} from '../../../tools/general/system-variables.util';

import Button from '../button/Button';
import DropDownButton from '../drop-down/drop-down-button/DropDownButton';
import NumberInput from '../input/number/NumberInput';
import SVGIcon from '../SVGIcon/SVGIcon';

import './mid-bar.scss';

const MidBar = ({
                  view,
                  activePath,
                  handleAssistantClick,
                  handleOverviewClick,
                  handleMonitorProbesClick,
                  handlelastReadingsClick,
                  handleNeglectedClick,
                  handleEmailReadingsClick,
                  handleRawReadingsClick,
                  handleIrricomsClick,
                  filteredTableData,
                  hasSubGroups,
                  setFilteredTableData,
                  setActiveTableData,
                  toggleDropdowns,
                  showClientsSideBar,
                  activeDataPeriod,
                  setActiveDataPeriod,
                  showChartsSideBar,
                  setShowChartsSideBar,
                  showSetupSideBar,
                  setShowSetupSideBar,
                  mappedFieldList,
                  mappedMenuList,
                  setActiveFieldName,
                  yAxisShared,
                  setYAxisShared,
                  reloadToggleActive,
                  setReloadToggleActive
                }) => {

  switch (view) {
    case DASHBOARD:
      return <DashboardMidBar activePath={ activePath }
                              handleAssistantClick={ handleAssistantClick }
                              handleOverviewClick={ handleOverviewClick }
                              handleMonitorProbesClick={ handleMonitorProbesClick }
                              handlelastReadingsClick={ handlelastReadingsClick }
                              handleNeglectedClick={ handleNeglectedClick }
                              handleEmailReadingsClick={ handleEmailReadingsClick }
                              handleRawReadingsClick={ handleRawReadingsClick }
                              handleIrricomsClick={ handleIrricomsClick } />;
    case CLIENT_FIELDS_MIDBAR:
      return <ClientFieldsTableMidBar filteredTableData={ filteredTableData }
                                      hasSubGroups={ hasSubGroups }
                                      setFilteredTableData={ setFilteredTableData }
                                      setActiveTableData={ setActiveTableData }
                                      toggleDropdowns={ toggleDropdowns }
                                      showClientsSideBar={ showClientsSideBar }
                                      reloadToggleActive={ reloadToggleActive }
                                      setReloadToggleActive={ setReloadToggleActive } />;
    case FIELD_CHART_MIDBAR:
      return <FieldChartsMidBar activeDataPeriod={ activeDataPeriod }
                                setActiveDataPeriod={ setActiveDataPeriod }
                                showChartsSideBar={ showChartsSideBar }
                                setShowChartsSideBar={ setShowChartsSideBar }
                                mappedFieldList={ mappedFieldList }
                                mappedMenuList={ mappedMenuList }
                                setActiveFieldName={ setActiveFieldName }
                                yAxisShared={ yAxisShared }
                                setYAxisShared={ setYAxisShared } />;

    case FIELD_TEMPERATURES_MIDBAR:
      return <FieldTemperaturesChartsMidBar activeDataPeriod={ activeDataPeriod }
                                            setActiveDataPeriod={ setActiveDataPeriod }
                                            showChartsSideBar={ showChartsSideBar }
                                            setShowChartsSideBar={ setShowChartsSideBar }
                                            mappedFieldList={ mappedFieldList }
                                            mappedMenuList={ mappedMenuList }
                                            setActiveFieldName={ setActiveFieldName }
                                            yAxisShared={ yAxisShared }
                                            setYAxisShared={ setYAxisShared } />;

    case FIELD_SETUP_MIDBAR:
      return <FieldSetupMidBar showSetupSideBar={ showSetupSideBar }
                               setShowSetupSideBar={ setShowSetupSideBar }
                               mappedFieldList={ mappedFieldList }
                               mappedMenuList={ mappedMenuList }
                               setActiveFieldName={ setActiveFieldName }
                               yAxisShared={ yAxisShared }
                               setYAxisShared={ setYAxisShared } />;

    case FIELD_REPORTS:
      return <FieldReportsMidBar showSetupSideBar={ showSetupSideBar }
                                 setShowSetupSideBar={ setShowSetupSideBar }
                                 mappedFieldList={ mappedFieldList }
                                 mappedMenuList={ mappedMenuList }
                                 setActiveFieldName={ setActiveFieldName }
                                 yAxisShared={ yAxisShared }
                                 setYAxisShared={ setYAxisShared } />;
  }
};

MidBar.propTypes = {};

export default MidBar;

const DashboardMidBar = ({
                           activePath,
                           handleAssistantClick,
                           handleOverviewClick,
                           handleMonitorProbesClick,
                           handlelastReadingsClick,
                           handleNeglectedClick,
                           handleEmailReadingsClick,
                           handleRawReadingsClick,
                           handleIrricomsClick
                         }) => {

  return (
    <div className="overview__midbar">

      <Button label={ MID_BAR_ASSISTANT }
              onClick={ handleAssistantClick }
              selected={ activePath.includes('assistant') } />

      <Button label={ MID_BAR_OVERVIEW }
              onClick={ handleOverviewClick }
              selected={ activePath.includes('overview') } />

      <Button label={ MID_BAR_MONITOR }
              onClick={ handleMonitorProbesClick }
              selected={ activePath.includes('monitor-probes') } />

      <Button label={ MID_BAR_LAST_READINGS }
              onClick={ handlelastReadingsClick }
              selected={ activePath.includes('last-readings') } />

      <Button label={ MID_BAR_NEGLECTED_FIELDS }
              onClick={ handleNeglectedClick }
              selected={ activePath.includes('neglected-fields') } />

      <Button label={ MID_BAR_EMAIL_READINGS }
              onClick={ handleEmailReadingsClick }
              selected={ activePath.includes('email-readings') } />

      <Button label={ MID_BAR_CHART }
              onClick={ handleRawReadingsClick }
              selected={ activePath.includes('raw-readings') } />

      <Button label={ MID_BAR_IRRICOMS }
              onClick={ handleIrricomsClick }
              selected={ activePath.includes('irricoms') } />
    </div>
  );
};

DashboardMidBar.propTypes = {
  activePath: string,
  handleOverviewClick: func,
  handleMonitorProbesClick: func,
  handleFindLastRecordingsClick: func,
  handleAssistantClick: func,
  handleNeglectedClick: func,
  handleEmailReadingsClick: func,
  handleChartClick: func,
  handleIrricomsClick: func
};

const ClientFieldsTableMidBar = ({
                                   filteredTableData,
                                   hasSubGroups,
                                   setFilteredTableData,
                                   setActiveTableData,
                                   toggleDropdowns,
                                   showClientsSideBar,
                                   reloadToggleActive,
                                   setReloadToggleActive
                                 }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  return (
    <div className={ getClassNames('client-fields__top-bar', { show: showClientsSideBar }) }>
      <div className="client-fields__top-bar-left">
        { hasSubGroups &&
        <>
          { !filteredTableData &&
          <div className="client-fields__top-bar-left-button">
            <Button icon={ DROPDOWN_ALL }
                    onClick={ toggleDropdowns } />
          </div> }
          { filteredTableData &&
          <div className="client-fields__top-bar-left-no-button" /> }
        </> }
        { !hasSubGroups &&
        <div className="client-fields__top-bar-left-no-button" /> }
        <p>{ `Recommendations: ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</p>
      </div>
      <div className="client-fields__top-bar-right">
        <Button icon={ BULLSEYE }
                iconFill={ '#C24C41' }
                tooltip={ ACCURACY_ANALYSIS }
                spaced />
        <Button label={ 'Reports' }
                onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-reports`) }
                spaced />
        <Button icon={ PREVIOUS }
                tooltip={ PREVIOUS_RECOMMENDATIONS }
                spaced />
        <Button label={ 'Show Archives' }
                spaced />
        <Button label={ 'Reload Recommendations' }
                spaced
                onClick={ () => {
                  setActiveTableData([]);
                  setFilteredTableData(undefined);
                  setReloadToggleActive(!reloadToggleActive);
                } } />
      </div>
    </div>
  );
};

ClientFieldsTableMidBar.propTypes = {
  filteredTableData: arrayOf(shape({})),
  hasSubGroups: bool,
  setFilteredTableData: func,
  setActiveTableData: func,
  clientRequestFields: shape({}),
  toggleDropdowns: func
};

const FieldChartsMidBar = ({
                             activeDataPeriod,
                             setActiveDataPeriod,
                             showChartsSideBar,
                             setShowChartsSideBar,
                             mappedFieldList,
                             mappedMenuList,
                             setActiveFieldName,
                             yAxisShared,
                             setYAxisShared
                           }) => {

  const history = useHistory();
  const location = useLocation();

  const { groupName, clientName, probeNumber, fieldName } = useParams();

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
    <div className={ 'field-chart__top-bar' }>
      <div className="field-chart__top-bar--left">

        <FieldButtons className={ 'field-chart__top-bar--left-inner' }
                      setShowSideBar={ setShowChartsSideBar }
                      showSideBar={ showChartsSideBar }
                      viewClient={ viewClient } />

        <div className={ 'field-chart__top-bar--left-outer' }>
          <Button label={ 'Temperatures' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field-temperatures/${ probeNumber }/${ fieldName }`) }
                  chartbar
                  spaced />
        </div>

        <DropDownButton name={ SETTINGS_GEAR }
                        className={ 'field-chart__top-bar--left__settings' }
                        fill={ '#6E8192' }
                        menu={ CHART_TOP_BAR_MENU }
                        menuData={ mappedMenuList }
                        tiny />

        <div className="field-chart__top-bar--left__settings"
             onClick={ () => setYAxisShared(!yAxisShared) }>
          <SVGIcon name={ TOGGLE_YAXIS } tiny fill={ yAxisShared ? '#00B8B0' : '#0081ff' } />
        </div>

        <p>{ 'Deficit per layer (mm)' }</p>
      </div>

      <div className="field-chart__top-bar--center">
        <div>{ fieldName }</div>
      </div>

      <div className="field-chart__top-bar--right">

        <div className="field-chart__top-bar--right-tool-container">

          <DropDownButton name={ DOUBLE_DROPDOWN }
                          menu={ CHART_ACTIVE_PERIOD }
                          className={ 'field-chart__top-bar--right-icon-container' }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          fill={ 'white' }
                          period />

          <NumberInput placeholder={ activeDataPeriod }
                       onChange={ onHandleChangeNumeric }
                       value={ activeDataPeriod }
                       min={ 1 }
                       chartbar />
        </div>

        <div className="field-chart__top-bar--right-days-container">
          <p style={ { fontSize: '10px', marginTop: '5px' } }>{ 'Days:' }</p>
        </div>

        { location.pathname.includes('field-charts') &&
        <div className={ 'field-chart__top-bar--right--datebar' }>
          <Button label={ daysFromToday(0) }
                  lowerLabel={ getTopBarValue()[0] } datebar />
          <Button label={ daysFromToday(1) }
                  lowerLabel={ getTopBarValue()[1] } datebar />
          <Button label={ daysFromToday(2) }
                  lowerLabel={ getTopBarValue()[2] } datebar />
          <Button label={ daysFromToday(3) }
                  lowerLabel={ getTopBarValue()[3] } datebar />
          <Button label={ daysFromToday(4) }
                  lowerLabel={ getTopBarValue()[4] } datebar />
          <Button label={ daysFromToday(5) }
                  lowerLabel={ getTopBarValue()[5] } datebar />
          <Button label={ daysFromToday(6) }
                  lowerLabel={ getTopBarValue()[6] } datebar />
          <Button label={ daysFromToday(7) }
                  lowerLabel={ getTopBarValue()[7] } datebar spaced />
        </div> }
      </div>
    </div>
  );
};

FieldChartsMidBar.propTypes = {};

const FieldTemperaturesChartsMidBar = ({
                                         activeDataPeriod,
                                         setActiveDataPeriod,
                                         showChartsSideBar,
                                         setShowChartsSideBar,
                                         mappedFieldList,
                                         setActiveFieldName
                                       }) => {

  const history = useHistory();
  const { groupName, clientName, probeNumber, fieldName } = useParams();

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
    history.push(`/client/${ groupName }/${ clientName }/field/${ field?.locationName }/${ field?.probeNumber }/temperatures`);
  };

  const onHandleChangeNumeric = (event) => {
    if (Number(event.target.value)) setActiveDataPeriod(event.target.value);
  };

  return (
    <div className={ 'field-temperatures__top-bar' }>
      <div className="field-temperatures__top-bar--left">

        <FieldButtons className={ 'field-temperatures__top-bar--left-inner' }
                      setShowSideBar={ setShowChartsSideBar }
                      showSideBar={ showChartsSideBar }
                      viewClient={ viewClient } />

        <div className={ 'field-chart__top-bar--left-outer' }>
          <Button label={ 'Deficits' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field/${ probeNumber }/${ fieldName }`) }
                  chartbar
                  spaced />
        </div>

      </div>

      <div className="field-temperatures__top-bar--center">
        <div>{ fieldName }</div>
      </div>

      <div className="field-temperatures__top-bar--right">
        <div className="field-temperatures__top-bar--right-tool-container">

          <DropDownButton name={ DOUBLE_DROPDOWN }
                          className={ 'field-temperatures__top-bar--right-icon-container' }
                          setActiveDataPeriod={ setActiveDataPeriod }
                          menu={ CHART_ACTIVE_PERIOD }
                          fill={ 'white' }
                          period />

          <NumberInput placeholder={ activeDataPeriod }
                       onChange={ onHandleChangeNumeric }
                       value={ activeDataPeriod }
                       min={ 1 }
                       chartbar />
        </div>

        <div className="field-temperatures__top-bar--right-days-container">
          <p style={ { fontSize: '10px', marginTop: '5px' } }>{ 'Days:' }</p>
        </div>
      </div>
    </div>
  );
};

FieldTemperaturesChartsMidBar.propTypes = {};

const FieldSetupMidBar = ({
                            showSetupSideBar,
                            setShowSetupSideBar,
                            mappedFieldList,
                            setActiveFieldName
                          }) => {

  const history = useHistory();
  const { groupName, clientName, probeNumber, fieldName } = useParams();

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
    history.push(`/client/${ groupName }/${ clientName }/field/${ field?.locationName }/${ field?.probeNumber }/temperatures`);
  };

  return (
    <div className="field-setup__top-bar">
      <div className="field-setup__top-bar--left">

        <FieldButtons className={ 'field-setup__top-bar--left-inner' }
                      setShowSideBar={ setShowSetupSideBar }
                      viewClient={ viewClient } />

        <div className={ 'field-chart__top-bar--left-outer' }>
          <Button label={ 'Deficits' }
                  onClick={ () => history.push(`/client/${ groupName }/${ clientName }/field/${ probeNumber }/${ fieldName }`) }
                  chartbar
                  spaced />
        </div>

      </div>

      <div className="field-temperatures__top-bar--center">
        <div>{ fieldName }</div>
      </div>

    </div>
  );
};

FieldSetupMidBar.propTypes = {};

const FieldReportsMidBar = ({ showClientsSideBar }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  return (
    <div className={ getClassNames('field-reports__top-bar', { show: showClientsSideBar }) }>
      <div className="field-reports__top-bar-left">
        <p>{ `Generated Reports for: ${ groupName?.toUpperCase() } - ${ clientName?.toUpperCase() }` }</p>
      </div>
      <div className="field-reports__top-bar-right">
        <Button label={ 'Upload Custom PDF' }
                spaced />
        <Button label={ 'Create New Report' }
                spaced />
      </div>
    </div>
  );
};
FieldReportsMidBar.propTypes = {};

const FieldButtons = ({ className, setShowSideBar, showSideBar, viewClient }) => {

  return (
    <div className={ className }>
      <Button label={ '<' }
              onClick={ () => viewClient(-1) }
              spaceds
              tiny
              chartbar
              white />
      <Button label={ '>' }
              onClick={ () => viewClient(1) }
              spaced
              tiny
              chartbar
              white />
    </div>
  );
};

FieldButtons.propTypes = {};
