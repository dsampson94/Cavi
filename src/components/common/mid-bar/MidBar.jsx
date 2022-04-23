import React, { useState } from 'react';

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

import './mid-bar.scss';

const MidBar = ({
                  activeButton,
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

  const [overviewActive, setOverviewActive] = useState(true);
  const [monitorProbesActive, setMonitorProbesActive] = useState(false);
  const [findLastRecordingsActive, setFindLastRecordingsActive] = useState(false);
  const [assistantActive, setAssistantActive] = useState(false);
  const [neglectedActive, setNeglectedActive] = useState(false);
  const [emailReadingsActive, setEmailReadingsActive] = useState(false);
  const [chartActive, setChartActive] = useState(false);
  const [irricomsActive, setIrricomsActive] = useState(false);

  return (
    <div className="mid-bar">

      <Button label={ MID_BAR_OVERVIEW }
              onClick={ handleOverviewClick }
              white={ !overviewActive } />

      <Button label={ MID_BAR_MONITOR }
              onClick={ handleMonitorProbesClick }
              white={ !monitorProbesActive } />

      <Button label={ MID_BAR_LAST_READINGS }
              onClick={ handleFindLastRecordingsClick }
              white={ !findLastRecordingsActive } />

      <Button label={ MID_BAR_ASSISTANT }
              onClick={ handleAssistantClick }
              white={ !assistantActive } />

      <Button label={ MID_BAR_NEGLECTED_FIELDS }
              onClick={ handleNeglectedClick }
              white={ !neglectedActive } />

      <Button label={ MID_BAR_EMAIL_READINGS }
              onClick={ handleEmailReadingsClick }
              white={ !emailReadingsActive } />

      <Button label={ MID_BAR_CHART }
              onClick={ handleChartClick }
              white={ !chartActive } />

      <Button label={ MID_BAR_IRRICOMS }
              onClick={ handleIrricomsClick }
              white={ !irricomsActive } />
    </div>
  );
};

MidBar.defaultProps = {};

MidBar.propTypes = {};

export default MidBar;
