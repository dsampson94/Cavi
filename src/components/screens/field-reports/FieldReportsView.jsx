import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_REPORTS, FIELD_REPORTS_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import { ReportsTable } from '../../common/table/ReportsTable';

import './field-reports-view.scss';

const FieldReportsView = ({ mappedReportList, clientRequestParams, handleDownloadReportClick }) => {

  const [showClientsSideBar, setClientsShowSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <ContentContainer view={ FIELD_REPORTS }
                      clientRequestParams={ clientRequestParams }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setClientsShowSideBar }
                      mappedFieldList={ mappedReportList }>

      <div className={ getClassNames('field-reports', { show: showClientsSideBar }) }>

        <div className="field-reports__scroll">
          <ReportsTable tableName={ FIELD_REPORTS_VIEW }
                        activeTableData={ mappedReportList }
                        hiddenColumns={ [] }
                        selectedIndex={ selectedIndex }
                        setSelectedIndex={ setSelectedIndex }
                        handleDownloadReportClick={ handleDownloadReportClick } />
        </div>

      </div>
    </ContentContainer>
  );
};

FieldReportsView.propTypes = {
  mappedReportList: arrayOf(shape({}))
};

export default FieldReportsView;
