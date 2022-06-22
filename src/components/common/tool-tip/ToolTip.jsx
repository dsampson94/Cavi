import React, { useState } from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './tool-tip.scss';

const ToolTip = ({ text, left, mid }) => {

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="tooltip"
         onClick={ () => setShowToolTip(!showToolTip) }
         onMouseEnter={ () => setShowToolTip(true) }
         onMouseLeave={ () => setShowToolTip(false) }>

      { showToolTip &&
        <div className={ getClassNames('tooltip__popup', { left, mid }) }>
          { text }
        </div> }
    </div>
  );
};

ToolTip.propTypes = {
  text: string.isRequired,
  left: bool,
  mid: bool
};

export default ToolTip;
