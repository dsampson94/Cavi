import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './number-input.scss';

const NumberInput = ({
                       id,
                       name,
                       value,
                       placeholder,
                       onChange,
                       onKeyPress,
                       disabled,
                       autoFocus,
                       calibrate,
                       period,
                       step,
                       max,
                       min,
                       chartbar
                     }) => {

  return (
    <div className={ 'number-input' }>
      <input id={ id }
             name={ name }
             value={ value }
             placeholder={ placeholder }
             onChange={ onChange }
             onKeyDown={ onKeyPress }
             disabled={ disabled }
             type={ 'number' }
             autoFocus={ autoFocus }
             step={ step }
             max={ max }
             min={ min }
             className={ getClassNames('number-input__input', { calibrate, period, chartbar }) } />
    </div>
  );
};

NumberInput.propTypes = {
  label: string,
  name: string,
  value: string,
  placeholder: string,
  onClick: func,
  onKeyPress: func,
  disabled: bool
};

export default NumberInput;
