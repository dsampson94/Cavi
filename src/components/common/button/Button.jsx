import React from 'react';
import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers';

import './button.scss';

const Button = ({
                  name,
                  type,
                  label,
                  onClick,
                  disabled,
                  flex,
                  login,
                  blue,
                  white
                }) => {
  return (
    <button className={ getClassNames('button', { disabled, flex, login, blue, white }) }
            name={ name }
            type={ type }
            onClick={ onClick }
            disabled={ disabled }>
      <label>{ label } </label>
    </button>
  );
};

Button.defaultProps = {
  name: undefined,
  type: 'button',
  label: undefined,
  onClick: undefined,
  disabled: false,
  flex: false
};

Button.propTypes = {
  name: string,
  type: string,
  label: string,
  onClick: func,
  disabled: bool,
  flex: bool
};

export default Button;
