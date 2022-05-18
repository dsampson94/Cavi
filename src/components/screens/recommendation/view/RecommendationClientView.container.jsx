import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { arrayOf, shape } from 'prop-types';
import { CAPTURE, QUICK_VIEW } from '../../../../tools/general/system-variables.util';

import { retrieveLastSelectedUserFromLocalStorage, retrieveUserLoginFromLocalStorage } from '../../../../tools/storage/localStorage';
import { requestClientFieldList, requestClientFieldRainData, requestSelectedClient } from '../../../../redux/actions/client.action';

import RecommendationClientView from './RecommendationClientView';

const RecommendationClientViewContainer = ({ fieldList, fieldRainData, selectedClient, dispatch }) => {

  const { user } = retrieveUserLoginFromLocalStorage();

  useEffect(() => {
    dispatch(requestClientFieldList(mockClientData));
    dispatch(requestSelectedClient());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient]);

  const mockClientData = {
    username: user?.username,
    password: user?.password,
    groupname: retrieveLastSelectedUserFromLocalStorage().groupName,
    clientname: retrieveLastSelectedUserFromLocalStorage().clientName
  };

  const checkForecastArea = (index, tableList) => {
    let currentItem = tableList[index]?.forecastArea.toLowerCase();
    let nextItem = tableList[index - 1]?.forecastArea.toLowerCase();
    return (currentItem !== nextItem);
  };

  const checkLandGroupArea = (index, tableList) => {
    let currentItem = tableList[index]?.landgroep.toLowerCase();
    let nextItem = tableList[index - 1]?.landgroep.toLowerCase();
    return (currentItem !== nextItem);
  };

  const mappedFieldList = () => {
    const rainData = [];
    for (let field in fieldRainData[1]) {
      rainData?.push({ upper: fieldRainData[1][field] });
    }

    if (fieldRainData[2]) {
      for (let field in fieldRainData[2]) {
        rainData?.push({ lower: fieldRainData[2][field] });
      }
    }

    let rainDataUpper = [];
    let rainDataLower = [];
    for (let index in rainData) {
      if (Object.keys(rainData[index])[0].includes('upper')) {
        rainDataUpper.push(rainData[index]);
      } else if (Object.keys(rainData[index])[0].includes('lower')) {
        rainDataLower.push(rainData[index]);
      }
    }

    const tableList = [];
    for (let field in fieldList) {
      tableList?.push(fieldList[field]);
    }

    const mappedList = [];
    tableList.forEach((listItem, index) => {
      const rainDataKeys = Object.keys(fieldRainData['days'] ?? []);
      const weatherDataKeys = Object.keys(listItem?.weervoorspelling);
      if (checkForecastArea(index, tableList)) {
        mappedList.push({
          fieldName: {
            locationName: `${ listItem?.forecastArea.toUpperCase() }-forecast`
          },
          w: undefined,
          b: undefined,
          p: undefined,
          l: undefined,
          c: undefined,
          q: undefined,
          deficit: {
            undefined
          },
          unit: undefined,
          [weatherDataKeys[0]]: undefined,
          [weatherDataKeys[1]]: undefined,
          [weatherDataKeys[2]]: undefined,
          [weatherDataKeys[3]]: undefined,
          [weatherDataKeys[4]]: undefined,
          [weatherDataKeys[5]]: undefined,
          [weatherDataKeys[6]]: undefined,
          ' ': ' ',
          [rainDataKeys[0]]: undefined,
          [`${ rainDataKeys[0] }L`]: undefined,
          [rainDataKeys[1]]: undefined,
          [`${ rainDataKeys[1] }L`]: undefined,
          [rainDataKeys[2]]: undefined,
          [`${ rainDataKeys[2] }L`]: undefined,
          [`${ rainDataKeys[3] } `]: undefined,
          [`${ rainDataKeys[3] }L`]: undefined,
          '30d': undefined,
          '30dL': undefined,
          Total: undefined,
          TotalL: undefined,
          trans: undefined,
          evap: undefined,
          total: undefined
        });
      }

      if (checkLandGroupArea(index, tableList)) {
        mappedList.push({
          fieldName: {
            locationName: `${ listItem?.landgroep.toUpperCase() }-landGroup`
          },
          w: undefined,
          b: undefined,
          p: undefined,
          l: undefined,
          c: undefined,
          q: undefined,
          deficit: {
            undefined
          },
          unit: undefined,
          [weatherDataKeys[0]]: undefined,
          [weatherDataKeys[1]]: undefined,
          [weatherDataKeys[2]]: undefined,
          [weatherDataKeys[3]]: undefined,
          [weatherDataKeys[4]]: undefined,
          [weatherDataKeys[5]]: undefined,
          [weatherDataKeys[6]]: undefined,
          ' ': ' ',
          [rainDataKeys[0]]: undefined,
          [`${ rainDataKeys[0] }L`]: undefined,
          [rainDataKeys[1]]: undefined,
          [`${ rainDataKeys[1] }L`]: undefined,
          [rainDataKeys[2]]: undefined,
          [`${ rainDataKeys[2] }L`]: undefined,
          [`${ rainDataKeys[3] } `]: undefined,
          [`${ rainDataKeys[3] }L`]: undefined,
          '30d': undefined,
          '30dL': undefined,
          Total: undefined,
          TotalL: undefined,
          trans: undefined,
          evap: undefined,
          total: undefined
        });
      }

      mappedList.push({
        fieldName: {
          locationName: listItem?.fieldname,
          type: listItem?.gewas
        },
        w: (listItem?.warning === '0') ? undefined : listItem?.warning,
        b: (listItem?.split === 1) ?
          `Click to view seperate blocks for ${ listItem?.fieldname }` : undefined,
        p: listItem?.fotots,
        l: {
          lastReading: listItem?.last_reading,
          tooltip: (listItem?.last_reading) ?
            `Probe Number: ${ listItem?.p1 } (Double click to search last readings)` : undefined
        },
        c: CAPTURE,
        q: QUICK_VIEW,
        deficit: {
          tooltip: listItem?.kleurhint,
          top: listItem?.tekbo,
          colorTop: (listItem?.colorTopHex === '#FFFFFFFF')
            ? '#000000' : `#${ listItem?.colorTopHex?.slice(3) }`,
          bottom: listItem?.tekonder,
          colorBot: (listItem?.colorBotHex === '#FFFFFFFF')
            ? '#000000' : `#${ listItem?.colorBotHex?.slice(3) }`
        },
        unit: listItem?.eenheid,
        [weatherDataKeys[0]]: listItem?.recommend1,
        [weatherDataKeys[1]]: listItem?.recommend2,
        [weatherDataKeys[2]]: listItem?.recommend3,
        [weatherDataKeys[3]]: listItem?.recommend4,
        [weatherDataKeys[4]]: listItem?.recommend5,
        [weatherDataKeys[5]]: listItem?.recommend6,
        [weatherDataKeys[6]]: listItem?.recommend7,
        ' ': ' ',
        [rainDataKeys[0]]: rainDataUpper[index]?.upper[1],
        [`${ rainDataKeys[0] }L`]: rainDataLower[index]?.lower[1],
        [rainDataKeys[1]]: rainDataUpper[index]?.upper[2],
        [`${ rainDataKeys[1] }L`]: rainDataLower[index]?.lower[2],
        [rainDataKeys[2]]: rainDataUpper[index]?.upper[3],
        [`${ rainDataKeys[2] }L`]: rainDataLower[index]?.lower[3],
        [`${ rainDataKeys[3] } `]: rainDataUpper[index]?.upper[4],
        [`${ rainDataKeys[3] }L`]: rainDataLower[index]?.lower[4],
        '30d': rainDataUpper[index]?.upper[6],
        '30dL': rainDataLower[index]?.lower[6],
        Total: rainDataUpper[index]?.upper[5],
        TotalL: rainDataLower[index]?.lower[5],
        trans: listItem?.gw,
        evap: listItem?.vw,
        total: listItem?.tw
      });
    });

    return mappedList;
  };

  return <RecommendationClientView fieldList={ mappedFieldList() }
                                   fieldRainData={ fieldRainData['days'] } />;
};

RecommendationClientViewContainer.defaultProps = {
  fieldList: [],
  fieldRainData: undefined,
  selectedClient: undefined
};

RecommendationClientViewContainer.propTypes = {
  fieldList: arrayOf(shape({})),
  fieldRainData: shape({}),
  selectedClient: shape({})
};

const mapStateToProps = ({ auth, client }) => ({
  loggedInUser: auth.loggedInUser,
  fieldList: client.fieldList.fields,
  fieldRainData: client.fieldRainData,
  selectedClient: client.selectedClient
});

export default connect(mapStateToProps)(RecommendationClientViewContainer);
