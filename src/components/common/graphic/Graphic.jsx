import React from 'react';

import { bool, string } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';

import './graphic.scss';

const Graphic = ({ graphic, onClick, login, loading, topbar }) => {

  return (
    <div className={ getClassNames('graphic', { login, loading, topbar }) }
         onClick={ onClick }>
      <img src={ graphic } alt={ 'Pulse Logo' } />
    </div>
  );
};

Graphic.propTypes = {
  graphic: string,
  login: bool
};

export default Graphic;

