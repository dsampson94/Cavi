import React, { useState } from 'react';

import { bool, string } from 'prop-types';

import './tool-tip.scss';

const ToolTipRelative = ({ text }) => {

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className={ 'tooltip' }
         onClick={ () => setShowToolTip(!showToolTip) }
         onMouseEnter={ () => setShowToolTip(true) }
         onMouseLeave={ () => setShowToolTip(false) }>

      { showToolTip && <div
        className="absolute whitespace-nowrap z-200 min-w-fit p-2
        text-xs text-white translate-y-full mt-3  bg-gray-500 rounded-lg shadow-lg">
        { text }
      </div> }
    </div>
  );
};

ToolTipRelative.propTypes = {
  text: string.isRequired,
  left: bool,
  mid: bool
};

export default ToolTipRelative;
