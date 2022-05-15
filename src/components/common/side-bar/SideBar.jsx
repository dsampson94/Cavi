import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { bool, func } from 'prop-types';

import { SETTINGS_GEAR } from '../../../tools/general/system-variables.util';
import { getClassNames } from '../../../tools/general/helpers.util';
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

  const [filteredTableData, setFilteredTableData] = useState([]);

  const handleSubHeaderClick = (groupName, clientName) => {
    dispatch({ type: SET_CLIENT_NAME, groupName, clientName });
    saveLastSelectedUserToLocalStorage({ groupName, clientName });
    history.push('/recommendation/client');
    setShowSideBar(!showSideBar);
  };

  const mappedUserData = () => {
    let mappedClients = [];
    const userAccount = retrieveUserFromLocalStorage();
    delete userAccount.access;
    for (const [{}, listValues] of new Map(Object.entries(userAccount)).entries()) {
      for (const [objectKey, objectValue] of new Map(Object.entries(listValues)).entries()) {
        const innerObjectKey = Object.keys(objectValue)[0];
        const innerObjectValue = Object.values({ objectValue })[0][innerObjectKey];
        mappedClients.push({ objectKey, innerObjectKey, innerObjectValue });
      }
    }
    return mappedClients;
  };

  const renderSideBarList = () => {
    const lastSelectedUser = retrieveLastSelectedUserFromLocalStorage()?.clientName;
    let listItem = mappedUserData().map((item, index) => {
      return (
        <div className="side-bar__list__item" key={ index }>
          <div className="side-bar__list__item-header">
            { item.objectKey }
          </div>
          <div className={ getClassNames('side-bar__list__item-subheader', { selected: (lastSelectedUser === item.innerObjectKey) }) }>
            <p onClick={ () => handleSubHeaderClick(item.objectKey, item.innerObjectKey) }>
              { item.innerObjectKey }
            </p>
            <SVGIcon name={ SETTINGS_GEAR } />
          </div>
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
      { showSideBar && <TableSearch dataToFilter={ filteredTableData }
                                    setFilteredData={ setFilteredTableData } /> }
      <div className="side-bar__list-container">
        { showSideBar && <div className="side-bar__list-container__client-list">
          <h5>MY CLIENTS</h5>
          { renderSideBarList() }
        </div> }
      </div>

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
