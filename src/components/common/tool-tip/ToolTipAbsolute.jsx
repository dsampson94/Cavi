import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ToolTipAbsolute = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative whitespace-nowrap">
      <div onMouseEnter={ () => setShow(true) }
           onMouseLeave={ () => setShow(false) }>
        { children }
      </div>
      { show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2
         mb-2 p-1.5 bg-gray-500 text-white text-xs rounded-md">
          { text }
        </div>
      ) }
    </div>
  );
};

ToolTipAbsolute.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
