import React, { useState } from 'react';

import './tool-tip.scss';

const ToolTip = ({ tableData }) => {

  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className="tooltip"
         onClick={ () => setShowToolTip(!showToolTip) }
         onMouseEnter={ () => setShowToolTip(true) }
         onMouseLeave={ () => setShowToolTip(false) }>

      { showToolTip &&
        <div className="tooltip__popup">
          { tableData }
        </div> }
    </div>
  );
};

export default ToolTip;
