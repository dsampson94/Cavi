import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './radio-input.scss';

const RadioInput = ({
                      constant,
                      name,
                      checked,
                      onClick,
                      disabled
                    }) => {

  return (
    <div className={ getClassNames('radio-input', { disabled }) }>
      <div className={ getClassNames('radio-input__label-container') }>
        <label htmlFor={ constant }>{ constant }</label>
      </div>
      <input id={ constant }
             name={ name }
             value={ constant }
             checked={ checked }
             disabled={ disabled }
             onClick={ onClick }
             type={ 'radio' }
             className={ getClassNames('radio-input__input') } />
    </div>
  );
};

RadioInput.propTypes = {
  name: string,
  value: string,
  type: string,
  label: string,
  placeholder: string,
  onChange: func,
  disabled: bool,
  login: bool
};

export default RadioInput;
