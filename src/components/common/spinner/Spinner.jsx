import React from 'react';
import { useDispatch } from 'react-redux';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import { cancelRequest } from '../../../redux/actions/system.action';

import './spinner.scss';

const Spinner = ({ showSpinnerText, content, centered, sidebar }) => {

  const dispatch = useDispatch();

  if (!showSpinnerText) return null;

  return (
    <div className="spinner">
      <div className="spinner__overlay" onClick={ () => dispatch(cancelRequest()) } />
      <div className={ getClassNames('spinner__container', { content, centered, sidebar }) }>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
