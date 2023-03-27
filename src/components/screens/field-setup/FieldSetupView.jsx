import React, { useEffect, useState } from 'react';

import { any, arrayOf, shape, string } from 'prop-types';
import { getClassNames } from '../../../tools/general/helpers.util';

import {
  ADD_FIELD_ROUTE,
  CLIENT_DETAILS_ROUTE,
  FIELD_SETUP,
  FIELDS_SPLIT_ROUTE,
  GENERAL_ROUTE,
  ML_FORECASTS_ROUTE,
  PROBES_DETAILED_ROUTE,
  PROBES_SUMMARY_ROUTE,
  PUSH_WARNING_ROUTE,
  SMS_RECOMMENDATION_ROUTE,
  SMS_WARNING_ROUTE,
  USERS_ROUTE
} from '../../../tools/general/system-variables.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import { GeneralScreen } from './components/GeneralScreen';

import './field-setup-view.scss';
import { ProbesSummaryScreen } from './components/ProbesSummaryScreen';
import { SmsWarningScreen } from './components/SmsWarningScreen';
import { PushWarningScreen } from './components/PushWarningScreen';
import { FieldsSplitScreen } from './components/FieldsSplitScreen';
import { AddFieldScreen } from './components/AddFieldScreen';
import { MlForecastsScreen } from './components/MlForecastsScreen';
import { SmsRecommendationScreen } from './components/SmsRecommendationScreen';
import { UsersScreen } from './components/UsersScreen';
import { ClientDetailsScreen } from './components/ClientDetailsScreen';
import { ProbesDetailedScreen } from './components/ProbesDetailedScreen';
import func from 'lodash/fp/at';

const FieldSetupView = ({
                          mappedSetupList,
                          mappedDropdownList,
                          activeScreen,
                          clientRequestParams,
                          setSelectedProbeNumber,
                          setSelectedFieldName,
                          updateFieldDetails,
                          setUpdatedFieldList,
                          valueToUpdate,
                          setValueToUpdate
                        }) => {

  const [showSetupSideBar, setShowSetupSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [activeTableData, setActiveTableData] = useState([]);

  const activeScreenMapping = {
    [GENERAL_ROUTE]: <GeneralScreen activeTableData={ activeTableData }
                                    mappedDropdownList={ mappedDropdownList }
                                    hiddenColumns={ ['color'] }
                                    selectedIndex={ selectedIndex }
                                    setSelectedIndex={ setSelectedIndex }
                                    setActiveTableData={ setActiveTableData }
                                    updateFieldDetails={ updateFieldDetails }
                                    setUpdatedFieldList={ setUpdatedFieldList }
                                    valueToUpdate={ valueToUpdate }
                                    setValueToUpdate={ setValueToUpdate }
                                    setSelectedFieldName={ setSelectedFieldName }
                                    setSelectedProbeNumber={ setSelectedProbeNumber } />,

    [PROBES_SUMMARY_ROUTE]: <ProbesSummaryScreen activeScreen={ activeScreen }
                                                 mappedSetupList={ mappedSetupList }
                                                 mappedDropdownList={ mappedDropdownList }
                                                 activeTableData={ activeTableData }
                                                 selectedIndex={ selectedIndex }
                                                 setSelectedIndex={ setSelectedIndex }
                                                 setActiveTableData={ setActiveTableData }
                                                 updateFieldDetails={ updateFieldDetails }
                                                 setUpdatedFieldList={ setUpdatedFieldList }
                                                 valueToUpdate={ valueToUpdate }
                                                 setValueToUpdate={ setValueToUpdate }
                                                 setSelectedFieldName={ setSelectedFieldName }
                                                 setSelectedProbeNumber={ setSelectedProbeNumber } />,

    [SMS_WARNING_ROUTE]: <SmsWarningScreen mappedDetails={ mappedSetupList?.[0] }
                                           activeTableData={ activeTableData }
                                           selectedIndex={ selectedIndex }
                                           setSelectedIndex={ setSelectedIndex }
                                           setActiveTableData={ setActiveTableData } />,

    [PUSH_WARNING_ROUTE]: <PushWarningScreen mappedDetails={ mappedSetupList?.[0] }
                                             activeTableData={ activeTableData }
                                             selectedIndex={ selectedIndex }
                                             setSelectedIndex={ setSelectedIndex }
                                             setActiveTableData={ setActiveTableData } />,

    [FIELDS_SPLIT_ROUTE]: <FieldsSplitScreen mappedDetails={ mappedSetupList?.[0] }
                                             activeTableData={ activeTableData }
                                             selectedIndex={ selectedIndex }
                                             setSelectedIndex={ setSelectedIndex }
                                             setActiveTableData={ setActiveTableData } />,

    [ADD_FIELD_ROUTE]: <AddFieldScreen mappedDetails={ mappedSetupList?.[0] } />,

    [CLIENT_DETAILS_ROUTE]: <ClientDetailsScreen mappedDetails={ mappedSetupList?.[0] } />,

    [USERS_ROUTE]: <UsersScreen mappedDetails={ mappedSetupList?.[0] } />,

    [SMS_RECOMMENDATION_ROUTE]: <SmsRecommendationScreen mappedDetails={ mappedSetupList?.[0] } />,

    [ML_FORECASTS_ROUTE]: <MlForecastsScreen mappedDetails={ mappedSetupList?.[0] } activeTableData={ activeTableData }
                                             selectedIndex={ selectedIndex }
                                             setSelectedIndex={ setSelectedIndex }
                                             setActiveTableData={ setActiveTableData } />,

    [PROBES_DETAILED_ROUTE]: <ProbesDetailedScreen activeTableData={ activeTableData }
                                                   selectedIndex={ selectedIndex }
                                                   setSelectedIndex={ setSelectedIndex }
                                                   setActiveTableData={ setActiveTableData } />
  };

  useEffect(() => {
    setActiveTableData(mappedSetupList);
  }, [mappedSetupList]);

  return (
    <ContentContainer view={ FIELD_SETUP }
                      clientRequestParams={ clientRequestParams }
                      showSideBar={ showSetupSideBar }
                      setShowSideBar={ setShowSetupSideBar }>

      <div className={ getClassNames('field-setup', { show: showSetupSideBar }) }>

        { activeScreenMapping[activeScreen] || activeScreenMapping[GENERAL_ROUTE] }

      </div>
    </ContentContainer>
  );
};

FieldSetupView.propTypes = {
  mappedSetupList: arrayOf(shape({})),
  mappedDropdownList: arrayOf(arrayOf(shape({}))),
  activeScreen: string.isRequired,
  clientRequestParams: shape({}),
  setSelectedProbeNumber: func.isRequired,
  setSelectedFieldName: func.isRequired,
  updateFieldDetails: func.isRequired,
  setUpdatedFieldList: func.isRequired,
  valueToUpdate: any,
  setValueToUpdate: func.isRequired
};


export default React.memo(FieldSetupView);
