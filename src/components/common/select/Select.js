import React, { useState } from 'react';
import DropDownButton from '../drop-down/drop-down-button/DropDownButton';
import { DOUBLE_DROPDOWN } from '../../../tools/general/system-variables.util';
import TextInput from '../input/text/TextInput';
import { getClassNames } from '../../../tools/general/helpers.util';

import './select.scss';

const Select = ({ menuData, wide }) => {

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className={ getClassNames('select', { wide }) }>

      <TextInput value={selectedOption} select wide />

      <DropDownButton name={ DOUBLE_DROPDOWN }
                      className={ 'select__button' }
                      fill={ 'white' }
                      selectedOption={ selectedOption }
                      setSelectedOption={ setSelectedOption }
                      menuData={ menuData }
                      stretch
                      tall
                      select />

    </div>
  );
};

export default Select;
