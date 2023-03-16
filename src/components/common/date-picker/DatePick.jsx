import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePick({ value, handleSubmit }) {
  const [startDate, setStartDate] = useState(new Date(value));

  return (
    <div className="relative mt-[2px] mr-1 min-w-fit w-40">
      <DatePicker
        selected={ startDate }
        onChange={ (date) => {
          setStartDate(date);
          handleSubmit(date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }));
        } }
        dateFormat="yyyy/MM/dd"
        className="w-full rounded-md border-0 bg-white dark:bg-clouded-grey py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-[#043b6e] focus:ring-1 focus:ring-inset focus:ring-[#043b6e] sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default DatePick;
