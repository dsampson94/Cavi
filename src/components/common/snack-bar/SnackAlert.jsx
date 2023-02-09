import React, { useEffect, useState } from 'react';
import { bool, string } from 'prop-types';

import { SNACK_SUCCESS } from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';

import './snack-alert.scss';

const renderIcon = (status) => {
  // switch (status) {
  //   case SNACK_SUCCESS:
  //     return (
  //       <FontAwesomeIcon icon={ faCheck } />
  //     )
  //       ;
  //   case SNACK_WARNING:
  //     return (
  //       <FontAwesomeIcon icon={ faExclamation } />
  //     );
  //   case SNACK_CRITICAL:
  //     return (
  //       <FontAwesomeIcon icon={ faTimesCircle } />
  //     );
  //   case SNACK_INFO:
  //   default:
  //     return (
  //       <FontAwesomeIcon icon={ faInfo } />
  //     );
  // }
};

const SnackAlert = ({ status = SNACK_SUCCESS, message, closing }) => {

  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setEntering(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={ `${ getClassNames('snack', { entering, closing }) } ${ status }` }>
      <div className="snack__icon">
        { renderIcon(status) }
      </div>
      <div className="snack__title">
        <p>{ typeof message === 'string' ? message : 'Error' }</p>
      </div>
    </div>
  );
};

SnackAlert.defaultProps = {
  status: SNACK_SUCCESS,
  closing: false
};

SnackAlert.propTypes = {
  status: string,
  message: string.isRequired,
  closing: bool
};

export default SnackAlert;
