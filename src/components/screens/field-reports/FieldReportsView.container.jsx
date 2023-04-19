import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { shape } from 'prop-types';
import { getRequestParams } from '../../../redux/endpoints';
import FieldReportsView from './FieldReportsView';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { requestSetFieldReportsList } from '../../../redux/actions/field.action';
import { mapReportsList } from '../client-fields/ClientFieldsView.container.util';

const FieldReportsViewContainer = () => {

  const dispatch = useDispatch();

  const { groupName, clientName } = useParams();

  const fieldReportsList = useSelector(createSelector([state => state.field], field => field?.fieldReportsList));
  const fieldReportsDownloadPDF = useSelector(createSelector([state => state.field], field => field?.fieldReportsDownload));

  const [activeFileName, setActiveFileName] = useState(false);

  const request = getRequestParams({ groupName, clientName });

  useEffect(() => {
    dispatch(requestSetFieldReportsList({
      ...request.clientParams,
      listreports: 1
    }));
  }, []);

  const handleDownloadReportClick = (fileName) => {
    setActiveFileName(fileName);
    dispatch(requestSetFieldReportsList({
      ...request.clientParams,
      action: 'downloadreport',
      filename: fileName
    }));
    downloadPDF();
  };

  const downloadPDF = () => {
    if (!fieldReportsDownloadPDF) return;
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(fieldReportsDownloadPDF);
    link.download = `Irricheck Report ${ activeFileName }`;
    link.click();
  };

  return <FieldReportsView mappedReportList={ mapReportsList(fieldReportsList) }
                           clientRequestParams={ request.clientParams }
                           handleDownloadReportClick={ handleDownloadReportClick } />;
};

FieldReportsViewContainer.propTypes = {
  fieldList: shape({}),
  fieldRainData: shape({})
};

export default FieldReportsViewContainer;
