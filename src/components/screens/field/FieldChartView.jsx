import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { FieldChartTopBar, LeftSideCharts, RightSideCharts } from './FieldChartView.util';

import ContentContainer from '../../common/content-container/ContentContainer';

import './field-chart-view.scss';

const ClientFieldsView = ({ mappedFieldList, mappedChartList, setLoadPeriod }) => {

  const [showChartsSideBar, setShowChartsSideBar] = useState(true);

  return (
    <ContentContainer view={ FIELD_CHARTS }
                      mappedFieldList={ mappedFieldList }
                      setLoadPeriod={ setLoadPeriod }
                      showChartsSideBar={ showChartsSideBar }>

      <div className="field-chart">
        <FieldChartTopBar showChartsSideBar={ showChartsSideBar }
                          setShowChartsSideBar={ setShowChartsSideBar } />

        <div className="field-chart__container">
          <LeftSideCharts mappedChartList={ mappedChartList } />

          <RightSideCharts mappedChartList={ mappedChartList } />

        </div>

        <div className="field-chart__lower" />

      </div>
    </ContentContainer>
  );
};

ClientFieldsView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default ClientFieldsView;
