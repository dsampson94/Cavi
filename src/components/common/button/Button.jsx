import React from 'react';
import { bool, func, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';
import SVGIcon from '../SVGIcon/SVGIcon';
import ToolTip from '../tool-tip/ToolTip';

import './button.scss';

const Button = ({
                  name,
                  type,
                  label,
                  lowerLabel,
                  onClick,
                  onMouseEnter,
                  disabled,
                  icon,
                  iconFill,
                  tooltip,
                  leftAlignedTooltip,
                  spaced,
                  login,
                  blue,
                  white,
                  small,
                  tiny,
                  chart,
                  chartbar,
                  datebar,
                  long
                }) => {
  return (
    <button className={ getClassNames('button',
      { disabled, login, blue, white, icon, spaced, small, chart, chartbar, datebar, tiny, long }) }
            name={ name }
            type={ type }
            onClick={ onClick }
            onMouseEnter={ onMouseEnter }
            disabled={ disabled }>
      { !datebar && <label>{ label }</label> }
      { datebar && <div>
          <div className={ 'button__label--upper' }><label>{ label }</label></div>
          <div className={ 'button__label--lower' }><label>{ lowerLabel !== 0 && lowerLabel }</label></div>
        </div> }
      { tooltip && <ToolTip text={ tooltip }
                            left={ leftAlignedTooltip } /> }
      { icon && <SVGIcon name={ icon }
                         chart={ chart }
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
