import React from 'react';

import { generateId, getClassNames } from '../../../../tools/general/helpers.util';
import { useHistory } from 'react-router';

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
} from '../../../../tools/general/system-variables.util';

import SVGIcon from '../../../common/SVGIcon/SVGIcon';
import { arrayOf, func, number, shape } from 'prop-types';

import ToolTip from '../../../common/tool-tip/ToolTip';

import './dashboard-overview.scss';

export const ActiveHeader = ({ setOverviewOptionSelected, overviewOptionSelected }) => {
  return (
    <div className="dashboard-overview__top-button"
         onClick={ () => setOverviewOptionSelected(undefined) }>
      <div className="dashboard-overview__top-button__left">
        <div className="dashboard-overview__top-button__left-header">
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

      <div className="dashboard-overview__top-button__right">
        <div className="dashboard-overview__top-button__right__very-satisfied">
          <ToolTip text={ TODAY } />
          <SVGIcon name={ VERY_SATISFIED } fill={ '#00AEFF' } />
        </div>
        <div className="dashboard-overview__top-button__right__satisfied">
          <ToolTip text={ GREEN } />
          <SVGIcon name={ SATISFIED } fill={ '#00FF21' } />
        </div>
        <div className="dashboard-overview__top-button__right__neutral">
          <ToolTip text={ YELLOW } />
          <SVGIcon name={ NEUTRAL } fill={ '#FFD800' } />
        </div>
        <div className="dashboard-overview__top-button__right__dissatisfied">
          <ToolTip text={ ORANGE } left />
          <SVGIcon name={ DISSATISFIED } fill={ '#FF8019' } />
        </div>
        <div className="dashboard-overview__top-button__right__very-dissatisfied">
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
      <div className={ 'dashboard-overview__menu' }>
        <div className={ 'dashboard-overview__menu-one' }
             onClick={ () => setOverviewOptionSelected(1) }>
          { FIELDS_LAST_VIEWED_QUESTION }
        </div>
        <div className={ 'dashboard-overview__menu-two' }
             onClick={ () => setOverviewOptionSelected(2) }>
          { FIELDS_MOISTURE_QUESTION }
        </div>
        <div className={ 'dashboard-overview__menu-three' }
             onClick={ () => setOverviewOptionSelected(3) }>
          { FIELD_UP_TO_DATE_QUESTION }
        </div>
      </div> }

      { overviewOptionSelected &&
      <div className="dashboard-overview__list">
        { ownClientsList?.map((item) => {
          return (
            <div className="dashboard-overview__list__item" key={ generateId() }>

              <div className="dashboard-overview__list__item__header">
                { item.objectKey?.toUpperCase() }
              </div>

              { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value) => {
                return (
                  <div className={ getClassNames('dashboard-overview__list__item__subheader', {}) } key={ generateId() }>
                    <div className="dashboard-overview__list__item__subheader__text"
                         onClick={ () => handleSubHeaderClick(item.objectKey, value.iok) }>
                      { value.iok }
                    </div>
                    <div className="dashboard-overview__list__item__subheader__icon">
                      { overviewOptionSelected === 1 && FrequencyIndicator(item.objectKey, value) }
                      { overviewOptionSelected === 2 && DeficitIndicator(item.objectKey, value) }
                      { overviewOptionSelected === 3 && LastReadingIndicator(item.objectKey, value) }
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

const FrequencyIndicator = (groupName, value) => {

  const history = useHistory();

  const innerFields = Object.values(value)[1];

  let fieldList = [];
  for (const [fieldName, color] of Object.entries(innerFields)) {
    fieldList.push({ groupName, clientName: value.iok, fieldName, color });
    console.log(color);
  }

  return (
    <div className="dashboard-overview__list__item__subheader__icon__grid">
      { fieldList.map((number, index) => (
        <div key={ index }
             className="dashboard-overview__list__item__subheader__icon__grid__frequency__container"
             onClick={ () => history.push(`/client/${ number.groupName }/${ number.clientName }/field-charts/${ number.probeno }/${ number.fieldName }`) }>
          <ToolTip text={ number.fieldName } grid />
          <SVGIcon name={ VERY_SATISFIED } fill={ number.color === 'yellow' ? 'orange' : number.color } overview />
        </div>
      )) }
    </div>
  );
};

FrequencyIndicator.propTypes = {
  value: shape({}).isRequired
};

const DeficitIndicator = (groupName, value) => {

  const history = useHistory();

  const objectValues = Object.values(value.iov)[0];
  const innerFields = Object.values(value)[1];

  let fieldList = [];
  for (const [fieldName, val] of Object.entries(innerFields)) {
    fieldList.push({ groupName, clientName: value.iok, probeNumber: val.probeno, fieldName });
  }

  return (
    <div className="dashboard-overview__list__item__subheader__icon__grid">
      { fieldList.map((number, index) => (
        <div key={ index } className="dashboard-overview__list__item__subheader__icon__grid__deficit__container"
             onClick={ () => history.push(`/client/${ number.groupName }/${ number.clientName }/field-charts/${ number.probeNumber }/${ number.fieldName }`) }>
          <ToolTip text={ number.fieldName } grid />
          <div className={ 'deficit-container__upper' }
               style={ { backgroundColor: objectValues?.kleurbohex?.slice(3) === 'FFFFFF' ? 'grey' : `#${ objectValues?.kleurbohex?.slice(3) }` } }>
            { objectValues?.tmbo }
          </div>
          <div className={ 'deficit-container__lower' }
               style={ { backgroundColor: objectValues?.kleuronderhex?.slice(3) === 'FFFFFF' ? 'grey' : `#${ objectValues?.kleuronderhex?.slice(3) }` } }>
            { objectValues?.tmon }
          </div>
        </div>
      )) }
    </div>
  );
};

DeficitIndicator.propTypes = {
  value: shape({}).isRequired
};

const LastReadingIndicator = (groupName, value) => {

  const history = useHistory();

  const objectValues = Object.values(value.iov)[0];
  const innerFields = Object.values(value)[1];

  let fieldList = [];
  for (const [fieldName, val] of Object.entries(innerFields)) {
    fieldList.push({ groupName, clientName: value.iok, probeNumber: val.probeno, fieldName });
  }

  return (
    <div className="dashboard-overview__list__item__subheader__icon__grid">
      { fieldList.map((number, index) => (
        <div key={ index } className="dashboard-overview__list__item__subheader__icon__grid__reading__container"
             onClick={ () => history.push(`/client/${ number.groupName }/${ number.clientName }/field-charts/${ number.probeNumber }/${ number.fieldName }`) }>
          <ToolTip text={ number.fieldName } grid />
          <div className={ 'last-reading__container' }
               style={ { backgroundColor: `#${ objectValues?.lastreadingkleur?.slice(3) }` } }>
            <div className={ 'last-reading__text' }>{ objectValues?.lastreading }</div>
          </div>
        </div>
      )) }
    </div>
  );
};

LastReadingIndicator.propTypes = {
  value: shape({}).isRequired
};
