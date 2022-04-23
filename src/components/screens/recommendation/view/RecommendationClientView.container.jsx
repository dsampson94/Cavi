import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { retrieveLastSelectedUserFromLocalStorage, retrieveUserLoginFromLocalStorage } from '../../../../tools/storage/localStorage';
import { requestClientFieldList, requestClientFieldRainData, requestSelectedClient } from '../../../../redux/actions/client.action';

import RecommendationClientView from './RecommendationClientView';

const RecommendationClientViewContainer = ({ fieldList, fieldRainData, selectedClient, dispatch }) => {

  const { user } = retrieveUserLoginFromLocalStorage();

  useEffect(() => {
    dispatch(requestClientFieldList(mockClientData));
  }, [selectedClient]);

  useEffect(() => {
    dispatch(requestSelectedClient());
    dispatch(requestClientFieldList(mockClientData));
    dispatch(requestClientFieldRainData(mockClientData));
  }, [dispatch]);

  const mockClientData = {
    username: user?.username,
    password: user?.password,
    groupname: retrieveLastSelectedUserFromLocalStorage().groupName,
    clientname: retrieveLastSelectedUserFromLocalStorage().clientName
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

    return tableList.map((listItem, index) => {
      const rainDataKeys = Object.keys(fieldRainData['days'] ?? []);
      const weatherDataKeys = Object.keys(listItem?.weervoorspelling);
      return {
        fieldName: {
          field: listItem?.fieldname,
          type: listItem?.gewas
        },
        wa: '',
        bl: '',
        ph: '',
        lr: listItem?.last_reading,
        ca: '',
        qv: '',
        deficit: {
          top: listItem?.tekbo, colorTop: listItem?.colorBotHex,
          bottom: listItem?.tekonder, colorBot: listItem?.colorTopHex
        },
        unit: listItem?.eenheid,
        [weatherDataKeys[0]]: listItem?.['aanboud 1'],
        [weatherDataKeys[1]]: listItem?.['aanboud 2'],
        [weatherDataKeys[2]]: listItem?.['aanboud 3'],
        [weatherDataKeys[3]]: listItem?.['aanboud 4'],
        [weatherDataKeys[4]]: listItem?.['aanboud 5'],
        [weatherDataKeys[5]]: listItem?.['aanboud 6'],
        [weatherDataKeys[6]]: listItem?.['aanboud 7'],
        ' ': ' ',
        [rainDataKeys[0]]: rainDataUpper[index]?.upper[1],
        [rainDataKeys[0] + 'L']: rainDataLower[index]?.lower[1],
        [rainDataKeys[1]]: rainDataUpper[index]?.upper[2],
        [rainDataKeys[1] + 'L']: rainDataLower[index]?.lower[2],
        [rainDataKeys[2]]: rainDataUpper[index]?.upper[3],
        [rainDataKeys[2] + 'L']: rainDataLower[index]?.lower[3],
        [rainDataKeys[3] + ' ']: rainDataUpper[index]?.upper[4],
        [rainDataKeys[3] + 'L']: rainDataLower[index]?.lower[4],
        '30d': rainDataUpper[index]?.upper[6],
        '30dL': rainDataLower[index]?.lower[6],
        Total: rainDataUpper[index]?.upper[5],
        TotalL: rainDataLower[index]?.lower[5],
        trans: listItem?.gw,
        evap: listItem?.vw,
        total: listItem?.tw
      };
    });
  };

  return <RecommendationClientView fieldList={ mappedFieldList() }
                                   fieldRainData={ fieldRainData['days'] } />;
};

const mapStateToProps = ({ auth, client }) => ({
  loggedInUser: auth.loggedInUser,
  fieldList: client.fieldList.fields,
  fieldRainData: client.fieldRainData,
  selectedClient: client.selectedClient
});

export default connect(mapStateToProps)(RecommendationClientViewContainer);
