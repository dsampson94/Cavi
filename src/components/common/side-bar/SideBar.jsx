import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { bool, func } from 'prop-types';

import { SETTINGS_GEAR } from '../../../tools/general/system-variables.util';
import { getClassNames, noOp } from '../../../tools/general/helpers.util';
import {
  retrieveLastSelectedUserFromLocalStorage,
  retrieveUserFromLocalStorage,
  saveLastSelectedUserToLocalStorage
} from '../../../tools/storage/localStorage';

import { SET_CLIENT_NAME } from '../../../redux/actions/client.action';

import SVGIcon from '../../../tools/icons/SVGIcon';
import Button from '../button/Button';
import TableSearch from '../table-search/TableSearch';

import './side-bar.scss';

const SideBar = ({ showSideBar, setShowSideBar }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const userAccount = retrieveUserFromLocalStorage();
  const lastSelectedUser = retrieveLastSelectedUserFromLocalStorage()?.clientName;

  const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);

  const handleSubHeaderClick = (groupName, clientName) => {
    dispatch({ type: SET_CLIENT_NAME, groupName, clientName });
    saveLastSelectedUserToLocalStorage({ groupName, clientName });
    history.push('/recommendation/client');
    setShowSideBar(!showSideBar);
  };

  const mappedUserData = () => {
    let mappedClients = [];
    delete userAccount.access;
    for (const [{}, listValues] of new Map(Object.entries((filteredSideBarData) ? filteredSideBarData : userAccount)).entries()) {
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

  const renderSideBarList = () => {
    let listItem = mappedUserData()?.map((item, index) => {
      return (
        <div className="side-bar__list__item" key={ index }>
          <div className="side-bar__list__item__header">
            { item.objectKey?.toUpperCase() }
          </div>
          { item?.innerObjectValueList?.map((value) => {
            return (
              <div className={ getClassNames('side-bar__list__item__subheader', { selected: (lastSelectedUser === value.iok) }) }>
                <div className="side-bar__list__item__subheader__text"
                     onClick={ () => handleSubHeaderClick(item.objectKey, value.iok) }>
                  { value.iok }
                </div>
                <div className="side-bar__list__item__subheader__icon"
                     onClick={ noOp() }>
                  <SVGIcon name={ SETTINGS_GEAR } />
                </div>
              </div>);
          }) }
        </div>
      );
    });

    return (
      <div className="side-bar__list">
        { listItem }
      </div>
    );
  };

  return (
    <div className={ getClassNames('side-bar', { show: showSideBar }) }>
      { showSideBar &&
        <TableSearch dataToFilter={ (filteredSideBarData) ? filteredSideBarData : userAccount }
                     setFilteredData={ setFilteredSideBarData } sidebar /> }

      { showSideBar &&
        <div className="side-bar__list__header">MY CLIENTS</div> }

      { showSideBar &&
        <div className="side-bar__list__container">
          { renderSideBarList() }
        </div> }

      { showSideBar && <div className="side-bar__lower-button">
        <Button label={ 'Add new client database' } />
      </div> }
    </div>
  );
};

SideBar.defaultProps = {};

SideBar.propTypes = {
  showSideBar: bool.isRequired,
  setShowSideBar: func.isRequired
};

export default SideBar;
