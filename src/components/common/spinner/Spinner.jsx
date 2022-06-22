import React from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './spinner.scss';

const Spinner = ({ spinnerText, content, centered }) => {

  if (!spinnerText) return null;

  return (
    <div className="spinner">
      <div className="spinner__overlay" />
      <div className={ getClassNames('spinner__container', { content, centered }) }>
        <div className="spinner__ring">
          <div className="spinner__ring-1" />
          <div className="spinner__ring-2" />
          <div className="spinner__ring-3" />
          <div className="spinner__ring-4" />
        </div>
        <div className="spinner__text">{ spinnerText }</div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  spinnerText: string,
  content: bool,
  centered: bool
};

export default Spinner;
