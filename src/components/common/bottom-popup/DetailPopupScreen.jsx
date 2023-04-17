import React from 'react';
import { DetailTable } from '../table/DetailTable';

export const DetailPopupScreen = ({ mappedDetailsList, setActiveTab }) => {
  return (
    <div className="flex -full w-full overflow-scroll pr-48">
      <DetailTable activeTableData={ mappedDetailsList }
                   hiddenColumns={ [] }
                   setActiveTab={ setActiveTab } />
    </div>
  );
};
