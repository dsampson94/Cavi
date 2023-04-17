import React from 'react';
import { DetailTable } from '../table/DetailTable';
import DatePick from '../date-picker/DatePick';

export const DetailPopupScreen = ({ mappedDetailsList, setActiveTab, activeDate, setActiveDate }) => {

  return (
    <div className="flex flex-col h-full w-full pr-48">
      <div>
        <h3 className="text-center mb-2 font-bold">Select Date To View Raw Readings</h3>
        <DatePick setActiveItem={ setActiveDate }
                  value={ activeDate } />
      </div>

      <div className="overflow-scroll">
        <DetailTable activeTableData={ mappedDetailsList }
                     hiddenColumns={ [] }
                     setActiveTab={ setActiveTab } />
      </div>
    </div>
  );
};
