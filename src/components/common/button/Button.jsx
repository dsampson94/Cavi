import React from 'react';
import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';
import SVGIcon from '../../../tools/icons/SVGIcon';
import ToolTip from '../tool-tip/ToolTip';

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
                  white,
                  icon,
                  tooltip,
                  leftAlignedTooltip,
                  iconFill,
                  spaced,
                  onMouseEnter
                }) => {
  return (
    <button className={ getClassNames('button', { disabled, flex, login, blue, white, icon, spaced }) }
            name={ name }
            type={ type }
            onClick={ onClick }
            onMouseEnter={ onMouseEnter }
            disabled={ disabled }>
      <label>{ label } </label>
      { tooltip && <ToolTip text={ tooltip }
                            left={ leftAlignedTooltip } /> }
      { icon && <SVGIcon name={ icon }
                         fill={ (iconFill) ? iconFill : '#53A5DF' } /> }
    </button>
  );
};

Button.propTypes = {
  name: string,
  type: string,
  label: string,
  onClick: func,
  disabled: bool,
  flex: bool,
  login: bool,
  blue: bool,
  white: bool,
  icon: string,
  active: bool,
  leftAlignedTooltip: bool,
  spaced: bool
};

export default Button;
