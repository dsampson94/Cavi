import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import { requestFullClientFieldList } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import FieldSetupView from './FieldSetupView';

const FieldSetupViewContainer = () => {

  const dispatch = useDispatch();

  const { groupName, clientName } = useParams();

  const fieldList = useSelector(createSelector([state => state.client], client => client?.fieldList?.fields));

  const request = getRequestParams({ groupName, clientName });

  useEffect(() => {
    dispatch(requestFullClientFieldList(request.clientParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName, clientName]);

  const mappedFieldSetupList = () => {

  };

  return <FieldSetupView mappedFieldList={ [] }
                         clientRequestParams={ request.clientParams } />;
};

FieldSetupViewContainer.propTypes = {
  fieldList: shape({})
};

export default FieldSetupViewContainer;
