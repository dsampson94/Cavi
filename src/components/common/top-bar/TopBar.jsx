import React from 'react';
import { useHistory } from 'react-router';

import { bool, func } from 'prop-types';

import {
  EMAIL, EMAIL_RECOMMENDATIONS, LOG_OUT, LOG_OUT_ICON,
  MAPS,
  MAPS_ICON,
  PRINT,
  PRINT_ICON, REPORT_PROBLEM, REPORT_PROBLEM_ICON,
  WEATHER_STATION,
  WEATHER_STATION_ICON
} from '../../../tools/general/system-variables.util';

import Button from '../button/Button';
import TextInput from '../input/text/TextInput';
import ThemeToggle from '../theme-toggle/ThemeToggle';

import './top-bar.scss';

const TopBar = ({ showSideBar, setShowSideBar }) => {

  const history = useHistory();

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__text">
          <img src={ '/favicon-irricheck.ico' }
               alt={ 'icon' }
               height={ 20 } />
          IrriCheck Pulse
        </div>
        <div className="top-bar__lower-left">
          <Button icon={ EMAIL_RECOMMENDATIONS }
                  tooltip={ EMAIL } />
          <Button label={ 'Other Farm' }
                  onClick={ () => setShowSideBar(!showSideBar) } />
          <Button icon={ WEATHER_STATION_ICON }
                  tooltip={ WEATHER_STATION } />
          <Button icon={ MAPS_ICON }
                  tooltip={ MAPS } />
          <Button icon={ PRINT_ICON }
                  tooltip={ PRINT } />
          <Button label={ 'Field Setup' } />
        </div>
      </div>
      <div className="top-bar__right">
        <Button label={ 'Probes Monitor' } />
        <ThemeToggle />
        <TextInput placeholder={ 'Probes on Google Maps' } />
        <Button icon={ REPORT_PROBLEM_ICON }
                tooltip={ REPORT_PROBLEM }
                leftAlignedTooltip />
        <Button icon={ LOG_OUT_ICON }
                tooltip={ LOG_OUT }
                onClick={ () => history.push('/') }
                leftAlignedTooltip />
      </div>
    </div>
  );
};

TopBar.defaultProps = {};

TopBar.propTypes = {
  showSideBar: bool.isRequired,
  setShowSideBar: func.isRequired
};

export default TopBar;
