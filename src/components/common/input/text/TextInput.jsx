import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames, noOp } from '../../../../tools/general/helpers.util';

import './text-input.scss';

const TextInput = ({
                     name,
                     value,
                     type,
                     label,
                     placeholder,
                     onChange,
                     disabled,
                     login,
                     onKeyPress,
                     left
                   }) => {

  return (
    <div className={ getClassNames('input', { disabled, login, left }) }>

      <div className={ getClassNames('input__label-container', { login, left }) }>
        <label>{ label }</label>
      </div>
      <input name={ name }
             value={ value }
             type={ type }
             placeholder={ placeholder }
             onChange={ onChange }
             onKeyDown={ onKeyPress }
             disabled={ disabled }
             className={ getClassNames('input__input', { login }) } />
    </div>
  );
};

TextInput.defaultProps = {
  name: undefined,
  value: undefined,
  type: undefined,
  label: undefined,
  placeholder: undefined,
  onChange: noOp,
  disabled: false,
  login: false
};

TextInput.propTypes = {
  name: string,
  value: string,
  type: string,
  label: string,
  placeholder: string,
  onChange: func,
  disabled: bool,
  login: bool
};

export default TextInput;
