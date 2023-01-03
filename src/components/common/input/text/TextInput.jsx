import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './text-input.scss';

const TextInput = ({
                     label,
                     name,
                     value,
                     placeholder,
                     onChange,
                     onKeyPress,
                     disabled,
                     type,
                     login,
                     left,
                     chartbar,
                     topbar,
                     centered,
                     select,
                     wide,
                     input
                   }) => {

  return (
    <div className={ getClassNames('text-input', { disabled, login, left, chartbar, topbar, centered, select, wide, input }) }>

      <div className={ getClassNames('text-input__label-container', { login, left, centered }) }>
        <label>{ label }</label>
      </div>
      <input name={ name }
             value={ value }
             placeholder={ placeholder }
             onChange={ onChange }
             onKeyDown={ onKeyPress }
             disabled={ disabled }
             type={ type }
             className={ getClassNames('text-input__input', { login, chartbar, select, wide, input }) } />
    </div>
  );
};

TextInput.propTypes = {
  label: string,
  name: string,
  value: string,
  placeholder: string,
  onChange: func,
  onKeyPress: func,
  disabled: bool,
  type: string,
  login: bool
};

export default TextInput;
