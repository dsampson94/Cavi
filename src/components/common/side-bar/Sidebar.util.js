import React from 'react';
import { useHistory, useParams } from 'react-router';

import { generateId, getClassNames, noOp } from '../../../tools/general/helpers.util';
import { SETTINGS_GEAR } from '../../../tools/general/system-variables.util';

import SVGIcon from '../../../tools/icons/SVGIcon';
import Button from '../button/Button';

export const SideBarList = ({ mappedUserData, filteredSideBarData, setShowSideBar, showSideBar }) => {

  const history = useHistory();
  const { groupName, clientName } = useParams();

  let listItem = (filteredSideBarData ? filteredSideBarData : mappedUserData)?.map((item) => {
    return (
      <div className="side-bar__list__item" key={ generateId() }>
        <div className="side-bar__list__item__header">
          { item.objectKey?.toUpperCase() }
        </div>
        { (item?.innerObjectValueList ? item?.innerObjectValueList : item?.filteredInnerObjectValueList)?.map((value) => {
          return (
            <div className={ getClassNames('side-bar__list__item__subheader',
              { selected: (clientName === value.iok && groupName === item.objectKey) }) }
                 key={ generateId() }>
              <div className="side-bar__list__item__subheader__text"
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
                   onClick={ () => handleSubHeaderClick(item.objectKey, value.iok, setShowSideBar, showSideBar, history) }>
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

const handleSubHeaderClick = (groupName, clientName, setShowSideBar, showSideBar, history) => {
  history.push(`/recommendation/${ groupName }/${ clientName }`);
  setShowSideBar(!showSideBar);
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
  return <div className="side-bar__lower-button">
    <Button label={ 'Add new client database' } />
  </div>;
};
