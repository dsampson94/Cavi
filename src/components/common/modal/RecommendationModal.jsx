import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';

import { isEmpty } from '../../../tools/general/helpers.util';

import { requestClientFieldRainDataForChart } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import RecommendationBarChart from '../chart/recommendation/RecommendationBarChart';

import './recommendation-modal.scss';

const RecommendationModal = ({ activeObject }) => {

  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const fieldRainDataForChart = useSelector(createSelector([state => state.client], client => client?.fieldRainDataForChart));

  const request = getRequestParams({ groupName, clientName, activeObject });

  useEffect(() => {
    dispatch(requestClientFieldRainDataForChart(request.recommendationModalParams));
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
  clientRequestParams: shape({})
};

export default RecommendationModal;
