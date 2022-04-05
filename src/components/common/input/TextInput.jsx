import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames, noOp } from '../../../tools/general/helpers';

import './text-input.scss';

const TextInput = ({
                     name,
                     value,
                     label,
                     placeholder,
                     onChange,
                     disabled,
                     login
                   }) => {

  return (
    <div className={ getClassNames('input', { disabled }) }>

      <div className={ getClassNames('input__label-container', { login }) }>
        <label>{ label }</label>
      </div>

      <div className={ 'input__wrapper' }>
        <input name={ name }
               value={ value }
               type={ 'text' }
               placeholder={ placeholder }
               onChange={ onChange }
               disabled={ disabled }
               className={ getClassNames('input__wrapper', { login }) } />
      </div>

    </div>
  );
};

TextInput.defaultProps = {
  name: undefined,
  value: undefined,
  label: undefined,
  placeholder: undefined,
  onChange: noOp,
  disabled: false,
  login: false
};

TextInput.propTypes = {
  name: string,
  value: string,
  label: string,
  placeholder: string,
  onChange: func,
  disabled: bool,
  login: bool
};

export default TextInput;
