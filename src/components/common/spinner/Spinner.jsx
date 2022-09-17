import React from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './spinner.scss';

const Spinner = ({ showSpinnerText, content, centered, sidebar }) => {

  if (!showSpinnerText) return null;

  return (
    <div className="spinner">
      <div className="spinner__overlay" />
      <div className={ getClassNames('spinner__container', { content, centered, sidebar }) }>
        <div className="spinner__ring">
          <div className="spinner__ring-1" />
          <div className="spinner__ring-2" />
          <div className="spinner__ring-3" />
          <div className="spinner__ring-4" />
        </div>
        <div className="spinner__text">{ showSpinnerText }</div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  showSpinnerText: string,
  content: bool,
  centered: bool
};

export default Spinner;
