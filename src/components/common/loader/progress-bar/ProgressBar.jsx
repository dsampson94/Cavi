import React from 'react';

import { getClassNames } from '../../../../tools/general/helpers.util';
import { COMPLETE_PROGRESS } from '../../../../tools/general/system-variables.util';

import './progress-bar.scss';

const ProgressBar = ({ value }) => {

  return (
    <progress className={ getClassNames('progress-bar', { complete: value === COMPLETE_PROGRESS || !value }) }
              value={ parseInt(value) }
              max="100" />
  );
};

export default ProgressBar;
