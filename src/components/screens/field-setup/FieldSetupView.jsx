import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_SETUP } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import { ActiveScreen } from './FieldSetupView.util';

import './field-setup-view.scss';

const FieldSetupView = ({
                          mappedSetupList,
                          activeScreen,
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
        <ActiveScreen activeScreen={ activeScreen }
                      mappedSetupList={ mappedSetupList }
                      selectedIndex={ selectedIndex }
                      setSelectedIndex={ setSelectedIndex }
                      setActiveTableData={ setActiveTableData }
                      activeTableData={ activeTableData } />
      </div>
    </ContentContainer>
  );
};

FieldSetupView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default FieldSetupView;
