import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { bool } from 'prop-types';

import { getClassNames } from '../../../tools/general/helpers.util';
import { retrieveUserFromLocalStorage, saveLastSelectedUserToLocalStorage } from '../../../tools/storage/localStorage';

import { SET_CLIENT_NAME } from '../../../redux/actions/client.action';

import SVGIcon from '../../../tools/icons/SVGIcon';
import Button from '../button/Button';
import TableSearch from '../table-search/TableSearch';

import './side-bar.scss';

const SideBar = ({ show }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [filteredTableData, setFilteredTableData] = useState([]);

  const handleSubHeaderClick = (groupName, clientName) => {
    dispatch({ type: SET_CLIENT_NAME, groupName, clientName });
    saveLastSelectedUserToLocalStorage({ groupName, clientName });
    history.push('/recommendation/client');
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
    let listItem = mappedUserData().map((item, index) => {
      return (
        <div className="side-bar__list__item" key={ index }>
          <div className="side-bar__list__item-header">
            { item.objectKey }
          </div>
          <div className="side-bar__list__item-subheader">
            <p onClick={ () => handleSubHeaderClick(item.objectKey, item.innerObjectKey) }> { item.innerObjectKey } </p>
            <SVGIcon name={ 'settings_gear' } />
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
    <div className={ getClassNames('side-bar', { show }) }>
      { show && <TableSearch dataToFilter={ filteredTableData }
                             setFilteredData={ setFilteredTableData } /> }
      <div className="side-bar__lower-container">
        { show && <div className="side-bar__lower-container__client-lists">
          <h5>MY CLIENTS</h5>
          { renderSideBarList() }
        </div> }
      </div>

      { show && <div className="side-bar__lower-button">
        <Button label={ 'Add new client database' } />
      </div> }
    </div>
  );
};

SideBar.defaultProps = {};

SideBar.propTypes = {
  show: bool.isRequired
};

export default SideBar;
