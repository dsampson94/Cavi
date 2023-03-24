import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_SETUP } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import { ActiveScreen } from './FieldSetupView.util';

import './field-setup-view.scss';

const FieldSetupView = ({
                          mappedSetupList,
                          mappedDropdownList,
                          activeScreen,
                          clientRequestParams,
                          selectedProbeNumber,
                          setSelectedProbeNumber,
                          selectedFieldName,
                          setSelectedFieldName,
                          updateFieldDetails,
                          setUpdatedFieldList,
                          valueToUpdate,
                          setValueToUpdate
                        }) => {

  const [showSetupSideBar, setShowSetupSideBar] = useState(true);
  const [activeTableData, setActiveTableData] = useState([]);

  useEffect(() => {
    setActiveTableData(mappedSetupList);
  }, [mappedSetupList]);

  return (
    <ContentContainer view={ FIELD_SETUP }
                      clientRequestParams={ clientRequestParams }
                      showSideBar={ showSetupSideBar }
                      setShowSideBar={ setShowSetupSideBar }>

      <div className={ getClassNames('field-setup', { show: showSetupSideBar }) }>
        <ActiveScreen activeScreen={ activeScreen }
                      mappedSetupList={ mappedSetupList }
                      mappedDropdownList={ mappedDropdownList }
                      setSelectedFieldName={ setSelectedFieldName }
                      setSelectedProbeNumber={ setSelectedProbeNumber }
                      setActiveTableData={ setActiveTableData }
                      activeTableData={ activeTableData }
                      valueToUpdate={ valueToUpdate }
                      setValueToUpdate={ setValueToUpdate }
                      updateFieldDetails={ updateFieldDetails }
                      setUpdatedFieldList={ setUpdatedFieldList } />
      </div>
    </ContentContainer>
  );
};

FieldSetupView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default React.memo(FieldSetupView);
