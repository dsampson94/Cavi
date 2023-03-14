import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router';

import { shape } from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { isEmpty } from '../../../tools/general/helpers.util';

import { requestClientFieldRainDataForChart } from '../../../redux/actions/client.action';
import { getRequestParams } from '../../../redux/endpoints';

import RecommendationBarChart from '../chart/recommendation/RecommendationBarChart';

import './recommendation-modal.scss';

const RecommendationModal = ({ activeObject, handleClose }) => {

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

        <div className={ 'recommendation-modal__header' }>

          { fieldRainDataForChart?.heading }

          <button type="button"
                  className="absolute top-0 right-0 p-2 rounded-md bg-white dark:bg-dark-mode-grey
                   text-gray-400 hover:text-gray-500 focus:outline-none mt-1 mr-1"
                  onClick={() => handleClose(false)}>
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

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
