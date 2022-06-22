import React from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './graphic.scss';

const Graphic = ({ graphic, login }) => {

  return (
    <div className={ getClassNames('graphic', { login }) }>
      <img src={ graphic } alt={ 'Pulse Logo' } className={ 'graphic__img' } />
    </div>
  );
};

Graphic.propTypes = {
  graphic: string,
  login: bool
};

export default Graphic;

