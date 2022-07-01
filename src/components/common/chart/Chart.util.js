import React from 'react';

import { getClassNames } from '../../../tools/general/helpers.util';
import { SETTINGS_GEAR } from '../../../tools/general/system-variables.util';

import SVGIcon from '../../../tools/icons/SVGIcon';
import CheckboxInput from '../input/checkbox/CheckboxInput';
import Button from '../button/Button';

import './chart.scss';

export const ChartHeader = ({ header, top, bottom, zoomOut, zoomIn }) => {
  return (
    <div className={ getClassNames('chart__header', { top, bottom }) }>
      <div className="chart__header__zoom-options">
        { top &&
          <div className="chart__header__zoom-options--left-top">
            <Button chart white label={ '+' } />
            <Button chart white label={ '-' } />
            <div className="chart__header__zoom-options--left-top__settings">
              <SVGIcon name={ SETTINGS_GEAR } />
            </div>
            <CheckboxInput constant={ 'Hide rain' } />
          </div> }
        { bottom &&
          <div className="chart__header__zoom-options--left-bottom">
            <Button chart white label={ '+' } onClick={ zoomIn } />
            <Button chart white label={ '-' } onClick={ zoomOut } />
          </div> }
      </div>
      <div className="chart__header__center-text">
        { header }
      </div>
      <div className={ getClassNames('chart__header__rain', { lower: !top }) }>
        { 'Total rain for season: 0' }
      </div>
    </div>
  );
};
