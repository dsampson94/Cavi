import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_REPORTS, FIELD_REPORTS_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import MidBar from '../../common/mid-bar/MidBar';
import Table from '../../common/table/Table';

import './field-reports-view.scss';

const FieldReportsView = ({ mappedReportList, clientRequestParams }) => {

  const [showClientsSideBar, setClientsShowSideBar] = useState(true);
  const [activeTableData, setActiveTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <ContentContainer view={ FIELD_REPORTS }
                      clientRequestParams={ clientRequestParams }
                      showSideBar={ showClientsSideBar }
                      setShowSideBar={ setClientsShowSideBar }
                      mappedFieldList={ mappedReportList }>

      <div className={ getClassNames('field-reports', { show: showClientsSideBar }) }>

        <MidBar view={ FIELD_REPORTS }
                filteredTableData={ filteredTableData }
                showClientsSideBar={ showClientsSideBar }
                setFilteredTableData={ setFilteredTableData }
                setActiveTableData={ setActiveTableData } />

        <div className="field-reports__scroll">
          <Table tableName={ FIELD_REPORTS_VIEW }
                 activeTableData={ (filteredTableData) ? filteredTableData : activeTableData }
                 hiddenColumns={ ['expanded'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>

      </div>
    </ContentContainer>
  );
};

FieldReportsView.propTypes = {
  mappedReportList: arrayOf(shape({}))
};

export default FieldReportsView;
