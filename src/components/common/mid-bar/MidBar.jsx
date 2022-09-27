import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getClassNames } from '../../../tools/general/helpers.util';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import { requestClientFieldList } from '../../../redux/actions/client.action';

import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  CLIENT_FIELDS_MIDBAR,
  DOUBLE_DROPDOWN,
  DROPDOWN_ALL,
  FIELD_CHART_MIDBAR,
  FIELD_TEMPERATURES_MIDBAR,
  MID_BAR_ASSISTANT,
  MID_BAR_CHART,
  MID_BAR_EMAIL_READINGS,
  MID_BAR_IRRICOMS,
  MID_BAR_LAST_READINGS,
  MID_BAR_MONITOR,
  MID_BAR_NEGLECTED_FIELDS,
  MID_BAR_OVERVIEW,
  OVERVIEW_MIDBAR,
  PREVIOUS,
  PREVIOUS_RECOMMENDATIONS,
  SETTINGS_GEAR,
  TOGGLE_YAXIS
} from '../../../tools/general/system-variables.util';

import Button from '../button/Button';
import DropDownButton from '../drop-down/DropDownButton';
import NumberInput from '../input/number/NumberInput';
import SVGIcon from '../icon/SVGIcon';

import './mid-bar.scss';

const MidBar = ({
                  view,
                  activePath,
                  handleOverviewClick,
                  handleMonitorProbesClick,
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
                  mappedFieldList,
                  mappedMenuList,
                  setActiveFieldName,
                  yAxisShared,
                  setYAxisShared
                }) => {

  switch (view) {
    case OVERVIEW_MIDBAR:
      return <OverviewMidBar activePath={ activePath }
                             handleOverviewClick={ handleOverviewClick }
                             handleMonitorProbesClick={ handleMonitorProbesClick } />;
    case CLIENT_FIELDS_MIDBAR:
      return <ClientFieldsTableMidBar filteredTableData={ filteredTableData }
                                      hasSubGroups={ hasSubGroups }
                                      setFilteredTableData={ setFilteredTableData }
                                      setActiveTableData={ setActiveTableData }
                                      clientRequestFields={ setActiveTableData }
                                      toggleDropdowns={ toggleDropdowns }
                                      showClientsSideBar={ showClientsSideBar } />;
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
  }
};

MidBar.propTypes = {};

export default MidBar;

const OverviewMidBar = ({
                          activePath,
                          handleOverviewClick,
                          handleMonitorProbesClick,
                          handleFindLastRecordingsClick,
                          handleAssistantClick,
                          handleNeglectedClick,
                          handleEmailReadingsClick,
                          handleChartClick,
                          handleIrricomsClick
                        }) => {

  return (
    <div className="overview__midbar">

      <Button label={ MID_BAR_ASSISTANT }
              onClick={ handleAssistantClick }
              white={ !activePath.includes('assistant') } />

      <Button label={ MID_BAR_OVERVIEW }
              onClick={ handleOverviewClick }
              white={ !activePath.includes('overview') } />

      <Button label={ MID_BAR_MONITOR }
              onClick={ handleMonitorProbesClick }
              white={ !activePath.includes('monitor') } />

      <Button label={ MID_BAR_LAST_READINGS }
              onClick={ handleFindLastRecordingsClick }
              white={ !activePath.includes('recordings') } />

      <Button label={ MID_BAR_NEGLECTED_FIELDS }
              onClick={ handleNeglectedClick }
              white={ !activePath.includes('neglected') } />

      <Button label={ MID_BAR_EMAIL_READINGS }
              onClick={ handleEmailReadingsClick }
              white={ !activePath.includes('email') } />

      <Button label={ MID_BAR_CHART }
              onClick={ handleChartClick }
              white={ !activePath.includes('chart') } />

      <Button label={ MID_BAR_IRRICOMS }
              onClick={ handleIrricomsClick }
              white={ !activePath.includes('irricoms') } />
    </div>
  );
};

OverviewMidBar.propTypes = {
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
                                   clientRequestFields,
                                   toggleDropdowns,
                                   showClientsSideBar
                                 }) => {

  const dispatch = useDispatch();
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
                spaced />
        <Button icon={ PREVIOUS }
                tooltip={ PREVIOUS_RECOMMENDATIONS }
                spaced />
        <Button label={ 'Show Archives' }
                spaced />
        <Button label={ 'Reload Recommendations' }
                spaced
                onClick={ () => {
                  setFilteredTableData(undefined);
                  setActiveTableData([]);
                  dispatch(requestClientFieldList(clientRequestFields));
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
  const { groupName, clientName, fieldName } = useParams();

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

  return (
    <div className={ 'field-chart__top-bar' }>
      <div className="field-chart__top-bar--left">
        <FieldButtons className={ 'field-chart__top-bar--left-inner' }
                      setShowChartsSideBar={ setShowChartsSideBar }
                      showChartsSideBar={ showChartsSideBar }
                      viewClient={ viewClient } />

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
  const { groupName, clientName, fieldName } = useParams();

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
                      setShowChartsSideBar={ setShowChartsSideBar }
                      showChartsSideBar={ showChartsSideBar }
                      viewClient={ viewClient } />
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

const FieldButtons = ({ className, setShowChartsSideBar, showChartsSideBar, viewClient }) => {
  return (
    <div className={ className }>
      <Button label={ 'Fields' }
              onClick={ () => setShowChartsSideBar(!showChartsSideBar) }
              chartbar
              spaced />
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
