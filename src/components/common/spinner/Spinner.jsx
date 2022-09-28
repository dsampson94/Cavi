import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import { cancelRequest } from '../../../redux/actions/system.action';

import Graphic from '../graphic/Graphic';

import logo from '../../../tools/images/pulselogo.png';
import background from '../../../tools/images/irricheckbackground.jpg';

import './spinner.scss';

const Spinner = ({ showSpinnerText }) => {

  const dispatch = useDispatch();

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (showSpinnerText) {
      setTimeout(() => setShowSpinner(false), 1000);
      setShowSpinner(true);
    }
  });

  if (!background) return null;

  return (
    <div className={ getClassNames('spinner__container',
      { entering: showSpinnerText, closing: !showSpinnerText }) }
         style={ {
           display: showSpinner ? 'flex' : 'none',
           backgroundImage: `url(${ background })`
         } }>

      <div>
        <Graphic loading graphic={ logo } />
        <div className="spinner">
          <div className="spinner__overlay" onClick={ () => dispatch(cancelRequest()) } />
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

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
