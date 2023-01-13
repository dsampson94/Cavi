import React, { useEffect, useState } from 'react';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './progress-bar.scss';

const ProgressBar = ({ value, max }) => {

  let intervalId = null;

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const updateValue = () => {
      if (currentValue < parseInt(value)) setCurrentValue(currentValue + 0.1);
      else clearInterval(intervalId);
    };

    intervalId = setInterval(updateValue, 1);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    setCurrentValue(0);
    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <div className={ getClassNames('progress-bar', { complete: currentValue === 100 || value === '100' || !value }) }>
      <div className="progress-bar-value"
           style={ { width: `${ (value / max) * 100 }%` } }>

      </div>
    </div>
  );

};

export default ProgressBar;
