import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { func } from 'prop-types';

import { generateId, getClassNames, noOp } from '../../../tools/general/helpers.util';

import {
  CHARTS,
  FAVORITES_STAR,
  FIELD_CHARTS,
  FIELD_TEMPERATURES,
  FOUR_WEEKS_LABEL,
  FULL_VIEW_LABEL,
  RADIO_GROUP,
  SETTINGS_GEAR,
  SIX_MONTHS_LABEL,
  THREE_MONTHS_LABEL,
  TWELVE_MONTHS_LABEL,
  TWO_MONTHS_LABEL,
  TWO_WEEKS_LABEL
} from '../../../tools/general/system-variables.util';

import { SET_CLIENT_FIELD_LIST, SET_CLIENT_FIELD_RAIN_DATA } from '../../../redux/actions/client.action';

import { addOrRemoveFarmLocalStorageFavorites } from '../../../tools/storage/localStorage';

import SVGIcon from '../SVGIcon/SVGIcon';
import Button from '../button/Button';
import RadioInput from '../input/radio/RadioInput';
import ToolTip from '../tool-tip/ToolTip';

export const SideBarList = ({
                              mappedUserData,
                              filteredSideBarData,
                              favoritesToggle,
                              setFavoritesToggle,
                              myFavorites,
                              myClients,
                              myFavoritesChart
                            }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { groupName, clientName } = useParams();

  const handleFavoritesClick = (groupName, clientName) => {
    addOrRemoveFarmLocalStorageFavorites(groupName, clientName);
    setFavoritesToggle(!favoritesToggle);
  };

  let listItem = (filteredSideBarData ? filteredSideBarData : mappedUserData)?.map((item) => {
    return (
      <div className="client-fields-side-bar__list__item" key={ generateId() }>
        <div className="client-fields-side-bar__list__item__header">
          { item.objectKey?.toUpperCase() }
        </div>
        { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value) => {
          return (
            <div className={ getClassNames('client-fields-side-bar__list__item__subheader',
              { selected: (clientName === value.iok && groupName === item.objectKey) }) }
                 key={ generateId() }>
              <div className="client-fields-side-bar__list__item__subheader__text"
                   style={ {
                     color: (() => {
                       switch (value.iov.color) {
                         case '000000':
                           return undefined;
                         case '0026FF':
                           return '#0081ff';
                         default:
                           return `#${ value.iov.color }`;
                       }
                     })()
                   } }
                   onClick={ () => handleSubHeaderClick(history, item.objectKey, value.iok, dispatch) }>
                { value.iok }
              </div>

              { !myFavoritesChart &&
              <div className="client-fields-side-bar__list__item__subheader__icon"
                   onClick={ () => handleFavoritesClick(item.objectKey, value.iok) }>
                <SVGIcon name={ FAVORITES_STAR } fill={ '#f37b2c' } />
              </div> }

              <div className="client-fields-side-bar__list__item__subheader__icon"
                   onClick={ noOp() }>
                <SVGIcon name={ SETTINGS_GEAR } />
              </div>
            </div>
          );
        }) }
      </div>
    );
  });

  return (
    <>
      <div className="client-fields-side-bar__list__header">
        { myClients ? 'MY CLIENTS' : 'MY FAVORITES' }
      </div>
      <div className={ getClassNames('client-fields-side-bar__list',
        { favorites: myFavorites || myFavoritesChart, clients: myClients }) }>

        <div className="client-fields-side-bar__list__container">
          { listItem }
        </div>
      </div>
    </>

  );
};

const handleSubHeaderClick = (history, groupName, clientName, dispatch) => {
  dispatch({ type: SET_CLIENT_FIELD_LIST, fieldList: null });
  dispatch({ type: SET_CLIENT_FIELD_RAIN_DATA, fieldRainData: null });
  history.push(`/client/${ groupName }/${ clientName }`);
};

export const mappedUserData = (userAccount, overview) => {
  if (!userAccount) return;
  let mappedClients = [];
  if (overview) delete userAccount.settings;
  else delete userAccount.access;
  for (const [{}, listValues] of new Map(Object.entries(userAccount)).entries()) {
    for (const [objectKey, objectValue] of new Map(Object.entries(listValues)).entries()) {
      const innerObjectValueList = [];
      for (const [iok, iov] of new Map(Object.entries(objectValue)).entries()) {
        innerObjectValueList.push({ iok, iov });
      }
      mappedClients.push({ objectKey, innerObjectValueList });
    }
  }
  return mappedClients;
};

