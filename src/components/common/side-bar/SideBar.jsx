import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { bool, func } from 'prop-types';

import { SETTINGS_GEAR } from '../../../tools/general/system-variables.util';
import { getClassNames, noOp } from '../../../tools/general/helpers.util';
import { retrieveUserFromLocalStorage } from '../../../tools/storage/localStorage';

import SVGIcon from '../../../tools/icons/SVGIcon';
import Button from '../button/Button';
import InputSearch from '../input-search/InputSearch';

import './side-bar.scss';

const SideBar = ({ showSideBar, setShowSideBar }) => {

  const history = useHistory();
  const { clientName } = useParams();

  const userAccount = retrieveUserFromLocalStorage();

  const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);

  const handleSubHeaderClick = (groupName, clientName) => {
    history.push(`/recommendation/${ groupName }/${ clientName }`);
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

  const getColor = (color) => {
    switch (color) {
      case '000000':
        return undefined;
      case '0026FF':
        return '#0081ff';
      default:
        return `#${ color }`;
    }
  };

  const SideBarList = () => {
    let listItem = (filteredSideBarData ? filteredSideBarData : mappedUserData())?.map((item, index) => {
      return (
        <div className="side-bar__list__item" key={ index }>
          <div className="side-bar__list__item__header">
            { item.objectKey?.toUpperCase() }
          </div>
          { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value, index) => {
            return (
              <div className={ getClassNames('side-bar__list__item__subheader', { selected: (clientName === value.iok) }) }
                   key={ index }>
                <div className="side-bar__list__item__subheader__text"
                     style={ { color: getColor(value.iov.color) } }
                     onClick={ () => handleSubHeaderClick(item.objectKey, value.iok) }>
                  { value.iok }
                </div>
                <div className="side-bar__list__item__subheader__icon"
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
      <div className="side-bar__list">
        <div className="side-bar__list__header">{ 'MY CLIENTS' }</div>
        <div className="side-bar__list__container">
          { listItem }
        </div>
      </div>
    );
  };

  const SideBarButton = () => {
    return <div className="side-bar__lower-button">
      <Button label={ 'Add new client database' } />
    </div>;
  };

  return (
    <div className={ getClassNames('side-bar', { show: showSideBar }) }>
      { showSideBar && <>
        <InputSearch dataToFilter={ userAccount }
                     setFilteredData={ setFilteredSideBarData }
                     placeholder={ 'Filter clients' }
                     sidebar />

        <SideBarList />

        <SideBarButton />
      </> }
    </div>
  );
};

SideBar.defaultProps = {};

SideBar.propTypes = {
  showSideBar: bool.isRequired,
  setShowSideBar: func.isRequired
};

export default SideBar;
