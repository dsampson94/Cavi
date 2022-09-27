import React from 'react';

import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './submit-input.scss';

const SubmitInput = ({
                       name,
                       value,
                       placeholder,
                       onClick,
                       onKeyPress,
                       disabled,
                       calibrate
                     }) => {

  return (
    <div className={ 'submit-input' }>
      <input name={ name }
             value={ value }
             placeholder={ placeholder }
             onClick={ onClick }
             onKeyDown={ onKeyPress }
             disabled={ disabled }
             type={ 'submit' }
             className={ getClassNames('submit-input__input', { calibrate }) } />
    </div>
  );
};

SubmitInput.propTypes = {
  label: string,
  name: string,
  value: string,
  placeholder: string,
  onClick: func,
  onKeyPress: func,
  disabled: bool
};

export default SubmitInput;
