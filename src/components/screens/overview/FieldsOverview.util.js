import React from 'react';

import { generateId, getClassNames } from '../../../tools/general/helpers.util';
import {
  DISSATISFIED,
  FIELD_UP_TO_DATE_QUESTION,
  FIELDS_LAST_VIEWED_QUESTION,
  FIELDS_MOISTURE_QUESTION,
  GREEN,
  NEUTRAL,
  ORANGE,
  RED,
  SATISFIED,
  TODAY,
  VERY_DISSATISFIED,
  VERY_SATISFIED,
  YELLOW
} from '../../../tools/general/system-variables.util';

import SVGIcon from '../../../tools/icons/SVGIcon';
import { arrayOf, func, number, shape } from 'prop-types';

import ToolTip from '../../common/tool-tip/ToolTip';

import './fields-overview.scss';

export const ActiveHeader = ({ setOverviewOptionSelected, overviewOptionSelected }) => {
  return (
    <div className="fields-overview__top-button"
         onClick={ () => setOverviewOptionSelected(undefined) }>
      <div className="fields-overview__top-button__left">
        <div className="fields-overview__top-button__left-header">
          { (() => {
            switch (overviewOptionSelected) {
              case 1:
                return FIELDS_LAST_VIEWED_QUESTION;
              case 2:
                return FIELDS_MOISTURE_QUESTION;
              case 3:
                return FIELD_UP_TO_DATE_QUESTION;
              default:
                return FIELDS_LAST_VIEWED_QUESTION;
            }
          })() }
        </div>

        <div className="overview__top-button__left-subheader">
          { 'Click to change what to view' }
        </div>
      </div>

      <div className="fields-overview__top-button__right">
        <div className="fields-overview__top-button__right__very-satisfied">
          <ToolTip text={ TODAY } />
          <SVGIcon name={ VERY_SATISFIED } fill={ '#00AEFF' } />
        </div>
        <div className="fields-overview__top-button__right__satisfied">
          <ToolTip text={ GREEN } />
          <SVGIcon name={ SATISFIED } fill={ '#00FF21' } />
        </div>
        <div className="fields-overview__top-button__right__neutral">
          <ToolTip text={ YELLOW } />
          <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } />
        </div>
        <div className="fields-overview__top-button__right__dissatisfied">
          <ToolTip text={ ORANGE } left />
          <SVGIcon name={ DISSATISFIED } fill={ '#FF8019' } />
        </div>
        <div className="fields-overview__top-button__right__very-dissatisfied">
          <ToolTip text={ RED } left />
          <SVGIcon name={ VERY_DISSATISFIED } fill={ '#FF0000' } />
        </div>
      </div>
    </div>
  );
};

ActiveHeader.propTypes = {
  setOverviewOptionSelected: func,
  overviewOptionSelected: number
};

export const OverviewList = ({ ownClientsList, overviewOptionSelected, setOverviewOptionSelected, handleSubHeaderClick }) => {
  return (
    <>
      { !overviewOptionSelected &&
        <div className={ 'fields-overview__menu' }>
          <div className={ 'fields-overview__menu-one' }
               onClick={ () => setOverviewOptionSelected(1) }>
            { FIELDS_LAST_VIEWED_QUESTION }
          </div>
          <div className={ 'fields-overview__menu-two' }
               onClick={ () => setOverviewOptionSelected(2) }>
            { FIELDS_MOISTURE_QUESTION }
          </div>
          <div className={ 'fields-overview__menu-three' }
               onClick={ () => setOverviewOptionSelected(3) }>
            { FIELD_UP_TO_DATE_QUESTION }
          </div>
        </div> }

      { overviewOptionSelected &&
        <div className="fields-overview__list">
          { ownClientsList?.map((item) => {
            return (
              <div className="fields-overview__list__item" key={ generateId() }>
                <div className="fields-overview__list__item__header">
                  { item.objectKey?.toUpperCase() }
                </div>
                { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value) => {
                  return (
                    <div className={ getClassNames('fields-overview__list__item__subheader', {}) } key={ generateId() }>
                      <div className="fields-overview__list__item__subheader__text"
                           onClick={ () => handleSubHeaderClick(item.objectKey, value.iok) }>
                        { value.iok }
                      </div>
                      <div className="fields-overview__list__item__subheader__icon">
                        { overviewOptionSelected === 1 &&
                          <FrequencyIndicator value={ value } /> }
                        { overviewOptionSelected === 2 &&
                          <DeficitIndicator value={ value } /> }
                        { overviewOptionSelected === 3 &&
                          <LastReadingIndicator value={ value } /> }
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

OverviewList.propTypes = {
  setOverviewOptionSelected: func,
  overviewOptionSelected: number,
  handleSubHeaderClick: func,
  ownClientsList: arrayOf(shape({}))
};

const FrequencyIndicator = ({ value }) => {
  switch (Object.entries(value?.iov)[0][1]) {
    case 'blue':
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ VERY_SATISFIED } fill={ '#00AEFF' } tiny />
      </>;
    case 'green':
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ SATISFIED } fill={ '#00FF21' } tiny />
      </>;
    case 'yellow':
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } tiny />
      </>;
    case 'orange':
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ DISSATISFIED } fill={ '#FF8019' } tiny />
      </>;
    case 'red':
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ VERY_DISSATISFIED } fill={ '#FF0000' } tiny />
      </>;
    default:
      return <>
        <ToolTip text={ Object.keys(value.iov)[0] } mid />
        <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } tiny />
      </>;
  }
};

FrequencyIndicator.propTypes = {
  value: shape({}).isRequired
};

const DeficitIndicator = ({ value }) => {
  const objectValues = Object.values(value.iov)[0];
  return (
    <div className={ 'deficit-container' }>
      <ToolTip text={ Object.keys(value.iov)[0] } mid />
      <div className={ 'deficit-container__upper' }
           style={ { backgroundColor: `#${ objectValues?.kleurbohex?.slice(3) }` } }>
        { objectValues?.tmbo }
      </div>
      <div className={ 'deficit-container__lower' }
           style={ { backgroundColor: `#${ objectValues?.kleuronderhex?.slice(3) }` } }>
        { objectValues?.tmon }
      </div>
    </div>
  );
};

DeficitIndicator.propTypes = {
  value: shape({}).isRequired
};

const LastReadingIndicator = ({ value }) => {
  const objectValues = Object.values(value.iov)[0];
  return (
    <div className={ 'last-reading' }>
      <ToolTip text={ Object.keys(value.iov)[0] } mid />
      <div className={ 'last-reading__container' }
           style={ { backgroundColor: `#${ objectValues?.lastreadingkleur?.slice(3) }` } }>
        <div className={ 'last-reading__text' }>{ objectValues?.lastreading }</div>
      </div>
    </div>
  );
};

LastReadingIndicator.propTypes = {
  value: shape({}).isRequired
};
