import React from 'react';
import DatePick from '../date-picker/DatePick';
import { DetailTable } from '../table/DetailTable';

export const FireDangerIndexPopupScreen = ({ mappedFireDangerIndexList, setActiveTab, activeDate, setActiveDate }) => {

  return (
    <div className="flex flex-col h-full w-full pr-48">
      <div>
        <h3 className="text-center mb-2 font-bold">Fire Danger Index</h3>
        <DatePick setActiveItem={ setActiveDate }
                  value={ activeDate } />
      </div>

      <div className="overflow-scroll">
        <DetailTable activeTableData={ mappedFireDangerIndexList }
                     hiddenColumns={ [] }
                     setActiveTab={ setActiveTab } />
      </div>
    </div>
  );
};
