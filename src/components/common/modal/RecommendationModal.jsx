import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { shape } from 'prop-types';

import { isEmpty } from '../../../tools/general/helpers.util';

import { requestClientFieldRainDataForChart } from '../../../redux/actions/client.action';

import RecommendationBarChart from '../chart/RecommendationBarChart';

import './recommendation-modal.scss';

const RecommendationModal = ({ activeObject, clientRequestFields }) => {

  const dispatch = useDispatch();

  const fieldRainDataForChart = useSelector(createSelector([state => state.client], client => client?.fieldRainDataForChart));

  let clientRequestFieldsForChart = {
    ...clientRequestFields,
    sensor: activeObject?.sensor,
    day: activeObject?.day,
    fieldname: activeObject?.fieldName?.locationName
  };

  useEffect(() => {
    dispatch(requestClientFieldRainDataForChart(clientRequestFieldsForChart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { !isEmpty(fieldRainDataForChart) &&
        <div className={ 'recommendation-modal' }>
          <div className={ 'recommendation-modal__header' }> { fieldRainDataForChart?.heading } </div>
          <div className={ 'recommendation-modal__container' }>
            { fieldRainDataForChart && <>
              <div className={ 'recommendation-modal__vertical-label' }>
                { fieldRainDataForChart?.unit !== '-' ? fieldRainDataForChart?.unit : '' }
              </div>
              <div className={ 'recommendation-modal__chart' }>
                <RecommendationBarChart fieldRainDataForChart={ fieldRainDataForChart } />
              </div>
            </> }
          </div>
        </div> }
    </>
  );
};

RecommendationModal.propTypes = {
  activeObject: shape({}),
  clientRequestFields: shape({})
};

export default RecommendationModal;
