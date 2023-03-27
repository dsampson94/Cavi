import React from 'react';

import { CHART_ACTIVE_PERIOD, DOUBLE_DROPDOWN } from '../../../tools/general/system-variables.util';

import TextInput from '../../common/input/text/TextInput';
import Button from '../../common/button/Button';
import DropDownButton from '../../common/drop-down/drop-down-button/DropDownButton';

import './field-setup-view.scss';

export const FieldSetupInputRow = ({ label, value, placeholder, onlyLabel, addWarning }) => {
  if (onlyLabel && !addWarning)
    return (
      <div className={ 'field-setup__scroll__list__item' }>
        { label }
      </div>
    );
  else if (onlyLabel && addWarning)
    return (
      <div className={ 'field-setup__scroll__list__item' }>
        <div className={ 'field-setup__scroll__list__item--centered' }>{ label }</div>
        <div className="field-setup__scroll-tool-container">

          <DropDownButton name={ DOUBLE_DROPDOWN }
                          menu={ CHART_ACTIVE_PERIOD }
                          className={ 'field-setup__scroll-icon-container' }
                          fill={ 'white' }
                          tall
                          period />

          <TextInput select />
        </div>
        <div className={ 'field-setup__scroll__list__item__button-container' }>
          <Button label={ 'Add' } add />
        </div>
      </div>
    );
  else
    return (
      <TextInput label={ label }
                 value={ value }
                 placeholder={ placeholder }
                 centered
                 left />
    );
};
