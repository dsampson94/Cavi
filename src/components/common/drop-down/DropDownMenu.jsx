import React, { useState } from 'react';

import { bool } from 'prop-types';

import {
  ACTUAL_IRRIGATION_OPTION,
  ANALYSE_FIELD_OPTION, CHART_ACTIVE_PERIOD,
  CHART_TOP_BAR_MENU,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  DEFICIT_OPTION,
  EC_OPTION,
  EXCEL_OPTION,
  FLOW_DAILY_OPTION,
  FLOW_DETAILED_OPTION,
  RAIN_OPTION,
  VOLT_READINGS_OPTION,
  VPD_OPTION
} from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import './drop-down-menu.scss';

const DropDownMenu = ({ menu, menuData, left, mid, period, setActiveDataPeriod }) => {

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="dropdown"
         onClick={ () => setShowToolTip(!showToolTip) }>

      { showToolTip &&
        <div className={ getClassNames('dropdown__popup', { left, mid, period }) }>
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
        </div> }
    </div>
  );
};

DropDownMenu.propTypes = {
  left: bool,
  mid: bool
};

export default DropDownMenu;
