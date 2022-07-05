import React, { useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';
import { FIELD_CHARTS } from '../../../tools/general/system-variables.util';
import { FieldChartTopBar, LeftSideCharts, RightSideCharts } from './FieldChartView.util';
import { retrieveActiveThemeFromLocalStorage } from '../../../tools/storage/localStorage';

import ContentContainer from '../../common/content-container/ContentContainer';

import './field-chart-view.scss';

const ClientFieldsView = ({ mappedFieldList, mappedChartList, mappedDepthList, setLoadPeriod }) => {

  const getTheme = retrieveActiveThemeFromLocalStorage();
  const [showChartsSideBar, setShowChartsSideBar] = useState(true);

  return (
    <ContentContainer view={ FIELD_CHARTS }
                      mappedFieldList={ mappedFieldList }
                      setLoadPeriod={ setLoadPeriod }
                      showChartsSideBar={ showChartsSideBar }>

      <div className="field-chart">
        <FieldChartTopBar showChartsSideBar={ showChartsSideBar }
                          setShowChartsSideBar={ setShowChartsSideBar } />

        <div className={ getClassNames('field-chart__container', { dark: (getTheme === 'dark') }) }>
          <LeftSideCharts mappedChartList={ mappedChartList }
                          mappedDepthList={ mappedDepthList } />

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
