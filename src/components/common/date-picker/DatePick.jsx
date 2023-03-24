import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './date-pick.scss';

const DatePick = React.forwardRef(({ value, activeItem, setActiveItem }, ref) => {
  const [startDate, setStartDate] = useState(new Date(value));

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
      className="w-full h-[35px] z-50 rounded-md border-0 bg-white dark:bg-clouded-grey pl-3 text-gray-900
        shadow-sm ring-1 ring-inset ring-[#043b6e] focus:ring-1 focus:ring-inset focus:ring-[#043b6e] sm:text-sm sm:leading-6"
      ref={ref}
    />
  );
});

export default DatePick;

