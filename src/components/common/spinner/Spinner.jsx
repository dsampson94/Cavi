import React from 'react';
import { useDispatch } from 'react-redux';

import { bool, string } from 'prop-types';

import { cancelRequest } from '../../../redux/actions/system.action';

import Graphic from '../graphic/Graphic';

import logo from '../../../tools/images/pulselogo.png';
import background from '../../../tools/images/irricheckbackground.jpg';

import './spinner.scss';

const Spinner = ({ showSpinnerText, content, centered, sidebar }) => {

  const dispatch = useDispatch();

  if (!showSpinnerText) return null;

  return (
    <div style={ style }>
      <div>
        <Graphic loading graphic={ logo } />
        <div className="spinner">
          <div className="spinner__overlay" onClick={ () => dispatch(cancelRequest()) } />
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p className="spinner__text">{ showSpinnerText }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  height: '150px',
  width: '250px',
  marginTop: '-50px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${ background })`,
  boxShadow: '0px 0px 10px black,inset 1px 1px 10px grey',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  zIndex: 20,
  borderRadius: '5px'
};

Spinner.propTypes = {
  showSpinnerText: string,
  content: bool,
  centered: bool
};

export default Spinner;
