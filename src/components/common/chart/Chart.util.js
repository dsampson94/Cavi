import React from 'react';

import { getClassNames } from '../../../tools/general/helpers.util';
import {
  AGGREGATE_BOTTOM_SOIL,
  AGGREGATE_TOP_SOIL,
  CHART_USAGE_MENU,
  CHART_USAGE_SASRI_MENU,
  DAILY_ETO,
  DOWN_ARROW,
  OPEN_MENU,
  SETTINGS_GEAR,
  USAGE_ETC
} from '../../../tools/general/system-variables.util';

import SVGIcon from '../icon/SVGIcon';
import CheckboxInput from '../input/checkbox/CheckboxInput';
import Button from '../button/Button';
import DropDownMenu from '../drop-down/DropDownMenu';

import './chart.scss';

export const ChartHeader = ({ header, chartName, zoomOut, zoomIn }) => {
  return (
    <div className={ getClassNames('chart__header',
      { top: chartName === AGGREGATE_TOP_SOIL, bottom: chartName === AGGREGATE_BOTTOM_SOIL }) }>
      <div className="chart__header__zoom-options">

        { chartName === AGGREGATE_TOP_SOIL &&
          <div className="chart__header__zoom-options--left-top">
            <Button chart white label={ '-' } />
            <Button chart white label={ '+' } />
            <div className="chart__header__zoom-options--left-top__settings">
              <SVGIcon name={ SETTINGS_GEAR } />
            </div>
            <CheckboxInput constant={ 'Hide rain' } />
          </div> }

        { chartName === AGGREGATE_BOTTOM_SOIL &&
          <div className="chart__header__zoom-options--left-bottom">
            <Button chart white label={ '-' } onClick={ zoomOut } />
            <Button chart white label={ '+' } onClick={ zoomIn } />
          </div> }

        { chartName === USAGE_ETC &&
          <div className="chart__header__zoom-options--left-top">
            <div className="chart__header__zoom-options--left-top-buttons">
              <Button chart white label={ '-' } onClick={ zoomOut } />
              <Button chart white label={ '+' } onClick={ zoomIn } />
            </div>
            <div className="chart__header__zoom-options--left-top__options">
              <SVGIcon name={ DOWN_ARROW } chart />
              <DropDownMenu menu={ CHART_USAGE_MENU } />
            </div>
            <div className="chart__header__zoom-options--left-top__options">
              <SVGIcon name={ OPEN_MENU } chart />
              <DropDownMenu menu={ CHART_USAGE_SASRI_MENU } />
            </div>
          </div> }

        { chartName === DAILY_ETO &&
          <div className="chart__header__zoom-options--left-bottom" /> }
      </div>

      { header &&
        <div className="chart__header__center-text">
          { header }
        </div> }

      { chartName === AGGREGATE_TOP_SOIL &&
        <div className={ getClassNames('chart__header__rain',
          { lower: !(chartName === AGGREGATE_TOP_SOIL) }) }>
          { 'Total rain for season: 0' }
        </div> }
    </div>
  );
};
