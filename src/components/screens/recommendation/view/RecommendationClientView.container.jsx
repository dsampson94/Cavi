import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { arrayOf, shape } from 'prop-types';
import { CAPTURE, QUICK_VIEW } from '../../../../tools/general/system-variables.util';

import { retrieveLastSelectedUserFromLocalStorage, retrieveUserLoginFromLocalStorage } from '../../../../tools/storage/localStorage';
import { requestClientFieldList, requestSelectedClient } from '../../../../redux/actions/client.action';

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
    let rainDataUpper = [];
    let rainDataLower = [];
    const tableList = [];
    const mappedList = [];

    for (let field in fieldRainData[1]) {
      rainData?.push({ upper: fieldRainData[1][field] });
    }

    if (fieldRainData[2]) {
      for (let field in fieldRainData[2]) {
        rainData?.push({ lower: fieldRainData[2][field] });
      }
    }

    for (let index in rainData) {
      if (Object.keys(rainData[index])[0].includes('upper')) {
        rainDataUpper.push(rainData[index]);
      } else if (Object.keys(rainData[index])[0].includes('lower')) {
        rainDataLower.push(rainData[index]);
      }
    }

    for (let field in fieldList) {
      tableList?.push(fieldList[field]);
    }

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
          [rainDataKeys[1]]: undefined,
          [rainDataKeys[2]]: undefined,
          [`${ rainDataKeys[3] } `]: undefined,
          '30d': undefined,
          Total: undefined,
          ...(listItem?.showtransp === '1' ? { trans: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { evap: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { total: undefined } : {})
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
          [rainDataKeys[1]]: undefined,
          [rainDataKeys[2]]: undefined,
          [`${ rainDataKeys[3] } `]: undefined,
          '30d': undefined,
          Total: undefined,
          ...(listItem?.showtransp === '1' ? { trans: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { evap: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { total: undefined } : {})
        });
      }

      mappedList.push({
        fieldName: {
          locationName: listItem?.fieldname,
          type: listItem?.gewas
        },
        w: (listItem?.warning === '0') ? undefined : listItem?.warning,
        b: (listItem?.split === 1) ? {
          tooltip: `Click to view seperate blocks for ${ listItem?.fieldname }`
        } : undefined,
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
        [weatherDataKeys[0]]: {
          data: listItem?.recommend1,
          harvest: !!(listItem?.oes?.includes('1'))
        },
        [weatherDataKeys[1]]: {
          data: listItem?.recommend2,
          harvest: !!(listItem?.oes?.includes('2'))
        },
        [weatherDataKeys[2]]: {
          data: listItem?.recommend3,
          harvest: !!(listItem?.oes?.includes('3'))
        },
        [weatherDataKeys[3]]: {
          data: listItem?.recommend4,
          harvest: !!(listItem?.oes?.includes('4'))
        },
        [weatherDataKeys[4]]: {
          data: listItem?.recommend5,
          harvest: !!(listItem?.oes?.includes('5'))
        },
        [weatherDataKeys[5]]: {
          data: listItem?.recommend6,
          harvest: !!(listItem?.oes?.includes('6'))
        },
        [weatherDataKeys[6]]: {
          data: listItem?.recommend7,
          harvest: !!(listItem?.oes?.includes('7'))
        },
        ' ': ' ',
        [rainDataKeys[0]]: { upper: rainDataUpper[index]?.upper[1], lower: rainDataLower[index]?.lower[1] },
        [rainDataKeys[1]]: { upper: rainDataUpper[index]?.upper[2], lower: rainDataLower[index]?.lower[2] },
        [rainDataKeys[2]]: { upper: rainDataUpper[index]?.upper[3], lower: rainDataLower[index]?.lower[3] },
        [`${ rainDataKeys[3] } `]: { upper: rainDataUpper[index]?.upper[4], lower: rainDataLower[index]?.lower[4] },
        '30d': { upper: rainDataUpper[index]?.upper[6], lower: rainDataLower[index]?.lower[6] },
        Total: { upper: rainDataUpper[index]?.upper[5], lower: rainDataLower[index]?.lower[5] },
        ...(listItem?.showtransp === '1' ? { trans: listItem?.gw } : {}),
        ...(listItem?.showtransp === '1' ? { evap: listItem?.vw } : {}),
        ...(listItem?.showtransp === '1' ? { total: listItem?.tw } : {})
      });

      if (listItem?.split === 1) {

        const subGroupData = {
          ...(listItem?.sublande ? {
            sublande: Object.keys(listItem?.sublande).map(function(key) {
              return { ...listItem?.sublande[key], name: key };
            })
          } : {})
        };

        mappedList.push({
          fieldName: subGroupData,
          w: undefined,
          b: subGroupData,
          p: undefined,
          l: undefined,
          c: undefined,
          q: undefined,
          deficit: {
            undefined
          },
          unit: undefined,
          [weatherDataKeys[0]]: subGroupData,
          [weatherDataKeys[1]]: subGroupData,
          [weatherDataKeys[2]]: subGroupData,
          [weatherDataKeys[3]]: subGroupData,
          [weatherDataKeys[4]]: subGroupData,
          [weatherDataKeys[5]]: subGroupData,
          [weatherDataKeys[6]]: subGroupData,
          ' ': { dropdown: true },
          [rainDataKeys[0]]: undefined,
          [rainDataKeys[1]]: undefined,
          [rainDataKeys[2]]: undefined,
          [`${ rainDataKeys[3] } `]: undefined,
          '30d': undefined,
          Total: undefined,
          ...(listItem?.showtransp === '1' ? { trans: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { evap: undefined } : {}),
          ...(listItem?.showtransp === '1' ? { total: undefined } : {}),
          expanded: false
        });
      }
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
