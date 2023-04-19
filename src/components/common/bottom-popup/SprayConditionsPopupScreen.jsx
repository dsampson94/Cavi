import React from 'react';
import DatePick from '../date-picker/DatePick';
import { SprayConditionsTable } from '../table/SprayConditionsTable';

export const SprayConditionsPopupScreen = ({ mappedSprayConditionsList, setActiveTab, activeDate, setActiveDate }) => {

  return (
    <div className="flex flex-col h-full w-full pr-48">
      <div>
        <h3 className="text-center mb-2 font-bold">Spray Conditions</h3>
        <DatePick setActiveItem={ setActiveDate }
                  value={ activeDate } />
      </div>

      <div className="overflow-scroll">
        <SprayConditionsTable activeTableData={ mappedSprayConditionsList }
                              hiddenColumns={ [] }
                              setActiveTab={ setActiveTab } />
      </div>
    </div>
  );
};
