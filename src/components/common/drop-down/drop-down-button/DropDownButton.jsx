import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';

import { bool } from 'prop-types';

import {
  ACTUAL_IRRIGATION_OPTION,
  CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  DEFICIT_OPTION,
  EC_OPTION,
  FLOW_DAILY_OPTION,
  FLOW_HOURLY_OPTION,
  LOG_OUT_ICON,
  REPORT_PROBLEM_ICON,
  TOPBAR_OPTIONS,
  VOLT_READINGS_OPTION,
  VPD_OPTION
} from '../../../../tools/general/system-variables.util';

import { daysFromToday, getClassNames } from '../../../../tools/general/helpers.util';

import { requestLogout } from '../../../../redux/actions/auth.action';

import Button from '../../button/Button';
import ThemeToggle from '../../theme-toggle/ThemeToggle';
import SVGIcon from '../../SVGIcon/SVGIcon';
import CheckboxInput from '../../input/checkbox/CheckboxInput';

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
                          onDivClick,
                          profile,
                          activeExtendedChart,
                          setActiveExtendedChart,
                          selectedOption,
                          mappedFieldList,
                          setSelectedOption,
                          tall,
                          select
                        }) => {
  return (
    <div className={ className }
         onClick={ onDivClick }>

      <SVGIcon name={ name }
               fill={ fill }
               tiny={ tiny }
               profile={ profile }
               tall={ tall } />

      { !select &&
      <DropDownMenuFixed menu={ menu }
                         menuData={ menuData }
                         activeExtendedChart={ activeExtendedChart }
                         setActiveExtendedChart={ setActiveExtendedChart }
                         setActiveDataPeriod={ setActiveDataPeriod }
                         onLogOutClick={ onLogOutClick }
                         mappedFieldList={ mappedFieldList }
                         left={ left }
                         period={ period }
                         mid={ mid } /> }

      { select &&
      <DropDownMenuGeneric menuData={ menuData }
                           selectedOption={ selectedOption }
                           setSelectedOption={ setSelectedOption }
                           select={ select } /> }
    </div>
  );
};

export default DropDownButton;

const DropDownMenuGeneric = ({ menuData, select, selectedOption, setSelectedOption }) => {

  const [showPrimaryDropDown, setShowPrimaryDropDown] = useState(false);

  const handleMenuItemClick = (event) => {
    setSelectedOption(event.target.textContent);
  };

  return (
    <div className="dropdown"
         onClick={ () => setShowPrimaryDropDown(!showPrimaryDropDown) }>

      { showPrimaryDropDown &&
      <div className={ getClassNames('dropdown__popup', { select }) }>
        { Object.keys(menuData)?.map((key) => {
          return <div className="dropdown__popup__item"
                      onClick={ handleMenuItemClick }>
            { key }
          </div>;
        }) }
      </div> }
    </div>
  );
};

DropDownMenuGeneric.propTypes = {
  left: bool,
  mid: bool
};

const DropDownMenuFixed = ({
                             menu,
                             menuData,
                             activeExtendedChart,
                             setActiveExtendedChart,
                             setActiveDataPeriod,
                             onLogOutClick,
                             mappedFieldList,
                             left,
                             period,
                             mid
                           }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { fieldName } = useParams();

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
    <div className="dropdown"
         onClick={ () => setShowPrimaryDropDown(!showPrimaryDropDown) }>

      { showPrimaryDropDown &&
      <div className={ getClassNames('dropdown__popup--left',
        { left, mid, period, logout: !!onLogOutClick }) }>
        { menu === CHART_TOP_BAR_MENU &&
        <div>

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

          <div style={ { display: 'flex', textDecoration: 'underline', marginBottom: '2px' } }>
            <div>{ 'Probes on field:' }</div>

            { Object.keys(menuData[0])?.map((key) => {
              return <div style={ { color: 'blue' } }>{ key }</div>;
            }) }
          </div>
          <div>{ menuData[1] }</div>
          <div>{ menuData[2] }</div>
          <div>{ menuData[3] }</div>
        </div> }

        { menu === CHART_USAGE_MENU &&
        <div className={ 'dropdown__popup__extended' }>

          <ChartOptionRow option={ DEFICIT_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ VOLT_READINGS_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ FLOW_DAILY_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ FLOW_HOURLY_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ EC_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ VPD_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />

          <ChartOptionRow option={ ACTUAL_IRRIGATION_OPTION }
                          setActiveExtendedChart={ setActiveExtendedChart }
                          activeExtendedChart={ activeExtendedChart } />
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

DropDownMenuFixed.propTypes = {
  left: bool,
  mid: bool
};

const ChartOptionRow = ({ option, setActiveExtendedChart, activeExtendedChart }) => {
  return (
    <div onClick={ () => setActiveExtendedChart(option) }>
      <CheckboxInput checked={ activeExtendedChart === option } />
      <p>{ option }</p>
    </div>
  );
};
