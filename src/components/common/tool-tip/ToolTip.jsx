import React, { useState } from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './tool-tip.scss';

const ToolTip = ({ text, left }) => {

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="tooltip"
         onClick={ () => setShowToolTip(!showToolTip) }
         onMouseEnter={ () => setShowToolTip(true) }
         onMouseLeave={ () => setShowToolTip(false) }>

      { showToolTip &&
        <div className={ getClassNames('tooltip__popup', { left }) }>
          { text }
        </div> }
    </div>
  );
};

ToolTip.defaultProps = {};

ToolTip.propTypes = {
  text: string.isRequired,
  left: bool.isRequired
};

export default ToolTip;
