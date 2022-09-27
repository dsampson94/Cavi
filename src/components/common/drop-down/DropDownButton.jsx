import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { bool } from 'prop-types';

import {
  ACTUAL_IRRIGATION_OPTION,
  ANALYSE_FIELD_OPTION,
  CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  DEFICIT_OPTION,
  EC_OPTION,
  EXCEL_OPTION,
  FLOW_DAILY_OPTION,
  FLOW_DETAILED_OPTION,
  LOG_OUT_ICON,
  RAIN_OPTION,
  REPORT_PROBLEM_ICON,
  TOPBAR_OPTIONS,
  VOLT_READINGS_OPTION,
  VPD_OPTION
} from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import { requestLogout } from '../../../redux/actions/auth.action';

import Button from '../button/Button';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import SVGIcon from '../icon/SVGIcon';

import './drop-down-menu.scss';

const DropDownButton = ({
                          name,
                          fill,
                          menu,
                          menuData,
                          className,
                          setActiveDataPeriod,
                          onLogOutClick,
                          left,
                          period,
                          mid,
                          tiny,
                          onDivClick
                        }) => {
  return (
    <div className={ className }
         onClick={ onDivClick }>

      <SVGIcon name={ name }
               fill={ fill }
               tiny={ tiny } />

      <DropDownMenu menu={ menu }
                    menuData={ menuData }
                    setActiveDataPeriod={ setActiveDataPeriod }
                    onLogOutClick={ onLogOutClick }
                    left={ left }
                    period={ period }
                    mid={ mid } />
    </div>
  );
};

export default DropDownButton;

const DropDownMenu = ({ menu, menuData, left, mid, period, setActiveDataPeriod, onLogOutClick }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [showPrimaryDropDown, setShowPrimaryDropDown] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showHiddenTextOption, setShowHiddenTextOption] = useState(null);

  const showHiddenText = (option, show) => {
    setShowHiddenTextOption(option);
    setShowText(show);
  };

  const logout = () => {
    dispatch(requestLogout());
    history.push('/');
  };

  return (
    <div className="dropdown"
         onClick={ () => setShowPrimaryDropDown(!showPrimaryDropDown) }>

      { showPrimaryDropDown &&
        <div className={ getClassNames('dropdown__popup', { left, mid, period, logout: !!onLogOutClick }) }>
          { menu === CHART_TOP_BAR_MENU &&
            <div>
              <div>{ 'Probes on field:' }</div>
              { Object.keys(menuData[0])?.map((key) => {
                return <div style={ { color: 'blue' } }>{ key }</div>;
              }) }
              <div>{ menuData[1] }</div>
              <div>{ menuData[2] }</div>
              <div>{ menuData[3] }</div>
            </div> }

          { menu === CHART_USAGE_MENU &&
            <div>
              <div>{ DEFICIT_OPTION }</div>
              <div>{ VOLT_READINGS_OPTION }</div>
              <div>{ FLOW_DAILY_OPTION }</div>
              <div>{ FLOW_DETAILED_OPTION }</div>
              <div>{ RAIN_OPTION }</div>
              <div>{ EC_OPTION }</div>
              <div>{ VPD_OPTION }</div>
              <div>{ ACTUAL_IRRIGATION_OPTION }</div>
              <div>{ EXCEL_OPTION }</div>
              <div>{ ANALYSE_FIELD_OPTION }</div>
            </div> }

          { menu === CHART_USAGE_SASRI_MENU &&
            <div>
              <div>{ 'SASRI parameters:' }</div>
            </div> }

          { menu === CHART_ACTIVE_PERIOD &&
            <div>
              <div onClick={ () => setActiveDataPeriod('All') }>{ 'All readings' }</div>
              <div onClick={ () => setActiveDataPeriod(100) }>{ '100' }</div>
              <div onClick={ () => setActiveDataPeriod(56) }>{ '56' }</div>
              <div onClick={ () => setActiveDataPeriod(28) }>{ '28' }</div>
              <div onClick={ () => setActiveDataPeriod(21) }>{ '21' }</div>
              <div onClick={ () => setActiveDataPeriod(14) }>{ '14' }</div>
              <div onClick={ () => setActiveDataPeriod(7) }>{ '7' }</div>
              <div onClick={ () => setActiveDataPeriod(1) }>{ '1' }</div>
            </div> }

          { menu === TOPBAR_OPTIONS &&
            <div className={ 'dropdown__popup--logout-inner' }>

              <section onMouseOver={ () => showHiddenText(1, true) }
                       onMouseLeave={ () => showHiddenText(1, false) }>
                <ThemeToggle />
              </section>

              { showText && showHiddenTextOption === 1 && <p>Toggle theme</p> }

              <section onMouseOver={ () => showHiddenText(2, true) }
                       onMouseLeave={ () => showHiddenText(2, false) }>
                <Button icon={ REPORT_PROBLEM_ICON }
                        leftAlignedTooltip
                        small />
              </section>


              { showText && showHiddenTextOption === 2 && <p>Report problem to agent</p> }

              <section onMouseOver={ () => showHiddenText(3, true) }
                       onMouseLeave={ () => showHiddenText(3, false) }
                       onClick={ logout }>
                <Button icon={ LOG_OUT_ICON }
                        onClick={ onLogOutClick }
                        leftAlignedTooltip
                        small />
              </section>

              { showText && showHiddenTextOption === 3 && <p>Log Out</p> }

            </div> }
        </div> }
    </div>
  );
};

DropDownButton.propTypes = {
  left: bool,
  mid: bool
};