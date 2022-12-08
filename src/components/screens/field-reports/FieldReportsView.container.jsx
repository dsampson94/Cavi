import React from 'react';
import { useParams } from 'react-router';

import { shape } from 'prop-types';
import { getRequestParams } from '../../../redux/endpoints';
import FieldReportsView from './FieldReportsView';

const FieldReportsViewContainer = () => {

  const { groupName, clientName } = useParams();

  const request = getRequestParams({ groupName, clientName });

  return <FieldReportsView mappedReportList={ [] }
                           clientRequestParams={ request.clientParams } />;
};

FieldReportsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default FieldReportsViewContainer;