export const SideBarButton = () => {
  return <div className="client-fields-side-bar__lower-button">
    <Button label={ 'Add new client database' } />
  </div>;
};

export const ViewDataBar = ({ setActiveLoadPeriod }) => {

  const [selectedPeriod, setSelectedPeriod] = useState(TWO_WEEKS_LABEL);

  useEffect(() => {
    setActiveLoadPeriod(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="field-charts-side-bar__view-mode">
      <div className="field-charts-side-bar__view-mode__header">
        { 'VIEW DATA' }
      </div>

      <div className="field-charts-side-bar__view-mode__options">
        <RadioInput constant={ TWO_WEEKS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWO_WEEKS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ FOUR_WEEKS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === FOUR_WEEKS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput label={ TWO_MONTHS_LABEL }
                    constant={ TWO_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWO_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ THREE_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === THREE_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ SIX_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === SIX_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ TWELVE_MONTHS_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === TWELVE_MONTHS_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
        <RadioInput constant={ FULL_VIEW_LABEL }
                    name={ RADIO_GROUP }
                    checked={ selectedPeriod === FULL_VIEW_LABEL }
                    onClick={ ({ target }) => setSelectedPeriod(target.value) } />
      </div>
    </div>
  );
};

ViewDataBar.propTypes = {
  setActiveLoadPeriod: func
};

export const SideBarFieldList = ({ mappedFieldList, setActiveFieldName, view }) => {

  const history = useHistory();
  const { groupName, clientName, fieldName } = useParams();

  return (
    <div className="field-charts-side-bar__field-list">
      { mappedFieldList?.map((listItem) => {
        const field = listItem?.fieldName;
        return ((() => {
          if (field?.locationName?.includes('-landGroup')) {
            return (
              <div className="field-charts-side-bar__field-list__header"
                   key={ generateId() }>
                { field?.locationName?.slice(0, -10) }
              </div>
            );
          } else if (field?.locationName?.includes('-forecast')) {
            return (
              <div className="field-charts-side-bar__field-list__header"
                   key={ generateId() }>
                { field?.locationName?.slice(0, -9) }
              </div>
            );
          } else {
            return (
              <div className="field-charts-side-bar__field-list__item"
                   key={ generateId() }>
                <div className="field-charts-side-bar__field-list__item__container"
                     onClick={ () => handleFieldClick(history, groupName, clientName, field, setActiveFieldName, view) }>

                  <div className="field-charts-side-bar__field-list__item__container--upper"
                       style={ {
                         backgroundColor: field?.colorTop
                       } } />

                  <div className="field-charts-side-bar__field-list__item__container--lower"
                       style={ {
                         backgroundColor: field?.colorBot
                       } } />

                  <div className={ getClassNames('field-charts-side-bar__field-list__item__container--text',
                    { bold: (field?.locationName === fieldName) }) }>
                    { field?.locationName }
                  </div>
                </div>

                <div className="field-charts-side-bar__field-list__item__icon">
                  <SVGIcon name={ CHARTS } chart />
                  <ToolTip text={ 'follow up' } />
                </div>

              </div>
            );
          }
        })());
      }) }
    </div>
  );
};

SideBarFieldList.propTypes = {};

const handleFieldClick = (history, groupName, clientName, field, setActiveFieldName, view) => {
  setActiveFieldName(field.locationName);
  switch (view) {
    case FIELD_CHARTS :
      history.push(`/client/${ groupName }/${ clientName }/field/${ field?.probeNumber }/${ field?.locationName }`);
      break;
    case FIELD_TEMPERATURES :
      history.push(`/client/${ groupName }/${ clientName }/field/temperatures/${ field?.probeNumber }/${ field?.locationName }`);
      break;
  }
};

export const mapFavoritesList = (storedFavoritesList, mappedUserData) => {
  if (!storedFavoritesList) return null;
  const favoritesList = [];
  storedFavoritesList?.forEach((storedItem) => {
    mappedUserData?.forEach((userItem) => {
      if (userItem?.objectKey !== storedItem?.split('/')[0]) return;
      userItem.innerObjectValueList?.forEach((innerItem) => {
        if (innerItem?.iok !== storedItem?.split('/')[1]) return;
        favoritesList.push({ objectKey: userItem?.objectKey, innerObjectValueList: [innerItem] });
      });
    });
  });
  return favoritesList;
};
