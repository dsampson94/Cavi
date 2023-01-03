import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './checkbox-input.scss';

const CheckboxInput = ({
                         constant,
                         name,
                         checked,
                         onClick,
                         disabled,
                         actual,
                         forecast,
                         mm100,
                         mm200,
                         mm300,
                         mm400,
                         mm600,
                         mm800,
                         canopy,
                         outside,
                         humidity,
                         rain,
                         left,
                         rightText
                       }) => {

  return (
    <div className={ getClassNames('checkbox-input', { disabled, left }) }>
      <div className={ getClassNames('checkbox-input__label-container', { left }) }>
        <label htmlFor={ constant }>{ constant }</label>
      </div>
      <input id={ constant }
             name={ name }
             value={ constant }
             checked={ checked }
             disabled={ disabled }
             onClick={ onClick }
             type={ 'checkbox' }
             className={ getClassNames('checkbox-input__input',
               { actual, forecast, mm100, mm200, mm300, mm400, mm600, mm800, canopy, outside, humidity, rain, left }) } />
      <label className={'checkbox-input__right-label'} htmlFor={ constant }>{ rightText }</label>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: string,
  value: string,
  type: string,
  label: string,
  placeholder: string,
  onChange: func,
  disabled: bool,
  login: bool
};

export default CheckboxInput;
