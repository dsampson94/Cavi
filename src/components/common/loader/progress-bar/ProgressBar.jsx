import React, { useEffect, useState } from 'react';

import { getClassNames } from '../../../../tools/general/helpers.util';

import './progress-bar.scss';

const ProgressBar = ({ value }) => {

  let intervalId = null;

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const updateValue = () => {
      if (currentValue < parseInt(value)) setCurrentValue(currentValue + 1);
      else clearInterval(intervalId);
    };

    intervalId = setInterval(updateValue, 0.8);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    setCurrentValue(0);
    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <progress className={ getClassNames('progress-bar', { complete: currentValue === 100 || value === '100' || !value }) }
              value={ currentValue }
              max="100" />
  );
};

export default ProgressBar;
