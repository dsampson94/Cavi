import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { getClassNames } from '../../../tools/general/helpers.util';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import {
  ACCURACY_ANALYSIS,
  BULLSEYE,
  CHART_TOP_BAR_MENU,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  CIRCLE_DROPDOWN,
  CLIENT_FIELDS_MIDBAR,
  DASHBOARD,
  DROPDOWN_ALL,
  FIELD_CHART_MIDBAR,
  FIELD_REPORTS,
  FIELD_SETUP_MIDBAR,
  FIELD_TEMPERATURES_MIDBAR,
  HIDDEN_MENU,
  INFO_CIRCLE,
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
  SINGLE_DROPDOWN,
  TOGGLE_YAXIS
} from '../../../tools/general/system-variables.util';

import Button from '../button/Button';
import DropDownButton from '../drop-down/drop-down-button/DropDownButton';
import SVGIcon from '../SVGIcon/SVGIcon';
import FieldChartsModal from '../modal/FieldChartsModal';

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
                  setReloadToggleActive,
                  mappedChartList,
                  activeExtendedChart,
                  setActiveExtendedChart,
                  isAgent
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
                                setYAxisShared={ setYAxisShared }
                                mappedChartList={ mappedChartList }
                                activeExtendedChart={ activeExtendedChart }
                                setActiveExtendedChart={ setActiveExtendedChart }
                                isAgentisAgent={ isAgent } />;

    case FIELD_TEMPERATURES_MIDBAR:
      return <FieldTemperaturesChartsMidBar activeDataPeriod={ activeDataPeriod }
                                            setActiveDataPeriod={ setActiveDataPeriod }
                                            showChartsSideBar={ showChartsSideBar }
                                            setShowChartsSideBar={ setShowChartsSideBar }
                                            mappedFieldList={ mappedFieldList }
                                            mappedMenuList={ mappedMenuList }
                                            setActiveFieldName={ setActiveFieldName }
                                            yAxisShared={ yAxisShared }
                                            setYAxisShared={ setYAxisShared }
                                            mappedChartList={ mappedChartList } />;

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

    default:
      return <></>;
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
                             mappedFieldList,
                             mappedMenuList,
                             yAxisShared,
                             setYAxisShared,
                             mappedChartList,
                             activeExtendedChart,
                             setActiveExtendedChart,
                             isAgent
                           }) => {

  const [showChartsModal, setShowChartsModal] = useState(false);

  return (
    <div className={ 'field-chart__top-bar' }>
      { mappedChartList && <div className={ isAgent === 1 ? 'field-chart__top-bar--left' : 'field-chart__top-bar--left-non-agent' }>

        <DropDownButton name={ SINGLE_DROPDOWN }
                        className={ 'chart__header__zoom-options--left-top__options' }
                        menu={ CHART_USAGE_SASRI_MENU } />

        <DropDownButton name={ CIRCLE_DROPDOWN }
                        activeExtendedChart={ activeExtendedChart }
                        setActiveExtendedChart={ setActiveExtendedChart }
                        className={ 'chart__header__zoom-options--left-top__options' }
                        menu={ CHART_USAGE_MENU } />

        <DropDownButton name={ INFO_CIRCLE }
                        className={ 'field-chart__top-bar--left__settings' }
                        fill={ '#6E8192' }
                        menu={ CHART_TOP_BAR_MENU }
                        menuData={ mappedMenuList }
                        mappedFieldList={ mappedFieldList }
                        settings
                        tiny />

        <div className="field-chart__top-bar--left__settings"
             onClick={ () => setYAxisShared(!yAxisShared) }>
          <SVGIcon name={ TOGGLE_YAXIS } tiny fill={ yAxisShared ? '#00B8B0' : '#0081ff' } />
        </div>

        { isAgent === 1 &&
        <DropDownButton name={ SETTINGS_GEAR }
                        className={ 'field-chart__top-bar--left__settings' }
                        fill={ '#6E8192' }
                        menu={ HIDDEN_MENU }
                        menuData={ mappedMenuList }
                        mappedFieldList={ mappedFieldList }
                        onDivClick={ () => setShowChartsModal(!showChartsModal) }
                        settings
                        tiny /> }

      </div> }

      { showChartsModal &&
      <FieldChartsModal showChartsModal={ showChartsModal }
                        setShowChartsModal={ setShowChartsModal } /> }
    </div>
  );
};

FieldChartsMidBar.propTypes = {};

const FieldTemperaturesChartsMidBar = ({
                                         mappedFieldList,
                                         mappedMenuList,
                                         yAxisShared,
                                         setYAxisShared,
                                         mappedChartList
                                       }) => {

  return (
    <div className={ 'field-temperatures__top-bar' }>

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

      </div>

      <div className="field-temperatures__top-bar--center">
        <div>{ fieldName }</div>
      </div>

    </div>
  );
};

FieldSetupMidBar.propTypes = {};

const FieldReportsMidBar = ({ showClientsSideBar }) => {

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
