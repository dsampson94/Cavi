import React, { useEffect, useState } from 'react';

import { arrayOf, shape } from 'prop-types';

import { CLIENT_DETAILS_ROUTE, FIELD_SETUP, FIELD_SETUP_VIEW } from '../../../tools/general/system-variables.util';

import { getClassNames } from '../../../tools/general/helpers.util';

import ContentContainer from '../../common/content-container/ContentContainer';
import Table from '../../common/table/Table';
import ClientDetailsView from './FieldSetupView.util';

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

  const ActiveScreen = () => {
    switch (activeScreen) {
      case CLIENT_DETAILS_ROUTE:
        return <div className="field-setup__scroll">
          <ClientDetailsView mappedDetails={ mappedSetupList?.[0] } />
        </div>;

      default:
        return <div className="field-setup__scroll">
          <Table tableName={ FIELD_SETUP_VIEW }
                 activeTableData={ activeTableData }
                 hiddenColumns={ ['color'] }
                 selectedIndex={ selectedIndex }
                 setSelectedIndex={ setSelectedIndex }
                 setActiveTableData={ setActiveTableData } />
        </div>;
    }
  };

  return (
    <ContentContainer view={ FIELD_SETUP }
                      clientRequestParams={ clientRequestParams }
                      showSetupSideBar={ showSetupSideBar }
                      setShowSetupSideBar={ setShowSetupSideBar }>

      <div className={ getClassNames('field-setup', { show: showSetupSideBar }) }>
        <ActiveScreen />
      </div>
    </ContentContainer>
  );
};

FieldSetupView.propTypes = {
  mappedFieldList: arrayOf(shape({})),
  fieldRainData: shape({})
};

export default FieldSetupView;
