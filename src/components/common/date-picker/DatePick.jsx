import React, { useState } from 'react';
import { isValidDate } from '../../../tools/general/helpers.util';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './date-pick.scss';

const DatePick = ({ value, setActiveItem }) => {
  const [startDate, setStartDate] = useState(new Date(value));

  if (!isValidDate(startDate)) return null;

  function formatDate(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${ year }/${ month }/${ day }`;
  }

  return (
    <DatePicker
      selected={ startDate }
      onChange={ (date) => {
        setActiveItem(formatDate(date));
        setStartDate(date);
      } }
      dateFormat="yyyy/MM/dd"
      className="w-[95%] h-[35px] rounded-md border-0 bg-white dark:bg-clouded-grey pl-3 text-gray-900
        shadow-sm ring-1 ring-inset ring-[#043b6e] focus:ring-1 focus:ring-inset focus:ring-[#043b6e] sm:text-sm sm:leading-6"
      placement="top"
      popperPlacement="top-end"
    />
  );
};

export default DatePick;
