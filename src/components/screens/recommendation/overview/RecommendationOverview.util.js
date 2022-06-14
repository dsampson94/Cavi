import React from 'react';

import { getClassNames, noOp } from '../../../../tools/general/helpers.util';
import {
  DISSATISFIED,
  FIELD_UP_TO_DATE_QUESTION,
  FIELDS_LAST_VIEWED_QUESTION,
  FIELDS_MOISTURE_QUESTION,
  NEUTRAL,
  SATISFIED,
  SETTINGS_GEAR,
  VERY_DISSATISFIED,
  VERY_SATISFIED
} from '../../../../tools/general/system-variables.util';

import SVGIcon from '../../../../tools/icons/SVGIcon';
import { arrayOf, func, number, shape } from 'prop-types';

export const ActiveHeader = ({ setOverviewOptionSelected, overviewOptionSelected }) => {
  return (
    <div className="recommendation-overview__top-button"
         onClick={ () => setOverviewOptionSelected(undefined) }>
      <div className="recommendation-overview__top-button__left">
        <div className="recommendation-overview__top-button__left-header">
          { (() => {
            switch (overviewOptionSelected) {
              case 1: {
                return FIELDS_LAST_VIEWED_QUESTION;
              }
              case 2: {
                return FIELDS_MOISTURE_QUESTION;
              }
              case 3: {
                return FIELD_UP_TO_DATE_QUESTION;
              }
              default: {
                return FIELDS_LAST_VIEWED_QUESTION;
              }
            }
          })() }
        </div>

        <div className="recommendation-overview__top-button__left-subheader">
          { 'Click to change what to view' }
        </div>
      </div>

      <div className="recommendation-overview__top-button__right">
        <SVGIcon name={ VERY_SATISFIED } fill={ '#00AEFF' } />
        <SVGIcon name={ SATISFIED } fill={ '#00FF21' } />
        <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } />
        <SVGIcon name={ DISSATISFIED } fill={ '#FF8019' } />
        <SVGIcon name={ VERY_DISSATISFIED } fill={ '#FF0000' } />
      </div>
    </div>
  );
};

ActiveHeader.defaultProps = {};

ActiveHeader.propTypes = {
  setOverviewOptionSelected: func.isRequired,
  overviewOptionSelected: number.isRequired
};

export const OverviewList = ({ ownClientsList, overviewOptionSelected, setOverviewOptionSelected, handleSubHeaderClick }) => {
  return (
    <>
      { !overviewOptionSelected &&
        <div className={ 'recommendation-overview__menu' }>
          <div className={ 'recommendation-overview__menu-one' }
               onClick={ () => setOverviewOptionSelected(1) }>
            { FIELDS_LAST_VIEWED_QUESTION }
          </div>
          <div className={ 'recommendation-overview__menu-two' }
               onClick={ () => setOverviewOptionSelected(2) }>
            { FIELDS_MOISTURE_QUESTION }
          </div>
          <div className={ 'recommendation-overview__menu-three' }
               onClick={ () => setOverviewOptionSelected(3) }>
            { FIELD_UP_TO_DATE_QUESTION }
          </div>
        </div> }

      { overviewOptionSelected &&
        <div className="recommendation-overview__list">
          { ownClientsList?.map((item, index) => {
            return (
              <div className="recommendation-overview__list__item" key={ index }>
                <div className="recommendation-overview__list__item__header">
                  { item.objectKey?.toUpperCase() }
                </div>
                { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value, index) => {
                  return (
                    <div className={ getClassNames('recommendation-overview__list__item__subheader', {}) } key={ index }>
                      <div className="recommendation-overview__list__item__subheader__text"
                           onClick={ () => handleSubHeaderClick(item.objectKey, value.iok) }>
                        { value.iok }
                      </div>
                      <div className="recommendation-overview__list__item__subheader__icon"
                           onClick={ noOp() }>
                        { overviewOptionSelected === 1 &&
                          <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } tiny /> }
                        { overviewOptionSelected === 2 &&
                          <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } tiny /> }
                        { overviewOptionSelected === 3 &&
                          <SVGIcon name={ SETTINGS_GEAR } /> }
                      </div>
                    </div>);
                }) }
              </div>
            );
          }) }
        </div> }
    </>
  );
};

OverviewList.defaultProps = {};

OverviewList.propTypes = {
  setOverviewOptionSelected: func.isRequired,
  overviewOptionSelected: number.isRequired,
  handleSubHeaderClick: func.isRequired,
  ownClientsList: arrayOf(shape({})).isRequired
};
