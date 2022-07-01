import React from 'react';

import { func, string } from 'prop-types';

import Button from '../button/Button';
import {
  MID_BAR_ASSISTANT,
  MID_BAR_CHART,
  MID_BAR_EMAIL_READINGS,
  MID_BAR_IRRICOMS,
  MID_BAR_LAST_READINGS,
  MID_BAR_MONITOR,
  MID_BAR_NEGLECTED_FIELDS,
  MID_BAR_OVERVIEW
} from '../../../tools/general/system-variables.util';

import './overview-mid-bar.scss';

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
    <div className="overview-mid-bar">

      <Button label={ MID_BAR_OVERVIEW }
              onClick={ handleOverviewClick }
              white={ !activePath.includes('overview') } />

      <Button label={ MID_BAR_MONITOR }
              onClick={ handleMonitorProbesClick }
              white={ !activePath.includes('monitor') } />

      <Button label={ MID_BAR_LAST_READINGS }
              onClick={ handleFindLastRecordingsClick }
              white={ !activePath.includes('recordings') } />

      <Button label={ MID_BAR_ASSISTANT }
              onClick={ handleAssistantClick }
              white={ !activePath.includes('assistant') } />

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

export default OverviewMidBar;
