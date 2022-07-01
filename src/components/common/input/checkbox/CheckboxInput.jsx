import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './checkbox-input.scss';

const CheckboxInput = ({
                      constant,
                      name,
                      checked,
                      onClick,
                      disabled
                    }) => {

  return (
    <div className={ getClassNames('checkbox-input', { disabled }) }>
      <div className={ getClassNames('checkbox-input__label-container') }>
        <label htmlFor={ constant }>{ constant }</label>
      </div>
      <input id={ constant }
             name={ name }
             value={ constant }
             checked={ checked }
             disabled={ disabled }
             onClick={ onClick }
             type={ 'checkbox' }
             className={ getClassNames('checkbox-input__input') } />
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
