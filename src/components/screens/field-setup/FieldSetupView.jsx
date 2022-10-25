import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { FIELD_SETUP } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';

import './field-setup-view.scss';

const FieldSetupView = ({
                          mappedFieldList,
                          clientRequestParams
                        }) => {

  const [showSetupSideBar, setShowSetupSideBar] = useState(true);
  const [activeTableData, setActiveTableData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  useEffect(() => {
    setActiveTableData(mappedFieldList);
  }, [mappedFieldList]);

  return (
    <ContentContainer view={ FIELD_SETUP }
                      clientRequestParams={ clientRequestParams }
                      showSetupSideBar={ showSetupSideBar }
                      setShowSetupSideBar={ setShowSetupSideBar }
                      mappedFieldList={ mappedFieldList }>

      <div className={ getClassNames('field-setup', { show: showSetupSideBar }) }>
        <div className="field-setup__scroll">

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
