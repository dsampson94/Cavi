import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_SETUP, FIELD_SETUP_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import Table from '../../common/table/Table';

import './field-setup-view.scss';

const FieldSetupView = ({
                          mappedSetupList,
                          clientRequestParams
                        }) => {

  const [showSetupSideBar, setShowSetupSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [activeTableData, setActiveTableData] = useState([]);

  useEffect(() => {
    setActiveTableData(mappedSetupList);
  }, [mappedSetupList]);

  return (
    <ContentContainer view={ FIELD_SETUP }
                      clientRequestParams={ clientRequestParams }
                      showSetupSideBar={ showSetupSideBar }
                      setShowSetupSideBar={ setShowSetupSideBar }>

      <div className={ getClassNames('field-setup', { show: showSetupSideBar }) }>
        <div className="field-setup__scroll">
          <Table tableName={ FIELD_SETUP_VIEW }
                 activeTableData={ activeTableData }
                 hiddenColumns={ ['color'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>

      </div>
    </ContentContainer>
  );
};

FieldSetupView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default FieldSetupView;
